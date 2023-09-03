import AppContainer from "./components/AppContainer";
// import { AppProvider } from "./components/AppProvider";
import { getJobsList } from "./components/utils/fetchApiRSC";

export default async function Home() {
  const jobsList = await getJobsList();
  return (
    <main className="flex h-full w-full flex-col p-5 bg-cardBorder">
      <AppContainer jobsList={jobsList} />
    </main>
  );
}
