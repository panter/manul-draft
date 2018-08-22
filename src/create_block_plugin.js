import { T } from '@panter/manul-i18n';
import { insertDataBlock } from 'megadraft';
import { withHandlers, pure } from 'recompose';
import React from 'react';
import Immutable from 'immutable';
import ButtonAddPlugin from './components/button_add_plugin';
import PluginEditableComponent from './containers/plugin_editable_component';
import wrapInSimpleSchema from './utils/wrap_in_simpleschema';

const BlockComponent = ({
  isEditing,
  Component,
  blockPluginProps,
  data,
  container,
  schema,
  i18nNamespace,
  hasCustomHover
}) => {
  // show the render-component when not in editmode
  if (!isEditing) {
    return <Component {...blockPluginProps} {...data} />;
  }
  const dataMap = Immutable.fromJS(data);

  return (
    <PluginEditableComponent
      schema={schema}
      i18nNamespace={i18nNamespace}
      dataMap={dataMap}
      container={container}
      hasCustomHover={hasCustomHover}
    >
      <Component {...blockPluginProps} {...data} isEditing />
    </PluginEditableComponent>
  );
};

const ButtonComponent = pure(
  withHandlers({
    onClick: ({
      onChange,
      type,
      schema,
      showDialogInitially,
      editorState
    }) => e => {
      e.preventDefault();
      const data = {
        type,
        showDialog: showDialogInitially,
        ...(schema ? schema.clean({}) : {})
      };

      // Calls the onChange method with the new state.
      onChange(insertDataBlock(editorState, data));
    }
  })(({ i18nNamespace, onClick }) => (
    <ButtonAddPlugin onClick={onClick}>
      <T _id={[`${i18nNamespace}.add`, `${i18nNamespace}.label`]} />
    </ButtonAddPlugin>
  ))
);
/* eslint react/display-name: 0*/
export default ({
  type,
  i18nNamespace = `cm.${type}`,
  schema: schemaDef = null,
  Component,
  hasCustomHover
}) => ({ blockPluginProps, isEditing }) => {
  const schema = schemaDef && wrapInSimpleSchema(schemaDef);
  const PureComponent = pure(Component);
  const showDialogInitially = Boolean(schema); // if has schema

  return {
    // A unique plugin name used to identify the plugin and its blocks
    type,
    // React component to be rendered in the block sidebar
    buttonComponent: ({ onChange, editorState }) => (
      <ButtonComponent
        showDialogInitially={showDialogInitially}
        i18nNamespace={i18nNamespace}
        onChange={onChange}
        editorState={editorState}
        type={type}
        schema={schema}
      />
    ),
    // React component for rendering the content block
    blockComponent: ({ data, container }) => (
      <BlockComponent
        key={isEditing}
        schema={schema}
        isEditing={isEditing}
        data={data}
        container={container}
        Component={PureComponent}
        blockPluginProps={blockPluginProps}
        hasCustomHover={hasCustomHover}
        i18nNamespace={i18nNamespace}
      />
    )
  };
};
