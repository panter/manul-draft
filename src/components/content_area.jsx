import { MegadraftEditor as MegadraftEditorOrg } from 'megadraft';
import { Modal } from 'react-overlays';
import ModalManager from 'react-overlays/lib/ModalManager';
import { compose, withState, pure } from 'recompose';

import React from 'react';

import AreaActionsToolbar from './area_actions_toolbar';
import ContentAreaWrapper from '../containers/content_area_wrapper';

// quickfix for https://github.com/globocom/megadraft/issues/97
class MegadraftEditor extends MegadraftEditorOrg {
  /* eslint class-methods-use-this: 0*/
  setReadOnly() {
    // do nothing
  }
}

const ContentAreaEditor = pure(
  ({
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
    copyFromLocale
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
          manager={new ModalManager({ handleContainerOverflow: false })}
          backdrop={false}
          show
          autoFocus={false}
          style={{
            position: 'fixed',
            backgroundColor: '#ffffff99',
            zIndex: 100,
            bottom: 0,
            left: 0,
            right: 0
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
  )
);

const ContentArea = pure(
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
    startEditing,
    cancelEditing,

    locale,

    saveAndClose,
    saveAndEdit,
    copyLocales = [],
    copyFromLocale
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
      copyFromLocale
    };

    return (
      <ContentAreaWrapper
        className={className}
        style={style}
        canEdit={canEdit}
        isEditing={isEditing}
        startEditing={startEditing}
      >
        <ContentAreaEditor
          readOnly={blockPluginDialogIsActive || !canEdit || !isEditing}
          {...editorProps}
        />
      </ContentAreaWrapper>
    );
  }
);

ContentArea.displayName = 'ContentArea';

export default ContentArea;
