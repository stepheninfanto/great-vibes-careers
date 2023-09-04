import React, {
  ChangeEventHandler,
  Dispatch,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { editJobDetails, saveJobDetails } from "./utils/fetchApiRSC";
import { Job } from "./utils/types/FormTypes";
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

export type FormFieldProps = {
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
  errors: any;
}

interface Step1Props extends StepProps {}

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
            FormStyles={FormStyles}
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
                  onChange={handleChange}
                  inputValue={details[field1.name]}
                  invalidInput={errors[field1.name]}
                  FormStyles={FormStyles}
                />
                <FormInput
                  field={field2}
                  FormStyles={FormStyles}
                  onChange={handleChange}
                  invalidInput={errors[field2.name]}
                  inputValue={details[field2.name]}
                />
              </div>
            ))}
        </div>
      </div>
      <div className={FormStyles.divBtn}>
        <CardButton
          onClick={handleStepChange}
          btnText="Next"
          variant="primary"
        />
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
  errors,
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
                FormStyles={FormStyles}
                onChange={handleChange}
                invalidInput={errors[field1.htmlFor]}
                inputValue={(details[field1.htmlFor] as Number[])[0]}
              />
              <FormInput
                field={field2}
                FormStyles={FormStyles}
                onChange={handleChange}
                invalidInput={errors[field2.htmlFor]}
                inputValue={(details[field2.htmlFor] as Number[])[1]}
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
          FormStyles={FormStyles}
          onChange={handleChange}
          inputValue={details.totalEmployee}
          invalidInput={errors.totalEmployee}
        />

        <div>
          <p className={`${FormStyles.label}`}>Apply Type</p>
          <div className="flex flex-row text-sm not-italic font-normal leading-5 space-x-2 py-2">
            {additonalFormFields.map((applyEle) => (
              <div className="flex items-center" key={applyEle.label}>
                <input
                  type="radio"
                  className={`${FormStyles.radio}`}
                  placeholder={applyEle.label}
                  name="applyType"
                  id={applyEle.label}
                  value={applyEle.label}
                  checked={applyType === applyEle.label}
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
        <CardButton
          onClick={handleStepChange}
          btnText="Save"
          variant="primary"
        />
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
  const [errors, setErrors] = useState({});

  const router = useRouter();
  useEffect(() => {
    setMode(details.id === 0 ? "Create" : "Edit");
  }, [details.id]);

  const checkValidFields = (field: string) => {
    const newErrors: any = {};
    const pattern = /[a-zA-Z]/;
    let isValid: boolean = true;

    if (step === "2" && (field === "experience" || field === "salary")) {
      const arr: Number[] = details[field] as Number[];
      if (!arr || arr?.length === 0) {
        arr.length = 2;
        arr[0] = 0;
      }
      if (arr[0] > arr[1]) {
        newErrors[field] = true;
        isValid = false;
      } else {
        newErrors[field] = false;
      }
    } else if (!pattern.test(details[field] as any)) {
      newErrors[field] = true;
      isValid = false;
    } else {
      newErrors[field] = false;
    }

    setErrors({ ...errors, ...newErrors });

    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let propertyName = name;
    const updatedDetails: Job = { ...details };
    let rangeIndex = -1;

    if (name.includes("max")) {
      rangeIndex = 1;
    } else if (name.includes("min")) {
      rangeIndex = 0;
    } else {
      rangeIndex = 2;
    }

    if (rangeIndex < 2) {
      [propertyName] = name.split("-");
      const rangeList = updatedDetails[propertyName] as Array<number>;
      rangeList[rangeIndex] = Number(value);
      updatedDetails[propertyName] = rangeList;
    } else {
      updatedDetails[propertyName] = value;
    }
    setDetails(updatedDetails);
    checkValidFields(propertyName);
  };

  const validateFields = () => {
    const mandatoryFields: string[] = [
      "jobTitle",
      "companyName",
      "industryName",
    ];

    const result = mandatoryFields
      .map((ele) => checkValidFields(ele))
      .filter((field) => field !== true);

    return result.length === 0;
  };

  const handleStepChange = async () => {
    if (!validateFields()) {
      return;
    }
    if (step === "2") {
      setIsOpen(false);
      const { id } = details;
      await (id === 0 ? saveJobDetails(details) : editJobDetails(id, details));
      toast("Changes saved successfully");
      router.refresh();
      return;
    }
    setStep(String(Number(step) + 1));
  };

  const { applyType } = details;

  const selectStep = () => {
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
            errors={errors}
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
      onSubmit={(e) => e.preventDefault()}
    >
      {/* overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsOpen(false);
          }
        }}
        role="menu"
        tabIndex={0}
        aria-label="Close"
      />

      <div
        className="bg-white p-6 rounded shadow-md max-w-lg w-full
      sm:w-auto sm:max-w-sm md:max-w-md
      lg:min-w-[513px]  relative z-10  h-[584px] flex flex-col space-y-24"
      >
        {selectStep()}
      </div>
    </form>
  );
}

export default JobForm;
