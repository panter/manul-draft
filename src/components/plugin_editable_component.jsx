import React from 'react';
import Measure from 'react-measure';
import Draggable from 'react-draggable';
import DialogPlugin from './dialog_plugin';


const Styles = ({ windowWidth, showDialog, dimensions = {} }) => {
  const margin = 15;
  const dialogWidth = 320;
  const dialogLeftPositionMax = dimensions.width + margin;
  const dialogLeftPositionMin = windowWidth - dimensions.left - dialogWidth - margin;
  const dialogLeftPosition = Math.min(dialogLeftPositionMax, dialogLeftPositionMin);
  return {
    base: {
      position: 'relative',
      // zIndex: showDialog ? 1000 : null,
    },
    content: {
      // ...theme.misc.defaultTransition,
      // ...(showDialog ? theme.borders.editingHighlightingActive() : {}),
      cursor: 'pointer',
      position: 'relative',

      ':hover': {
        // ...(!hasCustomHover ? { ...theme.borders.editingHighlighting() } : {}),
      },
    },
    dialog: {
      // ...theme.misc.defaultTransition,
      position: 'absolute',
      opacity: showDialog ? 1 : 0,
      zIndex: 10,
      width: dialogWidth,
      left: dialogLeftPosition || 0,
      // ...theme.borders.editingHighlightingActive(),
      border: '1px solid black',
      boxShadow: '2px 2px 8px #333',
      visibility: showDialog ? 'visible' : 'hidden',
      backgroundColor: 'white',
      padding: 10,
    },
  };
}
;
const PluginEditableComponent = ({
  i18nNamespace,
  schema,
  hasCustomHover,
  setDimensions,
  setShowDialog,
  cancel,
  remove,
  updateData,
  dataMap,
  children,
  showDialog,
  dimensions = {},
  windowWidth,
  // components from context
}) => {
  const styles = Styles({ showDialog, dimensions, hasCustomHover, windowWidth });

  return (
    <div style={styles.base}>
      {showDialog && <Draggable>
        <div style={styles.dialog}>
          <DialogPlugin
            cancel={cancel}
            dataMap={dataMap}
            remove={remove}
            i18nNamespace={i18nNamespace}
            updateData={updateData}
            schema={schema}
          />

        </div>
      </Draggable> }
      <div
        style={styles.content}
        onClick={(e) => { e.stopPropagation(); setShowDialog(!showDialog); }}
      >
        <div style={{ pointerEvents: !hasCustomHover && 'none' }}>

          <Measure
            shouldMeasure={showDialog}
            onMeasure={setDimensions}
          >
            {children}
          </Measure>
        </div>
      </div>
    </div>
  );
};


export default PluginEditableComponent;
