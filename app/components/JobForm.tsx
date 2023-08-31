"use client";

import React, { Dispatch, useMemo, useState } from "react";
import { saveJobDetails } from "./utils/fetchApiRSC";
import { Job } from "./utils/types/types";
import { useRouter } from "next/navigation";
import { LabeledInput, RangeInputs } from "./UI/LabeledInput";

function JobForm({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
}) {
  const [step, setStep] = useState("1");
  const [details, setDetails] = useState<Job>({
    id: 0,
    jobTitle: "",
    companyName: "",
    industryName: "",
    location: "",
    remoteType: "",
    experience: [],
    salary: [],
    totalEmployee: "",
    applyType: "",
  });
  const router = useRouter();

  const {
    id,
    jobTitle,
    companyName,
    industryName,
    location,
    remoteType,
    experience,
    salary,
    totalEmployee,
    applyType,
  } = details;

  const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    let { name, value } = e.target as HTMLInputElement;
    console.log(name, value);
    name == "Quick" ? (value = "Quick") : (value = "External");
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleStepChange = async () => {
    if (step === "1") {
      setStep("2");
    } else {
      setIsOpen(false);

      const jobData = {
        jobTitle: "",
        companyName: "",
        industryName: "",
        location: "",
        remoteType: "Full Remote",
        experience: "3 years",
        salary: "100,000 - 120,000",
        totalEmployee: "500",
        applyType: "quick",
      };
      const res = await saveJobDetails(jobData);
      router.refresh();
    }
  };

  function Step1() {
    const styles = {
      input:
        "flex w-full items-start gap-2.5 self-stretch border border-cardBorder px-3 py-2 rounded-[5px] border-solid bg-cardColor",
      label: "text-darkFont text-sm font-semibold leading-5 gap-2",
      titleText: "text-xl not-italic font-medium leading-7 text-darkFont",
      stepText:
        "text-darkFont text-right text-base not-italic font-medium leading-6",
    };

    const { input, label, stepText, titleText } = styles;

    const formFields = [
      {
        htmlFor: "job-title",
        label: "Job title",
        placeholder: "ex. UX UI Designer",
        name: "jobTitle",
        value: jobTitle,
        mandatory: true,
      },
      {
        htmlFor: "companyName",
        label: "Company name",
        placeholder: "ex. Google",
        name: "companyName",
        value: companyName,
        mandatory: true,
      },
      {
        htmlFor: "Industry",
        label: "Industry",
        placeholder: "ex. Information Technology",
        name: "industry",
        value: industryName,
        mandatory: true,
      },
    ];

    const additonalFormFields = [
      {
        htmlFor: "location",
        label: "Location",
        placeholder: "ex. Chennai",
        name: "location",
        value: location,
      },
      {
        htmlFor: "remoteType",
        label: "Remote Type",
        placeholder: "ex. In Office",
        name: "remoteType",
        value: remoteType,
      },
    ];

    return (
      <form className="space-y-6">
        <div className="flex justify-between text-darkFont">
          <p className={`${titleText}`}>Create a job</p>
          <p className={`${stepText}`}>Step 1</p>
        </div>

        {formFields.map((field) => (
          <LabeledInput
            labelStyle={label}
            inputStyle={input}
            field={field}
            onChange={handleChange}
          />
        ))}

        <div className="flex flex-row gap-6">
          {additonalFormFields.map((field) => (
            <div>
              <label htmlFor="location" className={`${label}`}>
                {field.label}
              </label>
              <input
                type="text"
                className={`${input}`}
                placeholder={field.placeholder}
                name={field.name}
                onChange={() => handleChange}
              />
            </div>
          ))}
        </div>
      </form>
    );
  }

  function Step2() {
    const styles = {
      input:
        "flex w-full items-start gap-2.5 self-stretch border border-cardBorder px-3 py-2 rounded-[5px] border-solid bg-cardColor",
      label: "text-darkFont text-sm  font-semibold leading-5 gap-2",
      radio: "w-5 h-5",
    };

    const applyTypes = [
      { label: "Quick Apply", name: "Quick" },
      { label: "External Apply", name: "External" },
    ];

    return (
      <form className="space-y-6">
        <div className="flex flex-row space-x-2 ">
          <div className="w-1/2 text-xl font-normal leading-7 text-darkFont">
            Create a job
          </div>
          <div className="w-1/2 flex flex-row-reverse">Step 2</div>
        </div>
        {[
          {
            label: "Experience",
            placeholders: [
              { Minimum: experience[0] },
              { Maximum: experience[1] },
            ],
            name: "experience",
            htmlFor: "experience",
          },
          {
            label: "Salary",
            placeholders: [{ Minimum: salary[0] }, { Maximum: salary[1] }],
            name: "salary",
            htmlFor: "salary",
          },
        ].map((field) => (
          <RangeInputs
            field={field}
            labelStyle={styles.label}
            inputStyle={styles.input}
            onChange={handleChange}
          />
        ))}

        <LabeledInput
          field={{
            htmlFor: "totalEmployee",
            placeholder: "ex: 100",
            name: "totalEmployee",
            label: "Total Employee",
            mandatory: false,
            value: totalEmployee,
          }}
          inputStyle={styles.input}
          labelStyle={styles.label}
          onChange={handleChange}
        />

        <div>
          <label htmlFor="" className={`${styles.label}`}>
            Apply Type
          </label>
          <div className="flex flex-row text-sm not-italic font-normal leading-5 space-x-2 py-2">
            {applyTypes.map((applyTypeEle, index) => (
              <div className="flex items-center" key={index}>
                <input
                  type="radio"
                  className={`${styles.radio}`}
                  placeholder={applyType.label}
                  name="applyType"
                  checked={applyType == "Quick"}
                  onChange={() => handleChange}
                />
                <p className="p-1 flex justify-center text-placeholderFont">
                  {applyTypeEle.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </form>
    );
  }

  const selectStep = (step: string) => {
    switch (step) {
      case "1":
        return <Step1 />;
      case "2":
        return <Step2 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 
             bg-white rounded-md p-8  drop-shadow-lg ${
               isOpen ? "visible" : "hidden"
             } `}
    >
      {/* overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className="bg-white p-6 rounded shadow-md max-w-lg w-full 
      sm:w-auto sm:max-w-sm md:max-w-md 
      lg:min-w-[513px]  relative z-10  h-[584px] flex flex-col space-y-24"
      >
        {selectStep(step)}

        <div className="flex flex-row-reverse">
          <button
            onClick={handleStepChange}
            className="bg-primaryColor px-4 py-2 text-whiteFont rounded-md"
          >
            {step === "1" ? "Next" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobForm;
