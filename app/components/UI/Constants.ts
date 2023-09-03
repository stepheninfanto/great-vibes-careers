export const formFieldsStep1 = [
  {
    htmlFor: "jobtitle",
    label: "Job title",
    placeholder: "ex. UX UI Designer",
    name: "jobTitle",
    mandatory: true,
    inputType: "text",
    errorMessage: "Please enter your job title",
  },
  {
    htmlFor: "companyName",
    label: "Company name",
    placeholder: "ex. Google",
    name: "companyName",
    mandatory: true,
    inputType: "text",
    errorMessage: "please enter your company name",
  },
  {
    htmlFor: "Industry",
    label: "Industry",
    placeholder: "ex. Information Technology",
    name: "industryName",
    mandatory: true,
    inputType: "text",
    errorMessage: "please enter your industry name",
  },
];

export const additonalFormFieldsStep1 = [
  {
    htmlFor: "location",
    label: "Location",
    placeholder: "ex. Chennai",
    name: "location",
    labelInvisible: false,
    inputType: "text",
  },
  {
    htmlFor: "remoteType",
    label: "Remote Type",
    placeholder: "ex. In Office",
    name: "remoteType",
    labelInvisible: false,
    inputType: "text",
  },
];

export const formFieldsStep2 = [
  {
    label: "Experience",
    name: "experience-min",
    htmlFor: "experience",
    labelInVisible: false,
    inputType: "number",
    placeholder: "0",
  },
  {
    label: "Experience",
    name: "experience-max",
    htmlFor: "experience",
    labelInVisible: true,
    inputType: "number",
    placeholder: "1",
  },
  {
    label: "Salary",
    name: "salary-min",
    htmlFor: "salary",
    labelInVisible: false,
    inputType: "number",
    placeholder: "0",
  },
  {
    label: "Salary",
    name: "salary-max",
    htmlFor: "salary",
    labelInVisible: true,
    inputType: "number",
    placeholder: "100,000",
  },
];

export const additonalFormFieldsStep2 = [
  { label: "Quick Apply", name: "Quick" },
  { label: "External Apply", name: "External" },
];

export const initalState = {
  id: 0,
  jobTitle: "",
  companyName: "",
  industryName: "",
  location: "",
  remoteType: "",
  experience: [1, 2],
  salary: [0, 1],
  totalEmployee: "",
  applyType: "",
};
