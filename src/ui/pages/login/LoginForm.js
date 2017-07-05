import React from "react";
import { Form } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";

let LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Username</label>
        <Field
          name="username"
          component="input"
          type="text"
          placeholder="Username"
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <Field
          name="password"
          component="input"
          type="password"
          placeholder="Password"
        />
      </Form.Field>
      <Form.Button content="Log In" />
    </Form>
  );
};

export default reduxForm({ form: "login" })(LoginForm);
