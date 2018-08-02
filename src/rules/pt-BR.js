export default {
  country: 'BRA',
  fields: [
    {
      name: 'firstName',
      maxLength: 100,
      label: 'firstName',
      required: true,
    },
    {
      name: 'lastName',
      maxLength: 100,
      label: 'lastName',
      required: true,
    },
    {
      name: 'document',
      maxLength: 50,
      label: 'cpf',
      mask: () => '999.999.999-99',
    },
    {
      name: 'gender',
      maxLength: 30,
      label: 'gender',
      required: true,
      validate: value => {
        return value === 'male' || value === 'female'
      },
    },
    {
      name: 'birthDate',
      maxLength: 30,
      label: 'birthDate',
    },
    {
      name: 'homePhone',
      maxLength: 30,
      label: 'homePhone',
    },
    {
      name: 'businessPhone',
      maxLength: 30,
      label: 'businessPhone',
      hidden: true,
    },
    {
      name: 'corporateDocument',
      maxLength: 30,
      label: 'cnpj',
      hidden: true,
    },
    {
      name: 'corporateName',
      maxLength: 30,
      label: 'corporateName',
      hidden: true,
    },
    {
      name: 'stateRegistration',
      maxLength: 30,
      label: 'stateRegistration',
      hidden: true,
    },
    {
      name: 'tradeName',
      maxLength: 30,
      label: 'tradeName',
      hidden: true,
    },
  ],
}
