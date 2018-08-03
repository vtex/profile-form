# Profile Form

> A React component for rendering and managing user profile forms

## Setup

```sh
$ npm install @vtex/profile-form
```

## API

### Base Components

- [ProfileContainer](#profilecontainer)
- [ProfileRules](#profilerules)

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

`ProfileContainer` keeps the current profile being managed in its internal state; the `profile` prop is only accessed at mount time. If you need to update the prop at some other time, use the special `key` prop to force the recreation of the whole container with the new profile.

It provides an `onProfileChange()` function to notify the host application of any changes happening inside the form. It also provides an optional `onSubmit()` function to call a function in the host component when the user submits the form.

Inputs and buttons inside `ProfileContainer` can be customized to fit the style of different host applications.

#### Props

- **rules**: (default: the default rules) Set of rules for this form
- **profile**: Profile data to be managed
- **onProfileChange**: Function to be called when profile data changes. Receives as argument the current profile state (shape: `ProfileWithValidationShape`)
- **onSubmit**: Function to be called upon form submission. Receives as argument an object containing a `valid` boolean representing the state of the profile object, and a clean profile (shape: `ProfileShape`)
- **Input**: (default: `StyleguideInput`) Component to be used as input for the form fields
- **ToggleBusinessButton**: Component to be used as a button for toggling business fields
- **SubmitButton**: Component to be used as a submit button
- **intl**: `react-intl` automatically injected util

```js
ProfileContainer.propTypes = {
  rules: RuleShape.isRequired,
  profile: ProfileShape.isRequired,
  onProfileChange: PropTypes.func,
  onSubmit: PropTypes.func,
  Input: PropTypes.func,
  ToggleBusinessButton: PropTypes.element,
  SubmitButton: PropTypes.element,
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

Note that the `onClick` hook for both buttons is automatically injected by the container. Also, the text for the `ToggleBusinessButton` is standardized; you don't need to pass any text inside your button (and if you will, it will be overwritten).

### ProfileRules

This component contains functionality for easily fetching the profile rules for any country and providing them to its direct children (usually a `ProfileContainer` component).

#### Props

- **`children`**: The component which will be rendered inside this component and, therefore, receive the provided rules (you probably want this to be a `ProfileContainer` instance)
- **`locale`**: The string identifier for the country which rules are to be provided, must use `ISO Language Code` standard (e.g. `pt-BR`, `en-US`, etc.)
- **`fetch`**:Functionality for fetching the rule files. It **must** receive the function `{locale => import('@vtex/profile-form/lib/rules/' + locale)}` as its value

```js
ProfileRules.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
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

## Helper Functions

### addValidation

#### Params

- **`profile`**: A profile in the shape of [`ProfileShape`](#profileshape)

#### Returns

- A profile in the shape of [`ProfileWithValidationShape`](#profilewithvalidationshape)

### removeValidation

#### Params

- **`profile`**: A profile in the shape of [`ProfileWithValidationShape`](#profilewithvalidationshape)

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
})
```

---

Author: **Gustavo Silva** (@​​​​​​​​​​​​​​​​​​​​​a​​kaFTS)

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
