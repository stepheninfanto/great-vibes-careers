'use client';

import React, { Dispatch } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteJobDetails } from './utils/fetchApiRSC';
import { Job } from './utils/types/FormTypes';
import { CardButton, Variant } from './UI/Button';

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
    divWrapper: 'flex flex-col items-start gap-2 self-stretch',
    textWrapper: 'text-[#212427] text-base not-italic font-normal leading-6',
    cardContainer:
      'flex items-start gap-2.5 self-stretch px-6 py-4 bg-cardColor w-[728px] border rounded-[10px] border-solid  border-cardBorder',
    cardLogo: 'h-12 w-12 flex flex-col',
  };

  const {
    divWrapper, textWrapper, cardContainer, cardLogo,
  } = CardStyles;
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

  const deleteJob = async () => {
    await deleteJobDetails(id);
    router.refresh();
    toast('Job post deleted successfully');
  };

  const editJob = async () => {
    setIsOpen(true);
    setDetails(jobData);
  };

  const onApply = (e: MouseEvent) => {};

  let btnText = 'Apply Now';
  let variantType: Variant = 'primary';

  if (applyType !== 'Quick Apply') {
    btnText = 'External Apply';
    variantType = 'secondary';
  }

  return (
    <div className={cardContainer} key={id}>
      {/* logo section  */}
      <section className={cardLogo}>
        <Image
          src="/netflix.svg"
          width={500}
          height={500}
          alt="Picture of the logo"
        />
      </section>
      <div className="flex flex-col space-y-6">
        {/* about group */}
        <div className="items-start inline-flex flex-col relative">
          <div className="text-black text-2xl not-italic font-normal leading-8">
            {jobTitle}
          </div>
          <p className="text-black text-base not-italic font-normal leading-6">
            {`${companyName} - ${industryName}`}
          </p>
          <div className=" text-placeholderFont text-base not-italic font-normal leading-6">
            {location}
            {` (${remoteType})`}
          </div>
        </div>
        {/* details group */}
        <div className="items-start flex flex-col gap-2 relative">
          {[
            {
              textContent: 'Part-Time (9.00 am - 5.00 pm IST)',
            },
            {
              textContent:
                'Experience ('
                + `${experience[0]} - ${experience[1]}`
                + ') years',
            },
            {
              textContent:
                'INR (₹) '
                + `${salary[0]?.toLocaleString()} - ${salary[1]?.toLocaleString()}`
                + '/ Month',
            },
            {
              textContent: `${totalEmployee} employees`,
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
        {[
          {
            onClickHandler: editJob,
            imageUrl: '/edit.svg',
            altText: 'Edit',
          },
          {
            onClickHandler: deleteJob,
            imageUrl: '/delete.svg',
            altText: 'Delete',
          },
        ].map((item) => (
          <button
            key={item.altText}
            type="button"
            tabIndex={0}
            onClick={() => item.onClickHandler()}
            className="hover:bg-cardBorder p-1 rounded"
          >
            <div className="w-6 h-6">
              <Image
                src={item.imageUrl}
                width={500}
                height={500}
                alt={item.altText}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default JobCard;
