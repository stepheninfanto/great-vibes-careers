import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import AppContainer from './components/AppContainer';
import { getJobsList } from './components/utils/fetchApiRSC';
import 'react-toastify/dist/ReactToastify.css';

export default async function Home() {
  const jobsList: any = [];
  // const jobsList = await getJobsList();
  return (
    <main className="flex h-full w-full flex-col p-5 bg-cardBorder">
      <ToastContainer />
      <AppContainer jobsList={jobsList} />
    </main>
  );
}
