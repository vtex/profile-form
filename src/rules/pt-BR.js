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
  ],
}
