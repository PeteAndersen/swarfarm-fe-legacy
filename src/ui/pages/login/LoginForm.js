import React from 'react';
import { Formik, Form, Field } from 'formik';
import Yup from 'yup';
//import { Form, Input, Message } from 'semantic-ui-react';

const LoginForm = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required()
      })}
      onSubmit={handleSubmit}
      render={({
        values,
        errors,
        touched,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <Form onSubmit={handleSubmit}>
          <Field type="input" name="username" label="username" component={Form.Input} />
          {touched.username && errors.username && <div>{errors.username}</div>}

          <Field type="password" name="password" label="password" component={Form.Input} />
          {touched.password && errors.password && <div>{errors.password}</div>}

          <button disabled={isSubmitting || !isValid}>Submit</button>
        </Form>
      )}
    />
  );
};

export default LoginForm;
