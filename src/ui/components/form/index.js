import { Form } from 'semantic-ui-react';
import formikCompatible from './formik_compatible';

const Button = formikCompatible(Form.Button);
const Checkbox = formikCompatible(Form.Checkbox);
const Dropdown = formikCompatible(Form.Dropdown);
const Field = formikCompatible(Form.Field);
const Input = formikCompatible(Form.Input);
const Radio = formikCompatible(Form.Radio);
const Select = formikCompatible(Form.Select);
const TextArea = formikCompatible(Form.TextArea);

export { default as formikCompatible } from './formik_compatible';
export { default as Rating } from './rating';
export { default as EffectDropdown } from './EffectDropdown';
export { default as Range } from './Range';
export { Button, Checkbox, Dropdown, Field, Input, Radio, Select, TextArea };
