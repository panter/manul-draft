import {
  pure,
  withProps,
  withState,
  withPropsOnChange,
  withHandlers,
  onlyUpdateForKeys
} from 'recompose';
import { DraftJS, editorStateFromRaw } from 'megadraft';

import {
  any,
  defer,
  keys,
  filter,
  isEmpty,
  flow,
  get,
  keyBy,
  mapValues,
  isEqual
} from 'lodash/fp';
import { useDeps, composeAll } from '@storybook/mantra-core';

import ContentArea from '../components/content_area';
import composeWithTracker from '../utils/composeWithTracker';

export const dataComposer = (
  { context, contentId, entities = [], sampleContent = null },
  onData
) => {
  const { Meteor, Collections, i18n } = context();
  const locale = i18n.getLocale();
  const contentLoaded = Meteor.subscribe(
    'contents.one',
    contentId,
    locale
  ).ready();

  const content = Collections.Contents.findOne(contentId);

  if (contentLoaded) {
    const initialEditorState = editorStateFromRaw(
      content ? get(`value.${locale}`, content) : sampleContent,
      new DraftJS.CompositeDecorator(entities || [])
    );
    const copyLocales =
      content &&
      flow(
        keys,
        filter(l => !isEmpty(get(['value', l], content)))
      )(content.value);

    onData(null, { content, locale, copyLocales, initialEditorState });
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

export const depsMapper = (context, actions) => ({
  context: () => context,
  save: actions.cm.save,
  ...context.manulDraft
});

export default composeAll(
  withHandlers({
    copyFromLocale: props => fromLocale => {
      // clone the content
      const fromContent = get(`value.${fromLocale}`, props.content);
      if (fromContent) {
        // some draftjs voodoo to insert the rawContent into the current selection
        const newContentState = DraftJS.convertFromRaw(fromContent);
        const newContent = DraftJS.Modifier.replaceWithFragment(
          props.editorState.getCurrentContent(),
          props.editorState.getSelection(),
          newContentState.getBlockMap()
        );
        const newEditorState = DraftJS.EditorState.push(
          props.editorState,
          newContent,
          'insert-fragment'
        );
        props.setEditorState(newEditorState);
      }
    }
  }),
  // wait for https://github.com/acdlite/recompose/issues/259
  // this here is a dirty workaround
  withPropsOnChange(
    ['initialEditorState'],
    ({ initialEditorState, setEditorState }) => {
      /* eslint lodash-fp/no-unused-result: 0*/
      defer(() => setEditorState(initialEditorState));
    }
  ),
  withHandlers({
    saveAndClose: ({
      save,
      cancelEditing,
      editorState,
      contentId,
      locale
    }) => () => {
      save(
        {
          contentId,
          locale,
          editor: DraftJS.convertToRaw(editorState.getCurrentContent())
        },
        error => !error && cancelEditing(false)
      );
    },
    saveAndEdit: ({ save, editorState, contentId, locale }) => () => {
      save({
        contentId,
        locale,
        editor: DraftJS.convertToRaw(editorState.getCurrentContent())
      });
    },
    cancel: ({ cancelEditing, setEditorState, initialEditorState }) => () => {
      setEditorState(initialEditorState);
      cancelEditing(false);
    }
  }),
  withProps(({ editorState }) => ({
    blockPluginDialogIsActive: any(block => block.getData().get('showDialog'))(
      editorState.getCurrentContent().getBlocksAsArray()
    )
  })),
  withHandlers({
    setEditorState: props => newEditorState => {
      if (!isEqual(props.editorState, newEditorState)) {
        props.setEditorState(newEditorState);
      }
    }
  }),
  withState(
    'editorState',
    'setEditorState',
    ({ initialEditorState }) => initialEditorState
  ),
  pure,
  composeWithTracker(dataComposer),
  withProps(
    ({
      blockPluginProps = {},
      isEditing,
      entities = [],
      blockPlugins = []
    }) => ({
      megadraftBlockPlugins: blockPlugins.map(plugin =>
        plugin({ isEditing, blockPluginProps })
      ),
      entityInputs: flow(
        keyBy('_id'),
        mapValues(e => e.inputComponent)
      )(entities)
    })
  ),
  composeWithTracker(stateComposer),
  useDeps(depsMapper),
  onlyUpdateForKeys(['contentId'])
)(ContentArea);
