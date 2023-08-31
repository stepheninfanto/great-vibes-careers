import AppContainer from "./components/AppContainer";
// import { AppProvider } from "./components/AppProvider";
import { getJobsList } from "./components/utils/fetchApiRSC";

export default async function Home() {
  const jobsList = await getJobsList();
  return (
    <main className="flex min-h-screen flex-col p-5">
      <AppContainer jobsList={jobsList} />
      {/* state management for create */}
      {/* add edit and delete functionality  */}
      {/* success modal  */}
      {/* add validations for mandatory fields  */}
      {/* add error popup */}
    </main>
  );
}
