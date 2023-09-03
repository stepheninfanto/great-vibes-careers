import React, {
  ChangeEventHandler,
  Dispatch,
  useEffect,
  useState,
} from "react";
import { editJobDetails, saveJobDetails } from "./utils/fetchApiRSC";
import { Job } from "./utils/types/FormTypes";
import { useRouter } from "next/navigation";
import FormInput from "./UI/FormInput";
import { CardButton } from "./UI/Button";
import {
  additonalFormFieldsStep1,
  additonalFormFieldsStep2,
  formFieldsStep1,
  formFieldsStep2,
} from "./UI/Constants";

export const FormStyles = {
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

type FormFieldProps = {
  htmlFor: string;
  label: string;
  placeholder: string;
  name: keyof Job;
  mandatory: boolean;
  inputType: string;
  [key: string]: string | Number | Array<Number> | boolean;
};

interface StepProps {
  mode: string;
  formFields: Array<any>;
  additonalFormFields: Array<any>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleStepChange: ChangeEventHandler<HTMLInputElement>;
  details: Job;
}

interface Step1Props extends StepProps {
  errors: any;
}

interface Step2Props extends StepProps {
  applyType: string;
}

function Step1({
  mode,
  formFields,
  additonalFormFields,
  handleChange,
  handleStepChange,
  details,
  errors,
}: Step1Props) {
  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between text-darkFont">
          <p className={`${FormStyles.titleText}`}>{mode} a job</p>
          <p className={`${FormStyles.stepText}`}>Step 1</p>
        </div>

        {formFields.map((field: FormFieldProps) => (
          <FormInput
            key={field.htmlFor}
            field={field}
            inputValue={details[field.name]}
            invalidInput={errors[field.name]}
            onChange={handleChange}
          />
        ))}

        <div className={FormStyles.dualDiv}>
          {additonalFormFields
            .reduce((pairs, field, index, array) => {
              if (index % 2 === 0) {
                pairs.push([field, array[index + 1]]);
              }
              return pairs;
            }, [])
            .map(([field1, field2]: [FormFieldProps, FormFieldProps]) => (
              <div className={FormStyles.dualDiv} key={field1.name}>
                <FormInput
                  field={field1}
                  labelStyle={FormStyles.label}
                  inputStyle={FormStyles.input}
                  onChange={handleChange}
                  inputValue={details[field1.name]}
                />
                <FormInput
                  field={field2}
                  labelStyle={FormStyles.label}
                  inputStyle={FormStyles.input}
                  onChange={handleChange}
                  inputValue={details[field2.name]}
                />
              </div>
            ))}
        </div>
      </div>
      <div className={FormStyles.divBtn}>
        <CardButton onClick={handleStepChange} btnText="Next" />
      </div>
    </>
  );
}

