import React from 'react';
import { MegadraftEditor as MegadraftEditorOrg } from 'megadraft';
import AreaActionsToolbar from './area_actions_toolbar';

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

  return (
    <div style={style} className={className}>
      <div
        style={styles.base}
        onClick={() => canEdit && highlightEditable && startEditing()}
      >
        <div style={highlightEditable ? { pointerEvents: 'none' } : null}>
          {isEditing && (
          <AreaActionsToolbar
            saveAndClose={saveAndClose}
            saveAndEdit={saveAndEdit}
            cancelEditing={cancelEditing}
            locale={locale}
            copyLocales={copyLocales}
            copyFromLocale={copyFromLocale}
          />
      )}
          <MegadraftEditor
            key={`contentId${isEditing ? '_editing' : ''}`} // force rerender
            actions={megadraftActions}
            plugins={megadraftBlockPlugins}
            readOnly={blockPluginDialogIsActive || !canEdit || !isEditing}
            editorState={editorState}
            entityInputs={entityInputs}
            blockRenderMap={blockRenderMap}
            onChange={(state) => {
              setEditorState(state);
            }}
          />
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    </div>
  );
};


ContentArea.displayName = 'ContentArea';

export default ContentArea;
