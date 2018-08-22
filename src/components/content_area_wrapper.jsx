import React from 'react';

const Styles = ({ highlightEditable, isEditing }) => ({
  base: {
    ...(highlightEditable
      ? {
          outline: '1px dotted black',
          padding: 15,
          margin: -15
        }
      : {}),
    ...(isEditing
      ? {
          outline: '1px dotted black',
          padding: 15,
          margin: -15
        }
      : {}),
    cursor: highlightEditable ? 'pointer' : null,
    position: 'relative'
  }
});
const ContentAreaWrapper = ({
  className,
  style,
  canEdit,
  isEditing,

  highlightEditable,
  startEditing,

  children
}) => {
  const styles = Styles({ highlightEditable, isEditing });

  return (
    <div style={style} className={className}>
      <div
        style={styles.base}
        onClick={canEdit && highlightEditable ? startEditing : null}
      >
        <div style={highlightEditable ? { pointerEvents: 'none' } : null}>
          {children}

          <div style={{ clear: 'both' }} />
        </div>
      </div>
    </div>
  );
};

ContentAreaWrapper.displayName = 'ContentAreaWrapper';

export default ContentAreaWrapper;
