import React from 'react';
import classnames from 'classnames';
import { withFormik } from 'formik';
import Yup from 'yup';
import { Button, Message } from 'semantic-ui-react';

import TextInput from 'ui/components/form/textinput';

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
    //console.log(nextProps.submitErrors);
    //this.props.setErrors(nextProps.error);
  }

  render() {
    const {
      values,
      errors,
      touched,
      isValid,
      status,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
    } = this.props;
    const formClasses = classnames('ui', 'form', {
      error: !isValid || status,
      loading: isSubmitting
    });

    return (
      <form onSubmit={handleSubmit} className={formClasses}>
        <TextInput
          type="text"
          name="username"
          label="Username"
          error={touched.username && errors.username}
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextInput
          type="password"
          name="password"
          label="Password"
          error={touched.password && errors.password}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {status ? <Message error>{status}</Message> : null}
        <Button disabled={isSubmitting || !isValid}>Submit</Button>
      </form>
    );
  }
}
export default formikEnhancer(LoginForm);
