import React from 'react';
import { withFormik } from 'formik';
import Yup from 'yup';
import { Form, Button, Message, Checkbox, Select } from 'semantic-ui-react';

import { Field } from 'ui/components/form';
import timezones from 'services/timezones';

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({
    email: '',
    username: '',
    public: true,
    password: '',
    passwordConfirm: '',
    server: 0,
    timezone: 'America/Los_Angeles'
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid e-mail address')
      .required('An e-mail address is required'),
    username: Yup.string().required('Please enter a username'),
    public: Yup.boolean(),
    password: Yup.string().required('Please enter a password'),
    passwordConfirm: Yup.string()
      .required('Please enter the same password again')
      .test('sameAs', 'Passwords do not match', function(passwordConfirm) {
        const password = this.parent.password;
        return passwordConfirm === password;
      }),
    timezone: Yup.string().required('Please select a timezone')
  }),
  handleSubmit: (payload, bag) => {
    bag.props.handleSubmit(payload);
  }
});

const serverOptions = [
  { value: 0, text: 'Global' },
  { value: 1, text: 'Europe' },
  { value: 2, text: 'Asia' },
  { value: 3, text: 'Korea' },
  { value: 4, text: 'Japan' },
  { value: 5, text: 'China' }
];

class LoginForm extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.isSubmitting !== nextProps.isLoading) {
      this.props.setSubmitting(nextProps.isLoading);
    }

    if (nextProps.submitErrors) {
      if (this.props.status !== nextProps.submitErrors.non_field_errors) {
        this.props.setStatus(nextProps.submitErrors.non_field_errors);
      }
      Object.entries(nextProps.submitErrors)
        .filter(([key, value]) => {
          return key !== 'non_field_errors';
        })
        .forEach(([key, value]) => {
          const error_msg = value.join('. ');
          if (this.props.errors[key] !== error_msg) {
            this.props.setFieldError(key, error_msg);
          }
        });
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

    return (
      <Form onSubmit={handleSubmit} loading={isSubmitting} error={!isValid || status !== undefined}>
        <Field
          control="input"
          type="text"
          name="email"
          label="E-mail Address"
          error={Boolean(touched.email && errors.email)}
          value={values.email}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        {touched.email && errors.email && <Message error>{errors.email}</Message>}

        <Field
          control="input"
          type="text"
          name="username"
          label="Username"
          error={Boolean(touched.username && errors.username)}
          value={values.username}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        {touched.username && errors.username && <Message error>{errors.username}</Message>}

        <Field
          control={Checkbox}
          toggle
          name="public"
          label="Public Profile"
          error={Boolean(touched.public && errors.public)}
          checked={values.public}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />

        <Field
          control="input"
          type="password"
          name="password"
          label="Password"
          error={Boolean(touched.password && errors.password)}
          value={values.password}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        {touched.password && errors.password && <Message error>{errors.password}</Message>}

        <Field
          control="input"
          type="password"
          name="passwordConfirm"
          label="Confirm Password"
          error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
          value={values.passwordConfirm}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        {touched.passwordConfirm &&
          errors.passwordConfirm && <Message error>{errors.passwordConfirm}</Message>}

        <Field
          control={Select}
          options={serverOptions}
          name="server"
          label="Server"
          error={Boolean(touched.server && errors.server)}
          value={values.server}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        {touched.server && errors.server && <Message error>{errors.server}</Message>}

        <Field
          control={Select}
          options={timezones}
          name="timezone"
          label="Timezone"
          error={Boolean(touched.timezone && errors.timezone)}
          value={values.timezone}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        {touched.timezone && errors.timezone && <Message error>{errors.timezone}</Message>}

        {status ? <Message error>{status}</Message> : null}
        <Button disabled={isSubmitting || !isValid}>Submit</Button>
      </Form>
    );
  }
}
export default formikEnhancer(LoginForm);
