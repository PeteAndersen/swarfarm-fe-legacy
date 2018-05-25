import React from 'react';
import { withFormik } from 'formik';
import { Menu, Form, Button } from 'semantic-ui-react';
import * as yup from 'yup';
import { Field, Dropdown } from 'ui/components/form';

const elementOptions = ['Fire', 'Water', 'Wind', 'Light', 'Dark'].map(element => ({
  text: element,
  value: element,
  image: `${process.env.PUBLIC_URL}/assets/elements/${element.toLowerCase()}.png`
}));

const formikEnhancer = withFormik({
  displayName: 'FilterForm',
  mapPropsToValues: () => ({
    name: '',
    element: [],
    is_awakened: null
  }),
  validationSchema: yup.object().shape({
    name: yup.string().ensure(),
    element: yup.array(),
    is_awakened: yup.boolean().nullable()
  }),
  handleSubmit: (payload, bag) => {
    bag.props.handleSubmit(payload);
    bag.setSubmitting(false);
  }
});

const FilterForm = ({
  values,
  errors,
  touched,
  isValid,
  isDirty,
  setFieldValue,
  setFieldTouched,
  handleSubmit,
  isSubmitting,
  ...props
}) => (
  <Menu vertical fluid>
    <Menu.Item>
      <Form size="small" onSubmit={handleSubmit} loading={isSubmitting}>
        <Field
          control="input"
          type="text"
          name="name"
          label="Name"
          error={Boolean(touched.name && errors.name)}
          value={values.name}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        <Dropdown
          name="element"
          label="Element"
          placeholder="Element"
          fluid
          multiple
          search
          selection
          options={elementOptions}
          value={values.element}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        <Button type="submit" disabled={isValid && isDirty}>
          Apply
        </Button>
      </Form>
    </Menu.Item>
  </Menu>
);

export default formikEnhancer(FilterForm);
