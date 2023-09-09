import React, {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { editJobDetails, saveJobDetails } from './utils/fetchApiRSC';
import { Job } from './utils/types/FormTypes';
import FormInput from './UI/FormInput';
import { CardButton } from './UI/Button';
import {
  additonalFormFieldsStep1,
  additonalFormFieldsStep2,
  formFieldsStep1,
  formFieldsStep2,
  initalState,
} from './UI/Constants';

export const FormStyles = {
  input:
    'flex w-full items-start gap-2.5 self-stretch border border-cardBorder px-3 py-2 rounded-[5px] border-solid bg-cardColor',
  label: 'text-darkFont text-sm font-semibold leading-5 gap-2',
  titleText: 'text-xl not-italic font-medium leading-7 text-darkFont',
  stepText:
    'text-darkFont text-right text-base not-italic font-medium leading-6',
  dualDiv: 'flex flex-row gap-6',
  radio: 'w-5 h-5',
  divBtn: 'flex flex-row-reverse',
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
          <p className={`${FormStyles.titleText}`}>
            {mode}
            {' '}
            a job
          </p>
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
            {mode}
            {' '}
            a job
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
            htmlFor: 'totalEmployee',
            placeholder: 'ex: 100',
            name: 'totalEmployee',
            label: 'Total Employee',
            mandatory: false,
          }}
          FormStyles={FormStyles}
          onChange={handleChange}
          inputValue={details.totalEmployee}
          invalidInput={errors.totalEmployee}
        />

        <div>
          <p className={`${FormStyles.label}`}>
            Apply Type
            {errors.applyType && (
              <span className="text-errorFont"> Enter valid Apply Type</span>
            )}
          </p>

          <div className="flex flex-row text-sm not-italic font-normal leading-5 space-x-2 py-2">
            {additonalFormFields.map((applyEle) => (
              <div
                className="flex flex-row-reverse items-center"
                key={applyEle.label}
              >
                <label
                  className="p-1 flex justify-center text-placeholderFont"
                  htmlFor="applyType"
                >
                  {applyEle.label}
                </label>
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
  const [step, setStep] = useState('2');
  const [mode, setMode] = useState('Edit');
  const [errors, setErrors] = useState({});
  const [propertyName, setPropertyName] = useState('');

  const router = useRouter();
  useEffect(() => {
    setMode(details.id === 0 ? 'Create' : 'Edit');
  }, [details.id]);

  const checkValidFields = (field: string) => {
    const newErrors: any = {};
    const pattern = /^[a-zA-Z\s-]+$/g;
    const totalEmployeePattern = /^[0-9\s-]+$/g;
    let isValid: boolean = true;
    const arr: Number[] = details[field] as number[];
    switch (step) {
      case '2':
        switch (field) {
          case 'experience':
            if (
              Number(arr[0]) > Number(arr[1])
              || Number(arr[0]) > 100
              || Number(arr[1]) > 100
            ) {
              newErrors[field] = true;
              isValid = false;
            } else {
              newErrors[field] = false;
            }
            break;
          case 'salary':
            if (!arr || arr?.length === 0) {
              arr.length = 2;
              arr[0] = 0;
            }
            if (arr[0] >= arr[1]) {
              newErrors[field] = true;
              isValid = false;
            } else {
              newErrors[field] = false;
            }
            break;
          case 'totalEmployee':
            if (!totalEmployeePattern.test(details[field])) {
              newErrors[field] = true;
              isValid = false;
            } else {
              newErrors[field] = false;
            }
            break;
          default:
            if (!pattern.test(details[field] as any)) {
              newErrors[field] = true;
              isValid = false;
            } else {
              newErrors[field] = false;
            }
        }
        break;
      default:
        if (!pattern.test(details[field] as any)) {
          newErrors[field] = true;
          isValid = false;
        } else {
          newErrors[field] = false;
        }
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

    return isValid;
  };

  useEffect(() => {
    if (propertyName !== '') {
      checkValidFields(propertyName);
    }
  }, [details]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let propsName = name;
    const updatedDetails: Job = { ...details };
    let rangeIndex = -1;

    if (name.includes('max')) {
      rangeIndex = 1;
    } else if (name.includes('min')) {
      rangeIndex = 0;
    } else {
      rangeIndex = 2;
    }

    if (rangeIndex < 2) {
      [propsName] = name.split('-');
      const rangeList = updatedDetails[propsName] as Array<number>;
      rangeList[rangeIndex] = Number(value);
      updatedDetails[propsName] = rangeList;
    } else {
      updatedDetails[propsName] = value;
    }
    setPropertyName(propsName);
    setDetails(updatedDetails);
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
    setDetails(initalState);
  };

  const validateFields = (fieldList: Array<string>) => {
    const result = fieldList
      .map((ele) => checkValidFields(ele))
      .filter((field) => field !== true);
    return result.length === 0;
  };

  const handleStepChange = async () => {
    const mandatoryFields: string[] = [
      'jobTitle',
      'companyName',
      'industryName',
    ];

    const step2Fields: string[] = [
      'experience',
      'salary',
      'totalEmployee',
      'applyType',
    ];

    const fieldList = step === '1' ? mandatoryFields : step2Fields;

    if (!validateFields(fieldList)) {
      return;
    }
    if (step === '2') {
      setIsOpen(false);
      const { id } = details;
      const result = await (id === 0
        ? saveJobDetails(details)
        : editJobDetails(id, details));
      setDetails(initalState);
      router.refresh();
      if (result) {
        toast('Changes saved successfully');
      }
      return;
    }
    setStep(String(Number(step) + 1));
  };

  const { applyType } = details;

  const selectStep = () => {
    switch (step) {
      case '1':
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
      case '2':
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
        isOpen ? 'visible' : 'hidden'
      } `}
      onSubmit={(e) => e.preventDefault()}
    >
      {/* overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleOverlayClick}
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
