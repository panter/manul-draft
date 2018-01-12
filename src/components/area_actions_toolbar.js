import React from 'react';

import ButtonActionBar from './button_action_bar';
import ButtonGroup from './button_group';

import fromContextOr from '../component_from_context_or';

const AreaActionsToolbar = fromContextOr(
  'AreaActionsToolbar',
  ({
    saveAndClose,
    saveAndEdit,
    cancelEditing,
    locale,
    copyLocales,
    copyFromLocale,
  }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: 5,
        minHeight: 50,
        borderTop: '1px solid black',
      }}
    >
      <ButtonGroup>
        <ButtonActionBar black onClick={saveAndClose}>
          Save and close
        </ButtonActionBar>
        <ButtonActionBar onClick={saveAndEdit}>Save</ButtonActionBar>
        <ButtonActionBar onClick={cancelEditing}>cancel</ButtonActionBar>
      </ButtonGroup>
      <div
        style={{
          marginLeft: 'auto',
        }}
      >
        <ButtonGroup>
          {copyLocales.map(
            aLocale =>
              aLocale !== locale && (
                <ButtonActionBar
                  variant="primary"
                  key={aLocale}
                  onClick={() => copyFromLocale(aLocale)}
                >
                  <span>📑 {aLocale}</span>
                </ButtonActionBar>
              ),
          )}
        </ButtonGroup>
      </div>
    </div>
  ),
);

export default AreaActionsToolbar;
