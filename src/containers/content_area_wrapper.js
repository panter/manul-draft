import { pure } from 'recompose';

import { invoke } from 'lodash/fp';
import { composeAll, useDeps } from '@storybook/mantra-core';

import ContentAreaWrapper from '../components/content_area_wrapper';
import composeWithTracker from '../utils/composeWithTracker';

export const composer = ({ context, content }, onData) => {
  const { manulDraft } = context();
  const highlightEditable = invoke('highlightEditable', manulDraft);

  onData(null, { highlightEditable });
};

export const depsMapper = context => ({
  context: () => context,
  ...context.manulDraft
});

export default composeAll(
  pure,
  composeWithTracker(composer),
  useDeps(depsMapper),
  pure
)(ContentAreaWrapper);
