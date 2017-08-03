import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { Form as ReduxForm, Field, reduxForm } from 'redux-form';
import { onSubmitActions } from 'redux-form-submit-saga';

const LoginForm = (props) => {
  const { handleSubmit, pristine, submitting, error } = props;
  const errorMessages = Object.entries(error || {}).map(([field, error]) => {
    if (error) {
      return field === 'non_field_errors'
        ? error
        : `${field.charAt(0).toUpperCase() + field.slice(1)}: ${error}`;
    }
    return null;
  });

  return (
    <Form
      as={ReduxForm}
      onSubmit={handleSubmit}
      loading={submitting}
      error={errorMessages.length > 0}
    >
      <Form.Field required error={!!(error || {}).username}>
        <label>Username</label>
        <Field name="username" component="input" type="text" placeholder="Username" />
      </Form.Field>
      <Form.Field required error={!!(error || {}).password}>
        <label>Password</label>
        <Field name="password" component="input" type="password" placeholder="Password" />
      </Form.Field>
      <Form.Button type="submit" content="Log In" disabled={pristine || submitting} />
      <Message error header="Please fix the following error(s):" list={errorMessages} />
    </Form>
  );
};

export default reduxForm({
  form: 'login',
  onSubmit: onSubmitActions('auth/LOGIN'),
})(LoginForm);
