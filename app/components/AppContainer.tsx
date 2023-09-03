"use client";

import React, { useState } from "react";
import JobForm from "./JobForm";
import JobCard from "./JobCard";
import { Job } from "./utils/types/FormTypes";
import { CardButton } from "./UI/Button";
import { initalState } from "./UI/Constants";

function AppContainer({ jobsList }: Job[] | any) {
  const [isOpen, setIsOpen] = useState(false);

  const [details, setDetails] = useState<Job>(initalState);

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
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 pl-[85px] pr-[44.882px] pt-[30px] pb-[49px] gap-7 ">
        {jobsList.map((item: Job, i: Number) => (
          <div key={item.jobTitle + i} className="flex">
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
