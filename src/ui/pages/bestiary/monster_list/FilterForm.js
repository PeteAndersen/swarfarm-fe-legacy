import React from 'react';
import { withFormik } from 'formik';
import { Form, Button, Header } from 'semantic-ui-react';
import * as yup from 'yup';
import { Field, Dropdown, Checkbox, Rating, EffectDropdown } from 'ui/components/form';

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

const leaderSkillAreaOptions = ['General', 'Dungeon', 'Element', 'Arena', 'Guild'].map(area => ({
  text: area,
  value: area
}));

const formikEnhancer = withFormik({
  displayName: 'FilterForm',
  mapPropsToValues: () => ({
    auto_apply: false,
    name: '',
    element: [],
    is_awakened: null,
    min_stars: 1,
    max_stars: 6,
    archetype: [],
    leader_skill_area: [],
    leader_skill_attribute: [],
    leader_skill_min_amount: 0,
    buffs: [],
    debuffs: [],
    others: []
  }),
  validationSchema: yup.object().shape({
    name: yup.string().ensure(),
    element: yup.array(),
    is_awakened: yup.boolean().nullable(),
    min_stars: yup.number().required(),
    max_stars: yup.number().required(),
    archetype: yup.array(),
    leader_skill_area: yup.array(),
    leader_skill_attribute: yup.array(),
    leader_skill_min_amount: yup
      .number()
      .min(0)
      .max(55)
      .required(),
    buffs: yup.array(),
    debuffs: yup.array(),
    others: yup.array()
  }),
  handleSubmit: (payload, bag) => {
    bag.props.handleSubmit(payload);
    bag.setSubmitting(false);
  }
});

class FilterForm extends React.Component {
  checkBaseStars = (name, rating) => {
    // Ensure that the min/max star fields follow each other if values overlap
    const { min_stars, max_stars } = this.props.values;

    if (name === 'max_stars' && min_stars > rating) {
      this.props.setFieldValue('min_stars', rating);
    }
    if (name === 'min_stars' && max_stars < rating) {
      this.props.setFieldValue('max_stars', rating);
    }

    this.props.setFieldValue(name, rating);
  };

  render() {
    const {
      values,
      errors,
      touched,
      isValid,
      setFieldValue,
      setFieldTouched,
      handleSubmit,
      isSubmitting
    } = this.props;
    console.log(this.props);

    return (
      <Form size="small" onSubmit={handleSubmit} loading={isSubmitting}>
        <Header sub>Monster Attributes</Header>
        <Field
          control="input"
          type="text"
          name="name"
          label="Name"
          error={Boolean(touched.name && errors.name)}
          value={values.name}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        <Dropdown
          name="element"
          label="Element"
          placeholder="Element"
          fluid
          multiple
          search
          selection
          options={elementOptions}
          value={values.element}
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
            name="min_stars"
            label="Minimum Stars"
            value={values.min_stars}
            maxRating={6}
            onChange={this.checkBaseStars}
            onBlur={setFieldTouched}
          />
        </Form.Field>
        <Form.Field>
          <label>Maximum Stars</label>
          <Rating
            name="max_stars"
            label="Minimum Stars"
            value={values.max_stars}
            maxRating={6}
            onChange={this.checkBaseStars}
            onBlur={setFieldTouched}
          />
        </Form.Field>
        <Dropdown
          name="archetype"
          label="Archetype"
          placeholder="Archetype"
          fluid
          multiple
          search
          selection
          options={archetypeOptions}
          value={values.archetype}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />

        <Header sub>Leader Skill</Header>
        <Dropdown
          name="leader_skill_area"
          label="Area of Effect"
          placeholder="Area of Effect"
          fluid
          multiple
          search
          selection
          options={leaderSkillAreaOptions}
          value={values.leader_skill_area}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        <Dropdown
          name="leader_skill_attribute"
          label="Attribute"
          placeholder="Attribute"
          fluid
          multiple
          search
          selection
          options={leaderSkillAttributeOptions}
          value={values.leader_skill_attribute}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        <Field
          control="input"
          type="number"
          min={0}
          max={55}
          name="leader_skill_min_amount"
          label="Minimum Bonus"
          value={values.leader_skill_min_amount}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />

        <Header sub>Skills</Header>
        <EffectDropdown
          name="buffs"
          label="Buffs"
          placeholder="Buffs"
          type="buffs"
          fluid
          multiple
          search
          selection
          value={values.buffs}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        <EffectDropdown
          name="debuffs"
          label="Debuffs"
          placeholder="Debuffs"
          type="debuffs"
          fluid
          multiple
          search
          selection
          value={values.debuffs}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
        <EffectDropdown
          name="others"
          label="Other Effects"
          placeholder="Other Effects"
          type="others"
          fluid
          multiple
          search
          selection
          value={values.others}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />

        <Form.Group inline>
          <Button type="submit" disabled={values.auto_apply || !isValid}>
            Apply
          </Button>
          <Checkbox
            label="Auto apply"
            name="auto_apply"
            checked={values.auto_apply}
            onChange={setFieldValue}
          />
        </Form.Group>
      </Form>
    );
  }
}

export default formikEnhancer(FilterForm);
