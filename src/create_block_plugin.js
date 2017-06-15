import { T } from '@panter/manul-i18n';
import { insertDataBlock } from 'megadraft';
import React from 'react';

import Immutable from 'immutable';

import ButtonAddPlugin from './components/button_add_plugin';
import PluginEditableComponent from './containers/plugin_editable_component';
import wrapInSimpleSchema from './utils/wrap_in_simpleschema';

export default ({
  type,
  i18nNamespace = `cm.${type}`,
  schema: schemaDef = null,
  Component,
  hasCustomHover,
 }) => ({ blockPluginProps, isEditing }) => {
   const schema = schemaDef && (
     wrapInSimpleSchema(schemaDef)
   );

   const blockComponent = ({ data, container }) => {
     const dataMap = Immutable.fromJS(data);
     const component = (
       <Component
         {...blockPluginProps}
         {...data} isEditing={isEditing}
       />
     );
     // show the render-component when not in editmode or if the plugin has no schema
     if (!isEditing) {
       return component;
     }
     return (
       <PluginEditableComponent
         schema={schema}
         i18nNamespace={i18nNamespace}
         dataMap={dataMap}
         container={container}
         hasCustomHover={hasCustomHover}
       >
         {component}
       </PluginEditableComponent>
     );
   };
   const showDialogInitially = Boolean(schema); // if has schema

   const addPlugin = ({ onChange, editorState }) => {
     const data = {
       type,
       showDialog: showDialogInitially,
       ...(schema ? schema.clean({}) : {}),
     };
   // Calls the onChange method with the new state.
     onChange(insertDataBlock(editorState, data));
   };


   const buttonComponent = ({ onChange, editorState }) => (
     <ButtonAddPlugin
       onClick={(e) => {
         e.preventDefault();
         addPlugin({ onChange, editorState });
       }}
     >
       <T _id={[`${i18nNamespace}.add`, `${i18nNamespace}.label`]} />
     </ButtonAddPlugin>
  );

   return {
     // A unique plugin name used to identify the plugin and its blocks
     type,
     // React component to be rendered in the block sidebar
     buttonComponent,
     // React component for rendering the content block
     blockComponent,
   };
 };
