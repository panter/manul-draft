import { MegadraftEditor as MegadraftEditorOrg } from 'megadraft';
import { Modal } from 'react-overlays';
import { compose, withState } from 'recompose';
import Measure from 'react-measure';
import React from 'react';

import AreaActionsToolbar from './area_actions_toolbar';

// quickfix for https://github.com/globocom/megadraft/issues/97
class MegadraftEditor extends MegadraftEditorOrg {
  /* eslint class-methods-use-this: 0*/
  setReadOnly() {
    // do nothing
  }
}

const Styles = ({ highlightEditable, isEditing }) => ({
  base: {
    ...(highlightEditable
      ? {
          outline: '1px dotted black',
          padding: 15,
          margin: -15,
        }
      : {}),
    ...(isEditing
      ? {
          outline: '1px dotted black',
          padding: 15,
          margin: -15,
        }
      : {}),
    cursor: highlightEditable ? 'pointer' : null,
    position: 'relative',
  },
});

const enhance = compose(
  withState('dimensions', 'setDimensions', () => ({
    top: 0,
    left: 0,
    width: 100,
    height: 100,
  })),
  withState('editorHasFocus', 'setEditorHasFocus', false),
);

const ContentAreaWrapper = ({
  className,
  style,
  canEdit,
  isEditing,
  blockPluginDialogIsActive,
  highlightEditable,
  startEditing,
  cancelEditing,

  locale,

  saveAndClose,
  saveAndEdit,
  copyLocales = [],
  copyFromLocale,
  setDimensions,
  dimensions,
  editorHasFocus,
  setEditorHasFocus,
  editorReadOnly,
  editor,
}) => {
  const styles = Styles({ highlightEditable, isEditing });

  return (
    <Measure
      // shouldMeasure={isEditing}
      onMeasure={setDimensions}
    >
      <div style={style} className={className}>
        <div
          style={styles.base}
          onClick={() => canEdit && highlightEditable && startEditing()}
        >
          <div style={highlightEditable ? { pointerEvents: 'none' } : null}>
            {!blockPluginDialogIsActive && canEdit && isEditing
              ? editor
              : editorReadOnly}

            <div style={{ clear: 'both' }} />
          </div>
        </div>
      </div>
    </Measure>
  );
};

const ContentAreaEditor = ({
  readOnly,
  contentId,
  isEditing,
  entityInputs,
  editorState,
  setEditorState,
  megadraftActions,
  blockRenderMap,
  megadraftBlockPlugins = [],
  saveAndClose,
  saveAndEdit,
  cancelEditing,
  locale,
  copyLocales,
  copyFromLocale,
}) => (
  <div>
    <MegadraftEditor
      key={`${contentId}${isEditing ? '_editing' : ''}`} // force rerender
      actions={megadraftActions}
      plugins={megadraftBlockPlugins}
      readOnly={readOnly}
      editorState={editorState}
      entityInputs={entityInputs}
      blockRenderMap={blockRenderMap}
      onChange={setEditorState}
    />
    {isEditing && (
      <Modal
        backdrop={false}
        show
        autoFocus={false}
        style={{
          position: 'fixed',
          backgroundColor: '#ffffff99',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <AreaActionsToolbar
          saveAndClose={saveAndClose}
          saveAndEdit={saveAndEdit}
          cancelEditing={cancelEditing}
          locale={locale}
          copyLocales={copyLocales}
          copyFromLocale={copyFromLocale}
        />
      </Modal>
    )}
  </div>
);

const ContentArea = enhance(
  ({
    isEditing,
    entityInputs,
    editorState,
    setEditorState,
    megadraftActions,
    blockRenderMap,
    megadraftBlockPlugins = [],
    contentId,
    className,
    style,
    canEdit,
    blockPluginDialogIsActive,
    highlightEditable,
    startEditing,
    cancelEditing,

    locale,

    saveAndClose,
    saveAndEdit,
    copyLocales = [],
    copyFromLocale,
    setDimensions,
    dimensions,
    editorHasFocus,
    setEditorHasFocus,
  }) => {
    const editorProps = {
      contentId,
      isEditing,
      entityInputs,
      editorState,
      setEditorState,
      megadraftActions,
      blockRenderMap,
      megadraftBlockPlugins,
      saveAndClose,
      saveAndEdit,
      cancelEditing,
      locale,
      copyLocales,
      copyFromLocale,
    };
    const wrapperProps = {
      className,
      style,
      canEdit,
      isEditing,
      blockPluginDialogIsActive,
      highlightEditable,
      startEditing,
      cancelEditing,

      locale,

      saveAndClose,
      saveAndEdit,
      copyLocales,
      copyFromLocale,
      setDimensions,
      dimensions,
      editorHasFocus,
      setEditorHasFocus,
    };

    return (
      <ContentAreaWrapper
        {...wrapperProps}
        editor={<ContentAreaEditor {...editorProps} />}
        editorReadOnly={<ContentAreaEditor readOnly {...editorProps} />}
      />
    );
  },
);

ContentArea.displayName = 'ContentArea';

export default ContentArea;
