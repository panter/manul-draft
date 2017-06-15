import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';
import PluginEditableComponent from '../components/plugin_editable_component';

import windowDimensions from 'react-window-dimensions';
import { withState, withHandlers, withProps } from 'recompose';

import { delay, debounce } from 'lodash/fp';


export const depsMapper = (context, actions) => ({
  context: () => context,
  ...context.manulDraft,
});

export default composeAll(
  withState('dimensions', 'setDimensions', () => {}),
  windowDimensions({
  /* global window */
    take: () => ({ windowWidth: window.innerWidth }),
    debounce: debounce(300),
  }),
  withHandlers({
    remove: ({ setShowDialog, container }) => () => {
      setShowDialog(false);
      // small delay, otherwise megadraft has a focus problem
      /* eslint lodash-fp/no-unused-result: 0*/
      delay(100, () => container.remove());
    },
    cancel: ({ dataMap, setShowDialog, container }) => () => {
      setShowDialog(false);
      // container.updateData(dataMap.set('forceDialog', false));
    },
    updateData: ({ container }) => (newData) => {
      container.updateData(newData);
    },
  }),
  withProps(({ dataMap }) => ({ showDialog: dataMap.get('showDialog') })),
  withHandlers({
    setShowDialog: ({ container, dataMap }) => show => (
      container.updateData(dataMap.set('showDialog', show))
    ),
  }),
  // withState('showDialog', 'setShowDialog', ({ dataMap }) => dataMap.get('forceDialog')),
  useDeps(depsMapper)
)(PluginEditableComponent);
