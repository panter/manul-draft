import { MegadraftEditor as MegadraftEditorOrg } from 'megadraft';
import React from 'react';

import AreaActionsToolbar from './area_actions_toolbar';
import DraggableWindow from './draggable_window';

// quickfix for https://github.com/globocom/megadraft/issues/97
class MegadraftEditor extends MegadraftEditorOrg {
  /* eslint class-methods-use-this: 0*/
  setReadOnly() {
    // do nothing
  }
}

const Styles = ({ highlightEditable, isEditing }) =>
   ({
     base: {
       ...(highlightEditable ? {
         outline: '1px dotted black',
         padding: 15,
         margin: -15,
       } : {}),
       ...(isEditing ? {
         outline: '1px dotted black',
         padding: 15,
         margin: -15,
       } : {}),
       cursor: highlightEditable ? 'pointer' : null,
       position: 'relative',
     },
   })
;

const ContentArea = ({
    className,
    style,
    canEdit,
    isEditing,
    blockPluginDialogIsActive,
    highlightEditable,
    startEditing,
    cancelEditing,
    entityInputs,
    locale,
    editorState,
    setEditorState,
    saveAndClose,
    saveAndEdit,
    megadraftActions,
    blockRenderMap,
    megadraftBlockPlugins = [],
    copyLocales = [],
    copyFromLocale,
  }) => {
  const styles = Styles({ highlightEditable, isEditing });

  const renderEditor = readOnly => (
    <MegadraftEditor
      key={`contentId${isEditing ? '_editing' : ''}`} // force rerender
      actions={megadraftActions}
      plugins={megadraftBlockPlugins}
      readOnly={readOnly}
      editorState={editorState}
      entityInputs={entityInputs}
      blockRenderMap={blockRenderMap}
      onChange={setEditorState}
    />
  );


  return (
    <div style={style} className={className}>
      <div
        style={styles.base}
        onClick={() => canEdit && highlightEditable && startEditing()}
      >
        <div style={highlightEditable ? { pointerEvents: 'none' } : null}>
          {isEditing && (
            <DraggableWindow>
              <div
                className="megadraft-floating-window" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: 'calc(100% - 50px)',
                }}
              >

                {renderEditor(blockPluginDialogIsActive || !canEdit || !isEditing)}
                <AreaActionsToolbar
                  saveAndClose={saveAndClose}
                  saveAndEdit={saveAndEdit}
                  cancelEditing={cancelEditing}
                  onResize={e => e.stopPropagation()}
                  locale={locale}
                  copyLocales={copyLocales}
                  copyFromLocale={copyFromLocale}
                />
              </div>
            </DraggableWindow>
      )}
          {renderEditor(true)}
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    </div>
  );
};


ContentArea.displayName = 'ContentArea';

export default ContentArea;
