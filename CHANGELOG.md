# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
