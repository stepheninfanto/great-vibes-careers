import { Job } from "./types/FormTypes";

// get
export const getJobsList = async () => {
  const response = await fetch(`${process.env.MY_URL}/api/jobDetails`, {
    next: { tags: ["jobCollection"], revalidate: 0 },
  });
  const { data } = await response.json();
  return data;
};
// add
export async function saveJobDetails(data: Job) {
  const { id, ...rest } = data;
  const options = {
    method: "POST",
    body: JSON.stringify(rest),
  };
  const response = await fetch("/api/jobDetails", options);
  await response.json();
  return response;
}
// edit
export async function editJobDetails(id: Number, data: any) {
  const options = {
    method: "PUT",
    body: JSON.stringify(data),
  };
  const response = await fetch(`/api/jobDetails/${id}`, options);
  const customer = await response.json();
  return customer;
}

export async function deleteJobDetails(id: Number) {
  const options = {
    method: "DELETE",
  };
  const response = await fetch(`/api/jobDetails/${id}`, options);
  const customer = await response.json();
  return customer;
}
