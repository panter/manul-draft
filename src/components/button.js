import React from 'react';
import fromContextOr from '../component_from_context_or';


export default fromContextOr('Button', ({ children, onClick }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
));
