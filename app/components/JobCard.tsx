"use client";
import React, { Dispatch } from "react";
import Image from "next/image";
import {
  deleteJobDetails,
  editJobDetails,
  getJobsList,
} from "./utils/fetchApiRSC";
import { Job } from "./utils/types/types";
import { CardButton, VariantType } from "./UI/Button";
import { useRouter } from "next/navigation";

function JobCard({
  jobData,
  setIsOpen,
  setDetails,
}: {
  jobData: Job;
  setIsOpen: Dispatch<boolean>;
  setDetails: Dispatch<Job>;
}) {
  const CardStyles = {
    divWrapper: "flex flex-col items-start gap-2 self-stretch",
    textWrapper: "text-[#212427] text-base not-italic font-normal leading-6",
  };

  const { divWrapper, textWrapper } = CardStyles;
  const router = useRouter();

  const {
    id,
    jobTitle,
    companyName,
    industryName,
    experience,
    salary,
    remoteType,
    totalEmployee,
    location,
    applyType,
  } = jobData;

  const deleteJob = async (id: Number) => {
    const response = await deleteJobDetails(id);
    router.refresh();
  };

  const editJob = async (id: any) => {
    setIsOpen(true);
    setDetails(jobData);
  };

  const onApply = (e: any) => {};

  let btnText = "Apply Now";
  let variantType: VariantType = VariantType.Primary;

  if (applyType !== "Quick") {
    btnText = "External Apply";
    variantType = VariantType.Secondary;
  }

  return (
    <div
      className="flex items-start gap-2.5 self-stretch px-6 py-4 bg-cardColor w-[728px] 
        border rounded-[10px] border-solid  border-cardBorder"
    >
      {/* logo section  */}
      <section className="h-12 w-12 flex flex-col">
        <Image
          src="/netflix.svg"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </section>
      <div className="flex flex-col space-y-6">
        {/* about group */}
        <div className="items-start inline-flex flex-col relative">
          <div className="text-black text-2xl not-italic font-normal leading-8">
            {jobTitle || "UX UI Designer"}
          </div>
          <p className="text-black text-base not-italic font-normal leading-6">
            {`${companyName} - ${industryName}` ||
              "Great Vibes - Information Technology"}
          </p>
          <div className=" text-[#646464] text-base not-italic font-normal leading-6">
            {location || "Chennai, Tamilnadu, India"}
            {`(${remoteType})`}
          </div>
        </div>
        {/* details group */}
        <div className="items-start flex flex-col gap-2 relative">
          {[
            {
              textContent: "Part-Time (9.00 am - 5.00 pm IST)",
            },
            {
              textContent:
                "Experience (" +
                `${experience[0]} - ${experience[1]}` +
                ") years",
            },
            {
              textContent:
                "INR (₹) (" + `${salary[0]} - ${salary[1]}` + ")/ Month",
            },
            {
              textContent: `${totalEmployee}` + "employees",
            },
          ].map(({ textContent }) => (
            <div className={divWrapper}>
              <p className={textWrapper}>{textContent}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-row space-x-4">
          <CardButton
            variant={variantType}
            btnText={btnText}
            onClick={onApply}
          />
        </div>
      </div>
      <div className="ml-auto flex space-x-2">
        <button
          onClick={() => editJob(id)}
          className="hover:bg-cardBorder p-1 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>

        <button
          onClick={() => deleteJob(id)}
          className="hover:bg-cardBorder p-1 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default JobCard;
