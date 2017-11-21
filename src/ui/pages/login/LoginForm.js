import React from 'react';
import classnames from 'classnames';
import { withFormik } from 'formik';
import Yup from 'yup';
import { Button, Message } from 'semantic-ui-react';

import Input from 'ui/components/form/input';

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({ username: '', password: '' }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
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
    const formClasses = classnames('ui', 'form', {
      error: !isValid || status,
      loading: isSubmitting
    });

    return (
      <form onSubmit={handleSubmit} className={formClasses}>
        <Input
          type="text"
          name="username"
          label="Username"
          error={touched.username && errors.username}
          value={values.username}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          error={touched.password && errors.password}
          value={values.password}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        {status ? <Message error>{status}</Message> : null}
        <Button disabled={isSubmitting || !isValid}>Submit</Button>
      </form>
    );
  }
}

export default formikEnhancer(LoginForm);
