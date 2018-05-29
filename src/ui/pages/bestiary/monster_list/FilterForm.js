import React from 'react';
import { withFormik } from 'formik';
import { Form, Button, Header } from 'semantic-ui-react';
import * as yup from 'yup';
import { Field, Dropdown, Checkbox, Rating } from 'ui/components/form';

const elementOptions = ['Fire', 'Water', 'Wind', 'Light', 'Dark'].map(element => ({
  text: element,
  value: element,
  image: `${process.env.PUBLIC_URL}/assets/elements/${element.toLowerCase()}.png`
}));

const archetypeOptions = ['Attack', 'Defense', 'HP', 'Support', 'Material'].map(archetype => ({
  text: archetype,
  value: archetype
}));

const leaderSkillAttributeOptions = [
  'HP',
  'Attack Power',
  'Defense',
  'Attack Speed',
  'Critical Rate',
  'Resistance',
  'Accuracy',
  'Critical DMG'
].map(attribute => ({
  text: attribute,
  value: attribute
}));

const formikEnhancer = withFormik({
  displayName: 'FilterForm',
  mapPropsToValues: () => ({
    name__contains: '',
    element__value_in: [],
    is_awakened: null,
    base_stars__gte: 1,
    base_stars__lte: 6,
    archetype__value_in: []
  }),
  validationSchema: yup.object().shape({
    name__contains: yup.string().ensure(),
    element__value_in: yup.array(),
    is_awakened: yup.boolean().nullable(),
    base_stars__gte: yup.number().required(),
    base_stars__lte: yup.number().required(),
    archetype__value_in: yup.array()
  }),
  handleSubmit: (payload, bag) => {
    bag.props.handleSubmit(payload);
    bag.setSubmitting(false);
  }
});

class FilterForm extends React.Component {
  checkBaseStars = (name, rating) => {
    // Ensure that the min/max star fields follow each other if values overlap
    const min_value = this.props.values.base_stars__gte;
    const max_value = this.props.values.base_stars__lte;

    if (name === 'base_stars__lte' && min_value > rating) {
      this.props.setFieldValue('base_stars__gte', rating);
    }
    if (name === 'base_stars__gte' && max_value < rating) {
      this.props.setFieldValue('base_stars__lte', rating);
    }

    this.props.setFieldValue(name, rating);
  };

  render() {
    const {
      values,
      errors,
      touched,
      isValid,
      isDirty,
      setFieldValue,
      setFieldTouched,
      handleSubmit,
      isSubmitting
    } = this.props;

    return (
      <Form size="small" onSubmit={handleSubmit} loading={isSubmitting}>
        <Header sub>Monster Attributes</Header>
        <Field
          control="input"
          type="text"
          name="name__contains"
          label="Name"
          error={Boolean(touched.name__contains && errors.name__contains)}
          value={values.name__contains}
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
        <label>Awakened</label>
        <Form.Group inline>
          <Checkbox
            name="is_awakened"
            label="N/A"
            radio
            value={'null'}
            checked={values.is_awakened === null}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          />
          <Checkbox
            name="is_awakened"
            label="Yes"
            radio
            value={'true'}
            checked={values.is_awakened === true}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          />
          <Checkbox
            name="is_awakened"
            label="No"
            radio
            value={'false'}
            checked={values.is_awakened === false}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          />
        </Form.Group>
        <Form.Field>
          <label>Minimum Stars</label>
          <Rating
            name="base_stars__gte"
            label="Minimum Stars"
            value={values.base_stars__gte}
            maxRating={6}
            onChange={this.checkBaseStars}
            onBlur={setFieldTouched}
          />
        </Form.Field>
        <Form.Field>
          <label>Maximum Stars</label>
          <Rating
            name="base_stars__lte"
            label="Minimum Stars"
            value={values.base_stars__lte}
            maxRating={6}
            onChange={this.checkBaseStars}
            onBlur={setFieldTouched}
          />
        </Form.Field>
        <Dropdown
          name="archetype__value_in"
          label="Archetype"
          placeholder="Archetype"
          fluid
          multiple
          search
          selection
          options={archetypeOptions}
          value={values.archetype__value_in}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        <Button type="submit" disabled={isValid && isDirty}>
          Apply
        </Button>
      </Form>
    );
  }
}

export default formikEnhancer(FilterForm);
