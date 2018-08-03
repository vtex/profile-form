export default {
  personalFields: [
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
      name: 'gender',
      maxLength: 30,
      label: 'gender',
    },
    {
      name: 'document',
      maxLength: 50,
      label: 'cpf',
      hidden: true,
    },
  ],
  businessFields: [],
}
