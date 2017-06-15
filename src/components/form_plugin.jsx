
import fromContextOr from '../component_from_context_or';
import Form from './form';

const FormPlugin = fromContextOr('FormPlugin', Form);

export default FormPlugin;
