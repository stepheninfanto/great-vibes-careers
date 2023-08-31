"use client";

import React, { useState } from "react";
import JobForm from "./JobForm";
import JobCard from "./JobCard";
import { Job } from "./utils/types/types";

function AppContainer({ jobsList }: Job[] | any) {
  // fetch the data from api service
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative min-h-screen">
      <button
        onClick={handleClick}
        className="px-2 py-4 bg-[#1597E4] text-white content-center items-center rounded"
      >
        Create job
      </button>

      {isOpen && <JobForm isOpen={isOpen} setIsOpen={setIsOpen} />}

      {/* canvas */}
      {/* <div className="flex flex-wrap border gap-2 justify-start pl-[85px] pr-[44.882px]  w-screen"> */}
      <div className="grid grid-cols-2 pl-[85px] pr-[44.882px] pt-[30px] pb-[49px] gap-7 ">
        {/* <div className="flex  flex-wrap border justify-start w-screen pr-[44.882px] pt-[30px] pb-[49px]"> */}
        {/* <div className="flex justify-end items-start gap-[83.118px] pl-[85px] pr-[44.882px] pt-[30px] pb-[49px] w-screen "> */}
        {jobsList.map((item: any) => (
          <div key={item.id} className="flex">
            <JobCard jobData={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppContainer;
