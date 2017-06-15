import React from 'react';
import fromContextOr from '../component_from_context_or';


export default fromContextOr('ButtonGroup', ({ children }) => (
  <div
    style={{
      display: 'flex',
    }}
  >{children}</div>
));
