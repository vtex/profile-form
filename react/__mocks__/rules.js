export default {
  country: 'BRA',
  personalFields: [
    {
      name: 'firstName',
      maxLength: 100,
      label: 'firstName',
      required: true,
    },
    {
      name: 'gender',
      label: 'gender',
      maxLength: 30,
    },
    {
      name: 'birthDate',
      maxLength: 30,
      label: 'birthDate',
      
    },
    {
      name: 'lastName',
      maxLength: 100,
      label: 'lastName',
      required: true,
    },
  ],
  businessFields: [
    {
      name: 'tradeName',
      label: 'tradeName',
      maxLength: 100,
    },
  ],
}
