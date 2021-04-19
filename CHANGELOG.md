# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.11.0] - 2021-04-19

### Added

- Add RUS for RUSSIA.
- RUS's `birthdate` field's changed using mask function as ROU format (`DD.MM.YYYY`)
- RUS's `document` field to optional and Hide.

## [2.10.1] - 2021-03-22

### Fixed

- I18n Ro.

## [2.10.0] - 2021-03-17

- Added prop `blockDocument` to Enables or disables editing the document field in my account

## [2.9.3] - 2021-01-11

### Fixed

- Release versions

## [2.9.2] - 2021-01-08 [YANKED]

## [2.9.1] - 2021-01-08 [YANKED]

## [2.9.0] - 2021-01-08 [YANKED]

## [2.8.0] - 2021-01-06 [YANKED]

### Added

- Specific rules for `ITA`.

## [2.7.3] - 2020-10-14

### Fixed

- changed `birthdate` field's mask function to match the ro_RO format from moment (`DD.MM.YYYY`)

## [2.7.2] - 2020-07-08

### Changed

- App setup with `vtex setup`

### Fixed

- Italian i18n.

## [2.7.1] - 2020-03-16

### Changed

- CHL's `document` field to optional.
- ESP's `homePhone` field to optional.

## [2.7.0] - 2019-11-19

### Added

- **de** translations.

## [2.6.11] - 2019-10-15

### Added

- pt-PT translation.

## [2.6.10] - 2019-10-01

### Changed

- `birthDate` validation function for all countries to not accept future dates.

## [2.6.9] - 2019-09-04

### Fixed

- GTM rules not importing `regexValidation` function.

### Added

- Error message for unknown error when importing rule.

## [2.6.8] - 2019-07-19

### Fixed

- `businessPhone` to use **getPhoneFields** function, instead of the Phone lib that was not being imported.

## [2.6.7] - 2019-07-04

### Fixed

- Fallback gender translation to the value returned from the `store-graphql`.

## [2.6.6] - 2019-07-03

### Fixed

- Validate fields against emojis. 😱

## [2.6.5] - 2019-06-27

### Fixed

- Wrong 'female' translation in catalan.

## [2.6.4] - 2019-06-13

### Fixed

- _Profile Container_ fixed submit on enter.

## [2.6.3] - 2019-06-10

### Fixed

- `COL` document regex validation.

## [2.6.2] - 2019-05-24

### Fixed

- Birth Date failing to be empty.

## [2.6.1] - 2019-05-23

### Added

- `disabled` prop into input rules.

## [2.6.0] - 2019-05-22

### Added

- CSS handles to elements

## [2.5.3] - 2019-05-20

### Fixed

- Birth date decrementing one day after a profile save for certain timezones.

## [2.5.2] - 2019-04-26

### Fixed

- `@vtex/phone` initialization.

## [2.5.1] - 2019-04-16

### Changed

- Document obligation on Spain.

## [2.5.0] - 2019-04-16

### Added

- Italian translation.

## [2.4.4] - 2019-02-14

## [2.4.3] - 2019-02-14

## [2.4.2] - 2019-02-01

## [2.4.1] - 2019-01-24

### Changed

- Insert default functions to rules of type `date`.

## [2.4.0] - 2019-01-22

### Changed

- Bumps messages builder major

## [2.3.0] - 2019-01-14

### Added

- Catalan translation

### Changed

- Messages filenames from locales to languages (`pt-BR` to `pt`), that makes it match more cases.

## [2.2.0] - 2018-12-28

### Changed

- Add Messages Builder.

## [2.1.0] - 2018-11-29

### Added

- Add ARG, CAN, CHL, COL, CRI, ECU, ESP, FRA, GBR, GTM, KOR, MEX, PAN, PER, PRT, PRY, ROU, URY, USA and VEN country rules

### Changed

- Remove `stateRegistration` from default rule

### Fixed

- Fix phone input to always submit phone in international format

## [2.0.4] - 2018-11-21

### Fixed

- Fix rule dynamic loading

## [2.0.3] - 2018-08-31

### Added

- `isCorporate` attribute to profile object

### Fixed

- Business fields validation now depend on `isCorporate` flag

## [2.0.2] - 2018-08-29

### Added

- Translations for `es`, `fr` and `ro`

## [2.0.1] - 2018-08-21

### Fixed

- Helper function imports in IO

## [2.0.0] - 2018-08-20

### Added

- Display custom components inside `ProfileContainer`

### Changed

- [**BREAKING**] Much of the app's folder structure

## [1.1.2] - 2018-08-17

### Added

- `vtex.io` integration

## [1.1.1] - 2018-08-13

### Added

- `email` field

## [1.1.0] - 2018-08-10

### Added

- Transform functions before display and submit

## [1.0.0] - 2018-08-08

### Added

- `ProfileSummary` component

## [0.7.0] - 2018-08-07

### Added

- Gender picker

## [0.6.0] - 2018-08-06

### Added

- Business inputs and toggling
- Validators for CPF and CNPJ
- README documentation

## [0.5.0] - 2018-08-03

### Added

- Validation on input change and form submit
- Masking
- Lots of tests

## [0.4.0] - 2018-08-02

### Added

- Submission functionality
- Customizable inputs

### Changed

- `ProfileInput` was renamed to `StyleguideInput` and moved to an `inputs` folder

## [0.3.0] - 2018-08-01

### Added

- New `ProfileRules` component and tests
- Default rules

## [0.2.0] - 2018-08-01

### Added

- Three new components: `ProfileContainer`, `ProfileField` and `ProfileInput`
- Read-and-write functionality for the form
- Tests
- Basic rule structure
- Proptype schema
- Some translations

## [0.1.0] - 2018-07-31

### Added

- Basic project structure
