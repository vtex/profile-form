# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Hungarian validation to match hungarian mask when last dot is missing

## [3.16.4] - 2024-05-03

### Fixed
- Default rule date mask

## [3.16.3] - 2024-04-24

## [3.16.2] - 2024-04-05

### Fixed
- Hungarian date mask

## [3.16.1] - 2023-10-11

### Fixed

- Unhides the ID field for Costa Rica as it is a government requirement.

## [3.16.0] - 2023-10-10

### Added

- Hungary country rules to remove mandatory document.

## [3.15.1] - 2023-09-19

### Fixed

- English, Spanish, Portuguese and Indonesian translations.

## [3.15.0] - 2022-12-20

### Added

- Indonesian translation.

## [3.14.3] - 2022-12-13

### Fixed

- English translation.

## [3.14.2] - 2022-10-28

### Chore

- Updated `@vtex/phone` version.

## [3.14.1] - 2022-09-14

### Fixed

- Romanian translation.

## [3.14.0] - 2022-08-17

### Changed

- Added `stateRegistration` to `ROU` rule.

## [3.13.4] - 2022-08-02

### Fixed

- Added DEU birthDate mask.

## [3.13.3] - 2022-07-22

### Added

- Australia ('AUS'), Czech Republic ('CZE'), Indonesia ('IDN'), New Zealand ('NZL') and Slovakia ('SVK') country rules.

### Fixed

- Czech and Slovak translations.

## [3.13.2] - 2022-07-11

### Added

- Thai translation.

## [3.13.1] - 2022-03-17

### Fixed

- Arabic translation.

## [3.13.0] - 2022-02-25

### Added

- South Africa country rules (`ZAF`).

## [3.12.1] - 2022-02-22

### Fixed

- Remove mask using `.` as separator in `birthdate` field for `IND` rules.

## [3.12.0] - 2022-02-18

### Added

- Specific rules for India (`IND`).
- Norwegian variant translation.

### Fixed

- Specific rules for Singapore (`SGP`).

## [3.11.0] - 2022-02-03

- Specific rules for Poland (`POL`).
- Specific rules for Singapore (`SGP`).

## [3.10.0] - 2021-11-04

### Added

- Arabic and Hungarian translations.

### Changed

- Danish, Finnish, Japanese, Portuguese, and Ukranian translations.

## [3.9.2] - 2021-10-21

### Fixed

- Gender field translation.

## [3.9.1] - 2021-09-09

### Changed

- I18n En.

## [3.9.0] - 2021-07-28

### Added

- Specific rules for `BEL`.

## [3.8.0] - 2021-04-26

### Added

- New translations.
- Crowdin configuration file.

### Changed

- I18n Ca, De, Fr, It, Ro.

## [3.7.0] - 2021-04-22

### Added

- I18n Denmark
- I18n Deutschland
- I18n Finnland
- I18n Sweden

## [3.6.0] - 2021-04-19

### Added

- Add RUS for RUSSIA.
- RUS's `birthdate` field's changed using mask function as ROU format (`DD.MM.YYYY`)
- RUS's `document` field to optional and Hide.

## [3.5.1] - 2021-03-22

### Fixed

- I18n Ro.

## [3.5.0] - 2021-03-17

### Added

- Added prop `blockDocument` to Enables or disables editing the document field in my account

## [3.4.0] - 2021-01-06

### Added

- Specific rules for `ITA`.

## [3.3.3] - 2020-10-14

### Fixed

- changed `birthdate` field's mask function to match the ro_RO format from moment (`DD.MM.YYYY`)

## [3.3.2] - 2020-05-21

### Fixed

- `it` locale translations

## [3.3.1] - 2020-03-16

### Changed

- CHL's `document` field to optional.
- ESP's `homePhone` field to optional.

## [3.3.0] - 2019-11-21

### Added

- **de** translations.

## [3.2.11] - 2019-10-16

### Added

- pt-PT translation.

## [3.2.10] - 2019-10-14

### Changed

- Get changes made at version `v2.6.10`.

## [2.6.10] - 2019-10-01

### Changed

- `birthDate` validation function for all countries to not accept future dates.

## [3.2.9] - 2019-09-04

### Changed

- Get changes made at version `v2.6.9`.

## [2.6.9] - 2019-09-04

### Fixed

- GTM rules not importing `regexValidation` function.

### Added

- Error message for unknown error when importing rule.

## [3.2.8] - 2019-07-19

### Changed

- Get changes made at version `v2.6.8` and `v2.6.7`.

## [2.6.8] - 2019-07-19

### Fixed

- `businessPhone` to use **getPhoneFields** function, instead of the Phone lib that was not being imported.

## [2.6.7] - 2019-07-04

### Fixed

- Fallback gender translation to the value returned from the `store-graphql`.

## [3.2.7] - 2019-07-03

### Changed

- Get changes made at version `v2.6.6`.

## [2.6.6] - 2019-07-03

### Fixed

- Validate fields against emojis. 😱

## [3.2.6] - 2019-06-27

### Changed

- Get changes made at version `v2.6.5`.

## [2.6.5] - 2019-06-27

### Fixed

- Wrong 'female' translation in catalan.

## [3.2.5] - 2019-06-13

### Changed

- Get changes made at version `v2.6.4`.

## [2.6.4] - 2019-06-13

### Fixed

- _Profile Container_ fixed submit on enter.

## [3.2.4] - 2019-06-10

### Changed

- Get changes made at version `v2.6.3`.

## [2.6.3] - 2019-06-10

### Fixed

- `COL` document regex validation.

## [3.2.3] - 2019-05-24

### Changed

- Get changes made at version `v2.6.2`.

## [2.6.2] - 2019-05-24

### Fixed

- Birth Date failing to be empty.

## [3.2.2] - 2019-05-23

### Fixed

- `react` version to `v3.x`.

## [3.2.1] - 2019-05-23

### Changed

- Get changes made at version `v2.6.1`.

## [2.6.1] - 2019-05-23

### Added

- `disabled` prop into input rules.

## [3.2.0] - 2019-05-23

### Added

- CSS handles.

## [3.1.1] - 2019-05-20

### Changed

- Get changes made at version `v2.6.0`.

## [2.6.0] - 2019-05-22

### Added

- CSS handles to elements

## [2.5.3] - 2019-05-20

### Fixed

- Birth date decrementing one day after a profile save for certain timezones.

## [3.0.4] - 2019-04-26

### Changed

- Get changes made at version `v2.5.2`.

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
