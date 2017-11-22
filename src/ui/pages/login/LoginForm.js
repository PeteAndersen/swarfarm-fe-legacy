import React from 'react';
import classnames from 'classnames';
import { withFormik } from 'formik';
import Yup from 'yup';
import { Form, Button, Message } from 'semantic-ui-react';

import { Field } from 'ui/components/form';

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({ username: '', password: '' }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Please enter a username'),
    password: Yup.string().required('Please enter a password')
  }),
  handleSubmit: (payload, bag) => {
    bag.props.handleSubmit(payload);
  }
});

class LoginForm extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.isSubmitting !== nextProps.isLoading) {
      this.props.setSubmitting(nextProps.isLoading);
    }

    if (nextProps.submitErrors && this.props.status !== nextProps.submitErrors.non_field_errors) {
      this.props.setStatus(nextProps.submitErrors.non_field_errors);
    }
  }

  render() {
    const {
      values,
      errors,
      touched,
      isValid,
      status,
      setFieldValue,
      setFieldTouched,
      handleSubmit,
      isSubmitting
    } = this.props;
    const formClasses = classnames('ui', 'form', {});

    return (
      <Form
        onSubmit={handleSubmit}
        className={formClasses}
        loading={isSubmitting}
        error={!isValid || status}
      >
        <Field
          control="input"
          type="text"
          name="username"
          label="Username"
          error={touched.username && errors.username}
          value={values.username}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        {touched.username && errors.username && <Message error>{errors.username}</Message>}

        <Field
          control="input"
          type="password"
          name="password"
          label="Password"
          error={touched.password && errors.password}
          value={values.password}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        {touched.password && errors.password && <Message error>{errors.password}</Message>}

        {status ? <Message error>{status}</Message> : null}
        <Button disabled={isSubmitting || !isValid}>Submit</Button>
      </Form>
    );
  }
}

export default formikEnhancer(LoginForm);
