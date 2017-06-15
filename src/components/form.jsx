import React from 'react';

import fromContextOr from '../component_from_context_or';

const Form = fromContextOr('Form', () =>
   (
     <p>
      Please provide context.manulDraft.components.Form
     </p>
  ),
);

export default Form;
