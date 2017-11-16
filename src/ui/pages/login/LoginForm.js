import React from 'react';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';
import Yup from 'yup';
import { Button } from 'semantic-ui-react';

import TextInput from 'ui/components/form/textinput';

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
      }) => {
        const formClasses = classnames('ui', 'form', { error: isValid, loading: isSubmitting });
        return (
          <Form onSubmit={handleSubmit} className={formClasses}>
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

            <Button disabled={isSubmitting || !isValid}>Submit</Button>
          </Form>
        );
      }}
    />
  );
};

export default LoginForm;
