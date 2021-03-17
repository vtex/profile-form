# Profile Form


> A React component for rendering and managing user profile forms

## Setup

Through **NPM**:

```sh
$ npm install @vtex/profile-form
```

```js
import ProfileContainer from '@vtex/profile-form/ProfileContainer'
```

Through **vtex.io**:

Add `vtex.profile-form` to your `manifest.json` dependencies

```js
import { ProfileSummary } from 'vtex.profile-form'
```

Helper functions are properties of the `modules` import

```js
import { modules } from 'vtex.profile-form'
const { addValidation } = modules
```

## API

### Base Components

- [ProfileContainer](#profilecontainer)
- [ProfileRules](#profilerules)
- [ProfileSummary](#profilesummary)

### Helper Functions

- [addValidation](#addvalidation)
- [removeValidation](#removevalidation)

### Public Modules

- [locales/](#locales)
- [rules/](#rules)
- [inputs/](#inputs)

### Types

- [ProfileShape](#profileshape)
- [ProfileFieldShape](#profilefieldshape)
- [ProfileWithValidationShape](#profilewithvalidationshape)
- [RuleFieldShape](#rulefieldshape)
- [RuleShape](#ruleshape)

---

## Base Components

### ProfileContainer

This is the main component of `profile-form`. It will render inputs based on the rules provided, and fill them with data from the profile object passed to it. It also spawns internal child components that perform validation on such inputs, also based on the rules.

`ProfileContainer` keeps the current profile being managed in its internal state; the `defaultProfile` prop is only accessed at mount time. If you need to update the prop at some other time, use the special `key` prop to force the recreation of the whole container with the new profile. It provides an `onSubmit()` function to call a function in the host component when the user submits the form.

Inputs and buttons inside `ProfileContainer` can be customized to fit the style of different host applications. You can also pass in children components and they will be displayed right before the business toggle button, but they won't receive validation, submission or state management - you must do that yourself.

#### Props

- **rules**: (default: the default rules) Set of rules for this form
- **defaultProfile**: Initial data for the profile object
- **onSubmit**: Function to be called upon form submission. Receives as argument an object containing a `valid` boolean representing the state of the profile object, and a clean profile (shape: `ProfileShape`)
- **Input**: (default: `StyleguideInput`) Component to be used as input for the form fields
- **ToggleBusinessButton**: Component to be used as a button for toggling business fields
- **SubmitButton**: Component to be used as a submit button
- **shouldShowExtendedGenders**: (default: `false`) Whether the gender input should display a wide list of genders or just male/female
- **children**: Custom components to be added right before the business toggle button
- **intl**: `react-intl` automatically injected util
- **blockDocument**: Enables or disables editing the document field in my account page.

```js
ProfileContainer.propTypes = {
  rules: RuleShape.isRequired,
  defaultProfile: ProfileShape,
  onSubmit: PropTypes.func.isRequired,
  Input: PropTypes.func,
  ToggleBusinessButton: PropTypes.element,
  SubmitButton: PropTypes.element,
  shouldShowExtendedGenders: PropTypes.bool,
  children: PropTypes.node,
  intl: intlShape.isRequired,
}
```

#### Example

```js
<ProfileContainer
  profile={profile}
  rules={brRules}
  onSubmit={this.handleSubmit}
/>
```

An example with customized buttons:

```js
<ProfileContainer
  profile={profile}
  rules={brRules}
  onSubmit={this.handleSubmit}
  Input={StyleguideInput}
  SubmitButton={
    <Button block size="small">
      Save profile
    </Button>
  }
  ToggleBusinessButton={<Button size="small" block />}
/>
```

Note that the `onClick` hook for both buttons is automatically injected by the container. Also, the text for the `ToggleBusinessButton` is standardized; you don't need to pass any text inside your button (and if you do, it will be overwritten).

### ProfileRules

This component contains functionality for easily fetching the profile rules for any country and providing them to its direct children (usually a `ProfileContainer` component).

#### Props

- **`children`**: The component which will be rendered inside this component and, therefore, receive the provided rules (you probably want this to be a `ProfileContainer` instance)
- **`country`**: The string identifier for the country which rules are to be provided, must use `ISO Alpha3` standard (e.g. `BRA`, `USA`, etc.)
- **`shouldUseIOFetching`**: Whether to use built-in dynamic file fetching for the rules. Should be used if the project is an IO app
- **`fetch`**: Functionality for fetching the rule files. Outside of IO, it **must** receive the function `{country => import('@vtex/profile-form/lib/rules/' + country)}` as its value. In IO, this prop **must not** be set

```js
ProfileRules.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string.isRequired,
  shouldUseIOFetching: PropTypes.bool,
  fetch: PropTypes.func,
}
```

#### Example

Here, `ProfileContainer` will be injected with the fetched rules:

```js
<ProfileRules
  locale={'pt-BR'}
  fetch={locale => import('../../src/rules/' + locale)}
>
  <ProfileContainer profile={profile} onSubmit={this.handleSubmit} />
</ProfileRules>
```

### ProfileField

This component that renders my account fields. It received new two more properties to make it possible to block the document field: `userProfile` and` blockDocument`

#### Props

- **`userProfile`**: User profile so that we can check if the saved document already exists in database.
- **`blockDocument`**: Enables or disables editing the document field in my account page. This property comes from the my-account module


```js
<ProfileField
key={field.name}
field={field}
data={profile[field.name]}
options={options[field.name]}
onFieldUpdate={this.handleFieldUpdate}
Input={Input}
userProfile={profile}
blockDocument={this.props.blockDocument}
 />
```


### Exemple:

```js
render() {
    const { field, data, options, Input, userProfile, blockDocument } = this.props
    if(blockDocument && field.name === 'document' && userProfile['document'].value !== null){
      field.disabled = true      
    }
    return (
      <Input
        field={field}
        data={data}
        options={options}
        inputRef={this.inputRef}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    )
  }
}
```
### ProfileSummary

This component takes in a profile object and a set of rules and prepares the data for displaying. Its main advantages are handling the translation of the labels and informing which fields should be hidden, but it also does some parsing logic such as translating gender and masking phone.

`ProfileSummary` renders nothing by itself. The data is served as a render prop, and the host app must display it as desired. An object is passed with three properties: `isCorporate`, a boolean value indicating if the profile represents a corporation, and `personalData` and `businessData`, where each of these is an object with the keys being the field names (such as `firstName` or `homePhone` for `personalData`) and the value being an object containing useful information for displaying each field:

- `label`: the field label, already translated.
- `value`: the value obtained from the `profile` prop, masked if necessary
- `hidden`: whether this field should be hidden or not

#### Props

- **`profile`**: The profile object whose data will be served
- **`rules`**: The set of rules to apply over the profile. Works best if injected by a `ProfileRules` component
- **`children`**: The render prop function, serving the data in the structure explained above
- **`intl`**: `react-intl` internal utility

```js
ProfileSummary.propTypes = {
  profile: ProfileShape.isRequired,
  rules: RuleShape.isRequired,
  children: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}
```

#### Example

```js
<ProfileSummary profile={profile}>
  {({ personalData, businessData, isCorporate }) => (
    <div>
      <h3>Personal Data:</h3>
      {Object.keys(personalData).map(fieldName =>
        <div>
          {!personalData[fieldName].hidden &&
            <label>{personalData[fieldName].label}</label>}
          {!personalData[fieldName].hidden &&
            <span>{personalData[fieldName].value}</span>}
        </div>
      )}
      {isCorporate && (
        <h3>Business Data:</h3>
        {/* [...] */}
      )}
    </div>
  )}
</ProfileSummary>
```

## Helper Functions

### addValidation

This function takes in a clean profile and a set of rules, and generates another profile object with validation metadata (following `ProfileWithValidationShape`). Besides just wrapping each property, it checks each rule for a `display` transform function, and applies it to the value before returning. This is specially useful when editing dates, as they usually come from the API as a `YYYY-MM-DD` string and you may want to change the format to something more localized before displaying it inside the text input.

#### Params

- **`profile`**: A profile in the shape of [`ProfileShape`](#profileshape)
- **`rules`**: A set of rules in the shape of [`RuleShape`](#ruleshape)

#### Returns

- A profile in the shape of [`ProfileWithValidationShape`](#profilewithvalidationshape)

### removeValidation

This is the inverse to the `addValidation` function above. As such, besides stripping validation metadata it also checks the rules for `submit` transformations and applies it to the proper fields. Again, this is useful to transform dates from the user's localized format to the international format required by the API.

#### Params

- **`profile`**: A profile in the shape of [`ProfileWithValidationShape`](#profilewithvalidationshape)
- **`rules`**: A set of rules in the shape of [`RuleShape`](#ruleshape)

#### Returns

- A profile in the shape of [`ProfileShape`](#profileshape)

## Public Modules

### locales/

This folder contains JSON localized files providing translations for every text used inside the `profile-form`. The correct files must be imported and provided by the host app at their own charge.

### rules/

This folder provides files for each supported country, containing the rules used to manage the form. There are also default rules, which are used when an unsupported country is provided to the `ProfileRules` component.

Such rules provide information on how each field of the form should be rendered. Functionality for masking and validating inputs is also provided inside the rules and isolated by field - there are no built-in validators in `profile-form` (except for checking mandatory fields).

### inputs/

This folder provides inputs to be used as building blocks for the profile form. Currently, only `StyleguideInput`, an input which follows the [VTEX Styleguide](https://vtex.github.io/styleguide/#input), is provided.

## Types

### ProfileShape

This is the shape of a clean profile object, as if it had just been retrieved from a server.

```js
PropTypes.shape({
  /** Date of the user's birth */
  birthDate: PropTypes.string,
  /** User's business phone */
  businessPhone: PropTypes.string,
  /** User's corporate document */
  corporateDocument: PropTypes.string,
  /** User's corporate name */
  corporateName: PropTypes.string,
  /** User's personal document */
  document: PropTypes.string,
  /** User's email */
  email: PropTypes.string,
  /** User's personal name */
  firstName: PropTypes.string,
  /** User's gender */
  gender: PropTypes.string,
  /** User's personal phone */
  homePhone: PropTypes.string,
  /** User's surname */
  lastName: PropTypes.string,
  /** User's corporate state registration */
  stateRegistration: PropTypes.string,
  /** User's corporate trade name */
  tradeName: PropTypes.string,
  /** Whether the user is a corporation or not */
  isCorporate: PropTypes.bool,
})
```

### ProfileFieldShape

When the profile object is passed to `ProfileContainer`, validation data is added to each field. Thus, every field is now an object with the following shape:

```js
PropTypes.shape({
  /** The value for that field */
  value: PropTypes.any,
  /** i18n code for the error this value is presenting */
  error: PropTypes.string,
  /** Whether the input should receive focus */
  focus: PropTypes.bool,
  /** Whether the input has already been touched by the user */
  touched: PropTypes.bool,
})
```

### ProfileWithValidationField

The whole validated profile object simply maintains the same structure as in `ProfileShape`, but now each field is of type `ProfileFieldShape`.

### RuleShape

Every rule inside the `rules/` folder contains the structure below. The fields are divided between `personal` and `business` fields, in order to be able to alternate visibility between them.

```js
PropTypes.shape({
  /** The country this rule refers to */
  country: PropTypes.string,
  /** Configuration for the personal fields */
  personalFields: PropTypes.arrayOf(RuleFieldShape).isRequired,
  /** Configuration for the business fields */
  businessFields: PropTypes.arrayOf(RuleFieldShape).isRequired,
})
```

### RuleShape

Inside each `fields` array of a rules object, every object represents one field of `profile-form`. These objects take on the shape below. Inside these rule-shaped objects, validation and masking functionality is provided.

```js
PropTypes.shape({
  /** Name for both the field and the profile object property */
  name: PropTypes.string.isRequired,
  /** Maximum length of the field */
  maxLength: PropTypes.number,
  /** i18n code for the label to be displayed over the field */
  label: PropTypes.string.isRequired,
  /** Whether the field is required or not */
  required: PropTypes.bool,
  /** Whether the field should be hidden or not */
  hidden: PropTypes.bool,
  /** Function returning a mask to be applied on the value */
  mask: PropTypes.func,
  /** A function to evaluate if the value is valid */
  validate: PropTypes.func,
  /** A function to transform received data before displaying */
  display: PropTypes.func,
  /** A function to transform input data before submitting */
  submit: PropTypes.func,
})
```

---

Author: **Gustavo Silva** (@​​​​​​​​​​​​​​​​​​​​​a​​kaFTS)

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
