export type Job = {
  id: number;
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
