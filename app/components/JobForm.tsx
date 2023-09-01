"use client";

import React, { Dispatch, useEffect, useState } from "react";
import { editJobDetails, saveJobDetails } from "./utils/fetchApiRSC";
import { Job } from "./utils/types/types";
import { useRouter } from "next/navigation";
import LabeledInput from "./UI/LabeledInputs";
import { CardButton } from "./UI/Button";

function JobForm({
  isOpen,
  setIsOpen,
  details,
  setDetails,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
  details: Job;
  setDetails: Dispatch<any>;
}) {
  const [step, setStep] = useState("1");
  const [mode, setMode] = useState("Edit");

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

  useEffect(() => {
    setMode(id === 0 ? "Create" : "Edit");
  }, []);

  const handleChange = ({ name, value }: any) => {
    // Uncomment this line if you want to prevent the default behavior
    // e.preventDefault();

    // let { name, value } = e.target as HTMLInputElement;

    console.log(name, value);

    switch (name) {
      case "Quick":
        value = "Quick";
        break;
      case "External":
        value = "External";
        break;
      default:
        // Handle other cases if needed
        break;
    }

    // setDetails((prevDetails: any) => {
    //   return {
    //     ...prevDetails,
    //     [name]: value,
    //   };
    // });
  };

  const handleStepChange = async () => {
    if (step === "1") {
      setStep("2");
    } else {
      setIsOpen(false);
      id === 0
        ? await saveJobDetails(details)
        : await editJobDetails(id, details);
      router.refresh();
    }
  };

  const FormStyles = {
    input:
      "flex w-full items-start gap-2.5 self-stretch border border-cardBorder px-3 py-2 rounded-[5px] border-solid bg-cardColor",
    label: "text-darkFont text-sm font-semibold leading-5 gap-2",
    titleText: "text-xl not-italic font-medium leading-7 text-darkFont",
    stepText:
      "text-darkFont text-right text-base not-italic font-medium leading-6",
    dualDiv: "flex flex-row gap-6",
    radio: "w-5 h-5",
    divBtn: "flex flex-row-reverse",
  };

  const { input, label, stepText, titleText, dualDiv, radio, divBtn } =
    FormStyles;

  function Step1() {
    const formFields = [
      {
        htmlFor: "jobtitle",
        label: "Job title",
        placeholder: "ex. UX UI Designer",
        name: "jobTitle",
        value: jobTitle,
        mandatory: true,
        inputType: "text",
      },
      {
        htmlFor: "companyName",
        label: "Company name",
        placeholder: "ex. Google",
        name: "companyName",
        value: companyName,
        mandatory: true,
        inputType: "text",
      },
      {
        htmlFor: "Industry",
        label: "Industry",
        placeholder: "ex. Information Technology",
        name: "industry",
        value: industryName,
        mandatory: true,
        inputType: "text",
      },
    ];

    const additonalFormFields = [
      {
        htmlFor: "location",
        label: "Location",
        placeholder: "ex. Chennai",
        name: "location",
        value: location,
        labelInvisible: false,
        inputType: "text",
      },
      {
        htmlFor: "remoteType",
        label: "Remote Type",
        placeholder: "ex. In Office",
        name: "remoteType",
        value: remoteType,
        labelInvisible: false,
        inputType: "text",
      },
    ];

    return (
      <>
        <div className="space-y-6">
          <div className="flex justify-between text-darkFont">
            <p className={`${titleText}`}>{mode} a job</p>
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

          <div className={dualDiv}>
            {additonalFormFields
              .reduce((pairs: any, field, index, array) => {
                if (index % 2 === 0) {
                  pairs.push([field, array[index + 1]]);
                }
                return pairs;
              }, [])
              .map(([field1, field2]: any) => (
                <div className={dualDiv} key={field1.name + field2.name}>
                  <LabeledInput
                    field={field1}
                    labelStyle={label}
                    inputStyle={input}
                    onChange={handleChange}
                  />
                  <LabeledInput
                    field={field2}
                    labelStyle={label}
                    inputStyle={input}
                    onChange={handleChange}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className={divBtn}>
          <CardButton onClick={handleStepChange} btnText="Next" />
        </div>
      </>
    );
  }

  function Step2() {
    const applyTypes = [
      { label: "Quick Apply", name: "Quick" },
      { label: "External Apply", name: "External" },
    ];

    const FormFields = [
      {
        label: "Experience",
        name: "experience-min",
        htmlFor: "experience",
        labelInVisible: false,
        inputType: "number",
        placeholder: "0",
      },
      {
        label: "Experience",
        name: "experience-max",
        htmlFor: "experience",
        labelInVisible: true,
        inputType: "number",
        placeholder: "1",
      },
      {
        label: "Salary",
        name: "salary-min",
        htmlFor: "salary",
        labelInVisible: false,
        inputType: "number",
        placeholder: "0",
      },
      {
        label: "Salary",
        name: "salary-max",
        htmlFor: "salary",
        labelInVisible: true,
        inputType: "number",
        placeholder: "100000",
      },
    ];

    return (
      <>
        <div className="space-y-6">
          <div className="flex flex-row space-x-2 ">
            <div className="w-1/2 text-xl font-normal leading-7 text-darkFont">
              {mode} a job
            </div>
            <div className="w-1/2 flex flex-row-reverse">Step 2</div>
          </div>
          {FormFields.reduce((pairs: any, field, index, array) => {
            if (index % 2 === 0) {
              pairs.push([field, array[index + 1]]);
            }
            return pairs;
          }, []).map(([field1, field2]: any) => (
            <div
              className="flex flex-row gap-6"
              key={field1.name + field2.name}
            >
              <LabeledInput
                field={field1}
                labelStyle={label}
                inputStyle={input}
                onChange={handleChange}
              />
              <LabeledInput
                field={field2}
                labelStyle={label}
                inputStyle={input}
                onChange={handleChange}
              />
            </div>
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
            inputStyle={input}
            labelStyle={label}
            onChange={handleChange}
          />

          <div>
            <label htmlFor="" className={`${label}`}>
              Apply Type
            </label>
            <div className="flex flex-row text-sm not-italic font-normal leading-5 space-x-2 py-2">
              {applyTypes.map((applyTypeEle, index) => (
                <div className="flex items-center" key={index}>
                  <input
                    type="radio"
                    className={`${radio}`}
                    placeholder={applyType.label}
                    name="applyType"
                    checked={applyType == "Quick"}
                    onChange={handleChange}
                  />
                  <p className="p-1 flex justify-center text-placeholderFont">
                    {applyTypeEle.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={divBtn}>
          <CardButton onClick={handleStepChange} btnText="Save" />
        </div>
      </>
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
    <form
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
      </div>
    </form>
  );
}

export default JobForm;
