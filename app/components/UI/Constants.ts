export const formFieldsStep1 = [
  {
    htmlFor: 'jobtitle',
    label: 'Job title',
    placeholder: 'ex. UX UI Designer',
    name: 'jobTitle',
    mandatory: true,
    inputType: 'text',
    errorMsg: 'should only contain Alphabets',
  },
  {
    htmlFor: 'companyName',
    label: 'Company name',
    placeholder: 'ex. Google',
    name: 'companyName',
    mandatory: true,
    inputType: 'text',
    errorMsg: 'should only contain Alphabets',
  },
  {
    htmlFor: 'Industry',
    label: 'Industry',
    placeholder: 'ex. Information Technology',
    name: 'industryName',
    mandatory: true,
    inputType: 'text',
    errorMsg: 'should only contain Alphabets',
  },
];

export const additonalFormFieldsStep1 = [
  {
    htmlFor: 'location',
    label: 'Location',
    placeholder: 'ex. Chennai',
    name: 'location',
    labelInvisible: false,
    inputType: 'text',
    errorMsg: 'should only contain Alphabets',
  },
  {
    htmlFor: 'remoteType',
    label: 'Remote Type',
    placeholder: 'ex. In Office',
    name: 'remoteType',
    labelInvisible: false,
    inputType: 'text',
    errorMsg: 'should only contain Alphabets',
  },
];

export const formFieldsStep2 = [
  {
    label: 'Experience',
    name: 'experience-min',
    htmlFor: 'experience',
    labelInVisible: false,
    inputType: 'number',
    placeholder: '0',
    errorMsg: 'should only contain numbers less than 100 (min<max)',
  },
  {
    label: 'Experience',
    name: 'experience-max',
    htmlFor: 'experience',
    labelInVisible: true,
    inputType: 'number',
    placeholder: '1',
    errorMsg: 'should only contain numbers less than 100  (min<max)',
  },
  {
    label: 'Salary',
    name: 'salary-min',
    htmlFor: 'salary',
    labelInVisible: false,
    inputType: 'number',
    placeholder: '0',
    errorMsg: 'should only contain numbers: (min<max)',
  },
  {
    label: 'Salary',
    name: 'salary-max',
    htmlFor: 'salary',
    labelInVisible: true,
    inputType: 'number',
    placeholder: '100,000',
    errorMsg: 'should only contain numbers: (min<max)',
  },
];

export const additonalFormFieldsStep2 = [
  { label: 'Quick Apply', name: 'Quick', errorMsg: 'Please enter valid input' },
  {
    label: 'External Apply',
    name: 'External',
    errorMsg: 'Please enter valid input',
  },
];

export const initalState = {
  id: 0,
  jobTitle: '',
  companyName: '',
  industryName: '',
  location: '',
  remoteType: '',
  experience: [0, 0],
  salary: [0, 0],
  totalEmployee: '',
  applyType: '',
};
