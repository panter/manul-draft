import SimpleSchema from 'simpl-schema';

export default schema => (
  schema instanceof SimpleSchema ? schema : new SimpleSchema(schema)
);
