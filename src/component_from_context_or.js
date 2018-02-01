import { useDeps, composeAll } from '@storybook/mantra-core';
import React from 'react';
import { getOr } from 'lodash/fp';

/**
helper that returns either the component
from context.manulDraft or one of the given default component
**/

export const depsMapper = context => ({
  context: () => context,
  components: context.manulDraft.components
});

export default (componentName, DefaultComponent) =>
  composeAll(useDeps(depsMapper))(({ components, innerRef, ...props }) => {
    const Component = getOr(DefaultComponent, componentName, components);
    return <Component ref={innerRef} {...props} />;
  });
