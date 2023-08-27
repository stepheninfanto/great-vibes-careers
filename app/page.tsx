import AppContainer from "./components/AppContainer";

async function getJobsList() {
  // const res = await fetch(`api/getJobDetails`);
  // return res.json();
  return [
    {
      jobId: 1,
      jobTitle: "Software Engineer",
      companyName: "TechCo Inc.",
      industryName: "Technology",
      location: "San Francisco, CA",
      remoteType: "Partial Remote",
      experience: "3+ years",
      salary: "$100,000 - $120,000",
      totalEmployee: "500+",
      applyType: "Quick Application",
    },
    {
      jobId: 2,
      jobTitle: "Marketing Specialist",
      companyName: "Global Marketing Group",
      industryName: "Marketing",
      location: "New York, NY",
      remoteType: "Fully Remote",
      experience: "2-4 years",
      salary: "$70,000 - $90,000",
      totalEmployee: "200+",
      applyType: "Quick Application",
    },
  ];
}

export default async function Home() {
  const jobsList = await getJobsList();
  return (
    <main className="flex min-h-screen flex-col p-5">
      <AppContainer jobsList={jobsList} />
      {/* exact as figma */}
      {/* styles as props  */}
      {/* state management for create */}
      {/* add edit and delete functionality  */}
      {/* add overlay to modal  */}
      {/* success modal  */}
      {/* add validations for mandatory fields  */}
      {/* add error popup */}
    </main>
  );
}
