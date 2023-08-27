import React, { Dispatch, useState } from "react";

function CreateJobForm({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>;
}) {
  const [step, setStep] = useState("1");

  const handleChange = (e: any) => {};

  const handleStepChange = () => {
    console.log(step);
    if (step === "1") {
      setStep("2");
    } else {
      setIsOpen(false);
      //   saveData(jobData);
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
    return (
      <form className="space-y-6">
        <div className="flex justify-between text-darkFont">
          <p className={`${titleText}`}>Create a job</p>
          <p className={`${stepText}`}>Step 1</p>
        </div>

        {[
          {
            htmlFor: "job-title",
            label: "Job title",
            placeholder: "ex. UX UI Designer",
          },
          {
            htmlFor: "companyName",
            label: "Company name",
            placeholder: "ex. Google",
          },
          {
            htmlFor: "Industry",
            label: "Industry",
            placeholder: "ex. Information Technology",
          },
        ].map((field) => (
          <div className="" key={field.htmlFor}>
            <label htmlFor={field.htmlFor} className={label}>
              {field.label}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={input}
              placeholder={field.placeholder}
            />
          </div>
        ))}

        <div className="flex flex-row gap-6">
          <div>
            <label htmlFor="location" className={`${label}`}>
              Location
            </label>
            <input
              type="text"
              className={`${input}`}
              placeholder="ex. Chennai"
            />
          </div>

          <div>
            <label htmlFor="Remote-Type" className={`${label}`}>
              Remote Type
            </label>
            <input
              type="text"
              className={`${input}`}
              placeholder="ex. In-office"
            />
          </div>
        </div>
      </form>
    );
  }

  function Step2() {
    const styles = {
      input:
        "flex w-full items-start gap-2.5 self-stretch border border-cardBorder px-3 py-2 rounded-[5px] border-solid bg-cardColor",
      label: "text-darkFont text-sm  font-semibold leading-5 gap-2",
      inputGroup: "",
      radio: "w-5 h-5",
    };

    const applyTypes = [{ label: "Quick Apply" }, { label: "External Apply" }];

    return (
      <form className="space-y-6">
        <div className="flex flex-row space-x-2 ">
          <div className="w-1/2 text-xl font-normal leading-7 text-darkFont">
            Create a job
          </div>
          <div className="w-1/2 flex flex-row-reverse ">Step 2</div>
        </div>
        {[
          { label: "Experience", placeholders: ["Minimum", "Maximum"] },
          { label: "Salary", placeholders: ["Minimum", "Maximum"] },
        ].map((field, index) => (
          <div className="" key={index}>
            <label htmlFor="" className={`${styles.label}`}>
              {field.label}
            </label>
            <div className="flex flex-row gap-6">
              {field.placeholders.map((placeholder, idx) => (
                <input
                  key={idx}
                  type="text"
                  className={`${styles.input}`}
                  placeholder={placeholder}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="">
          <label htmlFor="job-title" className={`${styles.label}`}>
            Total employee
          </label>
          <input
            type="text"
            className={`${styles.input}`}
            placeholder="ex. 100"
          />
        </div>

        <div className="">
          <label htmlFor="" className={`${styles.label}`}>
            Apply Type
          </label>
          <div className="flex flex-row text-sm not-italic font-normal leading-5 space-x-2 py-2">
            {applyTypes.map((applyType, index) => (
              <div className="flex items-center" key={index}>
                <input
                  type="radio"
                  className={`${styles.radio}`}
                  placeholder={applyType.label}
                />
                <p className="p-1 flex justify-center text-placeholderFont">
                  {applyType.label}
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
        {/* <!-- Modal content goes here --> */}
        {selectStep(step)}
        {/* btn div */}
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

export default CreateJobForm;
