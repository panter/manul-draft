import React from 'react';
import fromContextOr from '../component_from_context_or';

export default fromContextOr('Heading', ({ children }) => (
  <h3>{children}</h3>
));
