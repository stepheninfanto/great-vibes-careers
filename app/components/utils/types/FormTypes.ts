export type Job = {
  id: Number;
  jobTitle: string;
  companyName: string;
  industryName: string;
  location: string;
  remoteType: string;
  experience: Array<Number>;
  salary: Array<Number>;
  totalEmployee: string;
  applyType: string;
  [key: string]: string | Number | Array<Number>;
};
