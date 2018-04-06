import { DraftJS, editorStateFromRaw } from 'megadraft';
import {
  any,
  invoke,
  defer,
  keys,
  filter,
  isEmpty,
  flow,
  get,
  keyBy,
  mapValues,
} from 'lodash/fp';
import { useDeps, composeAll, compose } from '@storybook/mantra-core';
import {
  withProps,
  withState,
  withPropsOnChange,
  withHandlers,
  onlyUpdateForKeys,
} from 'recompose';

import ContentArea from '../components/content_area';
import composeWithTracker from '../utils/composeWithTracker';

export const dataComposer = (
  { context, contentId, entities = [], sampleContent = null },
  onData,
) => {
  const { Meteor, Collections, i18n } = context();
  const contentLoaded = Meteor.subscribe('contents.one', contentId).ready();
  const locale = i18n.getLocale();
  const content = Collections.Contents.findOne(contentId);
  if (contentLoaded) {
    const initialEditorState = editorStateFromRaw(
      content ? get(`value.${locale}`, content) : sampleContent,
      new DraftJS.CompositeDecorator(entities || []),
    );
    onData(null, { content, locale, initialEditorState });
  }
};

export const stateComposer = ({ context, contentId }, onData) => {
  const { LocalState, Roles, Meteor } = context();
  const canEdit = Roles.userIsInRole(Meteor.userId(), 'admin');
  const cancelEditing = () => LocalState.delete('cm.editingMode');
  const isEditing = LocalState.equals('cm.editingMode', contentId);
  const startEditing = () => LocalState.set('cm.editingMode', contentId);
  onData(null, { canEdit, isEditing, cancelEditing, startEditing });
};

export const pluginComposer = (
  { blockPluginProps = {}, isEditing, entities = [], blockPlugins = [] },
  onData,
) => {
  // megadraft has no concept of editing/readonly (yet)
  // so we init every plugin with the editingState
  // in order to display a different component when isEditing/not isEditing
  onData(null, {
    megadraftBlockPlugins: blockPlugins.map(plugin =>
      plugin({ isEditing, blockPluginProps }),
    ),
    entityInputs: flow(keyBy('_id'), mapValues(e => e.inputComponent))(
      entities,
    ),
  });
};

export const i18nComposer = (
  { context, content, editorState, setEditorState },
  onData,
) => {
  const { manulDraft } = context();
  const highlightEditable = invoke('highlightEditable', manulDraft);
  // keys in value are locales where we can copy from
  const copyLocales =
    content &&
    flow(keys, filter(locale => !isEmpty(get(['value', locale], content))))(
      content.value,
    );

  const copyFromLocale = fromLocale => {
    // clone the content
    const fromContent = get(`value.${fromLocale}`, content);
    if (fromContent) {
      // some draftjs voodoo to insert the rawContent into the current selection
      const newContentState = DraftJS.convertFromRaw(fromContent);
      const newContent = DraftJS.Modifier.replaceWithFragment(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        newContentState.getBlockMap(),
      );
      const newEditorState = DraftJS.EditorState.push(
        editorState,
        newContent,
        'insert-fragment',
      );
      setEditorState(newEditorState);
    }
  };
  onData(null, { copyLocales, highlightEditable, copyFromLocale });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  save: actions.cm.save,
  ...context.manulDraft,
});

export default composeAll(
  composeWithTracker(i18nComposer),
  // wait for https://github.com/acdlite/recompose/issues/259
  // this here is a dirty workaround
  withPropsOnChange(
    ['initialEditorState'],
    ({ initialEditorState, setEditorState }) => {
      /* eslint lodash-fp/no-unused-result: 0*/
      defer(() => setEditorState(initialEditorState));
    },
  ),
  withHandlers({
    saveAndClose: ({
      save,
      cancelEditing,
      editorState,
      contentId,
      locale,
    }) => () => {
      save(
        {
          contentId,
          locale,
          editor: DraftJS.convertToRaw(editorState.getCurrentContent()),
        },
        error => !error && cancelEditing(false),
      );
    },
    saveAndEdit: ({ save, editorState, contentId, locale }) => () => {
      save({
        contentId,
        locale,
        editor: DraftJS.convertToRaw(editorState.getCurrentContent()),
      });
    },
    cancel: ({ cancelEditing, setEditorState, initialEditorState }) => () => {
      setEditorState(initialEditorState);
      cancelEditing(false);
    },
  }),
  withProps(({ editorState }) => ({
    blockPluginDialogIsActive: any(block => block.getData().get('showDialog'))(
      editorState.getCurrentContent().getBlocksAsArray(),
    ),
  })),
  withState(
    'editorState',
    'setEditorState',
    ({ initialEditorState }) => initialEditorState,
  ),
  composeWithTracker(dataComposer),
  compose(pluginComposer),
  composeWithTracker(stateComposer),
  useDeps(depsMapper),
  onlyUpdateForKeys(['contentId']),
)(ContentArea);
