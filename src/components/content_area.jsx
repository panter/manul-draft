import { MegadraftEditor as MegadraftEditorOrg } from 'megadraft';
import { compose, withState } from 'recompose';
import Measure from 'react-measure';
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

const enhance = compose(
  withState('dimensions', 'setDimensions', () => ({ top: 0, left: 0, width: 100, height: 100 })),
  withState('editorHasFocus', 'setEditorHasFocus', false),
);

const ContentArea = enhance(({
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
    setDimensions,
    dimensions,
    editorHasFocus,
    setEditorHasFocus,
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
            {isEditing && (
            <DraggableWindow
              disableDragging={editorHasFocus}
              x={Math.max(20, dimensions.left)}
              y={Math.max(20, dimensions.top)}
              /* global window*/
              width={Math.max(280, Math.min(window.innerWidth - 40, dimensions.width))}
              height={Math.max(280, Math.min(window.innerHeight - 40, dimensions.height))}
            >
              <div
                onFocus={() => setEditorHasFocus(true)}

                onBlur={() => setEditorHasFocus(false)}
                className="megadraft-floating-window" style={{
                  display: 'flex',
                  cursor: 'text',
                  flexDirection: 'column',
                  height: 'calc(100% - 50px)',
                }}
              >
                {renderEditor(blockPluginDialogIsActive || !canEdit || !isEditing)}
                <AreaActionsToolbar
                  saveAndClose={saveAndClose}
                  saveAndEdit={saveAndEdit}
                  cancelEditing={cancelEditing}
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
    </Measure>
  );
});


ContentArea.displayName = 'ContentArea';

export default ContentArea;