function Step2({
  mode,
  formFields,
  additonalFormFields,
  handleChange,
  handleStepChange,
  applyType,
  details,
}: Step2Props) {
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-row space-x-2 ">
          <div className="w-1/2 text-xl font-normal leading-7 text-darkFont">
            {mode} a job
          </div>
          <div className="w-1/2 flex flex-row-reverse">Step 2</div>
        </div>
        {formFields
          .reduce((pairs, field, index, array) => {
            if (index % 2 === 0) {
              pairs.push([field, array[index + 1]]);
            }
            return pairs;
          }, [])
          .map(([field1, field2]: [FormFieldProps, FormFieldProps]) => (
            <div className="flex flex-row gap-6" key={field1.name}>
              <FormInput
                field={field1}
                labelStyle={FormStyles.label}
                inputStyle={FormStyles.input}
                onChange={handleChange}
                inputValue={details[field1.name]}
              />
              <FormInput
                field={field2}
                labelStyle={FormStyles.label}
                inputStyle={FormStyles.input}
                onChange={handleChange}
                inputValue={details[field2.name]}
              />
            </div>
          ))}

        <FormInput
          field={{
            htmlFor: "totalEmployee",
            placeholder: "ex: 100",
            name: "totalEmployee",
            label: "Total Employee",
            mandatory: false,
          }}
          inputStyle={FormStyles.input}
          labelStyle={FormStyles.label}
          onChange={handleChange}
          inputValue={details["totalEmployee"]}
        />

        <div>
          <label htmlFor="" className={`${FormStyles.label}`}>
            Apply Type
          </label>
          <div className="flex flex-row text-sm not-italic font-normal leading-5 space-x-2 py-2">
            {additonalFormFields.map((applyEle, index) => (
              <div className="flex items-center" key={index}>
                <input
                  type="radio"
                  className={`${FormStyles.radio}`}
                  placeholder={applyEle.label}
                  name="applyType"
                  value={applyEle.label} // Set the value to the label
                  checked={applyType === applyEle.label} // Check based on the selectedApplyType
                  onChange={handleChange}
                />
                <p className="p-1 flex justify-center text-placeholderFont">
                  {applyEle.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={FormStyles.divBtn}>
        <CardButton onClick={handleStepChange} btnText="Save" />
      </div>
    </>
  );
}

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
  const [errors, setErrors] = useState({
    jobTitle: false,
    companyName: false,
    industryName: false,
  });

  const router = useRouter();

  useEffect(() => {
    setMode(details.id === 0 ? "Create" : "Edit");
  }, [details.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedDetails: Job = { ...details };

    let rangeIndex = name.includes("max") ? 1 : name.includes("min") ? 0 : 2;

    if (rangeIndex !== 2) {
      const propertyName = name.split("-")[0];
      const rangeList = updatedDetails[propertyName] as Array<number>;
      rangeList[rangeIndex] = Number(value);
      updatedDetails[propertyName] = rangeList;
    } else {
      updatedDetails[name] = value;
    }
    console.log(updatedDetails);

    setDetails(updatedDetails);
  };

  const validateFields = () => {
    console.log("first");
    const pattern = /[a-zA-Z]/;
    const mandatoryFields: string[] = [
      "jobTitle",
      "companyName",
      "industryName",
    ];

    for (let i = 0; i < mandatoryFields.length; i++) {
      console.log("second");
      let field = mandatoryFields[i];
      let newErrors: any = { ...errors };
      if (!pattern.test(details[field] as any)) {
        newErrors[mandatoryFields[i]] = true;
        setErrors(newErrors);
        return false;
      } else {
        newErrors[mandatoryFields[i]] = false;
      }
      console.log(newErrors);
    }

    return true; // Return true if all fields are valid
  };

  const handleStepChange = async () => {
    if (step === "2") {
      setIsOpen(false);
      const { id } = details;
      id === 0
        ? await saveJobDetails(details)
        : await editJobDetails(id, details);
      router.refresh();
      return;
    }
    if (validateFields()) {
      setStep(String(Number(step) + 1));
    }
  };

  const totalEmployee = details.totalEmployee;
  const applyType = details.applyType;

  const selectStep = (step: string) => {
    switch (step) {
      case "1":
        return (
          <Step1
            mode={mode}
            formFields={formFieldsStep1}
            additonalFormFields={additonalFormFieldsStep1}
            handleChange={handleChange}
            handleStepChange={handleStepChange}
            details={details}
            errors={errors}
          />
        );
      case "2":
        return (
          <Step2
            mode={mode}
            formFields={formFieldsStep2}
            additonalFormFields={additonalFormFieldsStep2}
            handleChange={handleChange}
            handleStepChange={handleStepChange}
            details={details}
            applyType={applyType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form
      className={`fixed inset-0 flex items-center justify-center z-50 
      bg-white rounded-md p-8  drop-shadow-lg ${
        isOpen ? "visible" : "hidden"
      } `}
      // onSubmit={(e) => e.preventDefault()}
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
