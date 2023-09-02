"use client";

import React, { useState } from "react";
import JobForm from "./JobForm";
import JobCard from "./JobCard";
import { Job } from "./utils/types/FormTypes";
import { CardButton } from "./UI/Button";

function AppContainer({ jobsList }: Job[] | any) {
  const [isOpen, setIsOpen] = useState(false);
  const initalState = {
    id: 0,
    jobTitle: "",
    companyName: "",
    industryName: "",
    location: "",
    remoteType: "",
    experience: [0, 1],
    salary: [0, 1],
    totalEmployee: "",
    applyType: "",
  };
  const [details, setDetails] = useState<Job>({
    id: 0,
    jobTitle: "",
    companyName: "",
    industryName: "",
    location: "",
    remoteType: "",
    experience: [0, 1],
    salary: [0, 1],
    totalEmployee: "",
    applyType: "",
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
    setDetails(initalState);
  };
  return (
    <div className="relative min-h-screen">
      <CardButton onClick={handleClick} btnText="Create Job" />

      {isOpen && (
        <JobForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          details={details}
          setDetails={setDetails}
        />
      )}

      {/* canvas */}
      {/* <div className="flex flex-wrap border gap-2 justify-start pl-[85px] pr-[44.882px]  w-screen"> */}
      {/* <div className="flex  flex-wrap border justify-start w-screen pr-[44.882px] pt-[30px] pb-[49px]"> */}
      {/* <div className="flex justify-end items-start gap-[83.118px] pl-[85px] pr-[44.882px] pt-[30px] pb-[49px] w-screen "> */}
      <div className="grid grid-cols-2 pl-[85px] pr-[44.882px] pt-[30px] pb-[49px] gap-7 ">
        {jobsList.map((item: any) => (
          <div key={item.id} className="flex">
            <JobCard
              jobData={item}
              setIsOpen={setIsOpen}
              setDetails={setDetails}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppContainer;
