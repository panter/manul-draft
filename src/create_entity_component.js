import { DraftJS } from 'megadraft';
import React from 'react';

export default (Component) => {
  const EntityComponent = ({ entityKey, ...props }) => (
    <Component {...props} {...DraftJS.Entity.get(entityKey).getData()} />
    );
  EntityComponent.displayName = `EntityComponent(${Component.displayName})`;
  return EntityComponent;
};
