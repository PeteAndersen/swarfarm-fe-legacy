import React from 'react';
import { withFormik } from 'formik';
import { Menu, Form, Button } from 'semantic-ui-react';
import * as yup from 'yup';
import { Field, Dropdown, Checkbox } from 'ui/components/form';

const elementOptions = ['Fire', 'Water', 'Wind', 'Light', 'Dark'].map(element => ({
  text: element,
  value: element,
  image: `${process.env.PUBLIC_URL}/assets/elements/${element.toLowerCase()}.png`
}));

const formikEnhancer = withFormik({
  displayName: 'FilterForm',
  mapPropsToValues: () => ({
    obtainable: true,
    name__starts_with: '',
    element__value_in: [],
    is_awakened: null
  }),
  validationSchema: yup.object().shape({
    obtainable: yup.boolean(),
    name__starts_with: yup.string().ensure(),
    element__value_in: yup.array(),
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
}) => {
  return (
    <Menu vertical fluid>
      <Menu.Item>
        <Form size="small" onSubmit={handleSubmit} loading={isSubmitting}>
          <Field
            control="input"
            type="text"
            name="name__starts_with"
            label="Name"
            error={Boolean(touched.name__starts_with && errors.name__starts_with)}
            value={values.name__starts_with}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          />
          <Dropdown
            name="element__value_in"
            label="Element"
            placeholder="Element"
            fluid
            multiple
            search
            selection
            options={elementOptions}
            value={values.element__value_in}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          />
          <Form.Group inline label="Awakened">
            <Checkbox
              name="is_awakened"
              label="N/A"
              radio
              value={null}
              checked={values.is_awakened === null}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            />
            <Checkbox
              name="is_awakened"
              label="Yes"
              radio
              value={true}
              checked={values.is_awakened === true}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            />
            <Checkbox
              name="is_awakened"
              label="No"
              radio
              value={false}
              checked={values.is_awakened === false}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
            />
          </Form.Group>
          <Button type="submit" disabled={isValid && isDirty}>
            Apply
          </Button>
        </Form>
      </Menu.Item>
    </Menu>
  );
};

export default formikEnhancer(FilterForm);
