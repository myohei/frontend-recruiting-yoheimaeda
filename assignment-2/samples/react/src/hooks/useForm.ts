import {useState} from "react";
import {UseMutationResult} from "react-query/types/react/types";

export type Inputs = {
  name: string;
  email: string;
  zip: string;
  prefecture: string;
  address1: string;
  address2?: string;
}
type Errors = {
  email?: string;
  zip?: string;
}
type ReturnType = {
  valid: boolean;
  errors: Errors;
  handleSubmit: (onSubmit:(inputs:Inputs)=>void) => void;
  setValue: (key: keyof Inputs, value: string) => void;
}
// FIXME: 別のやり方がありそう
const requiredFields: (keyof Inputs)[] = ["name", "email", "zip", "prefecture", "address1"]
const useForm = (): ReturnType => {
  const [valid, setValid] = useState(false)
  const [inputs, setInputs] = useState<Inputs>({
    name: '',
    email: '',
    zip: '',
    prefecture: '',
    address1: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const handleSubmit = (onSubmit:(inputs:Inputs)=>void) => {
    const errors = validate(inputs)
    if (Object.keys(errors).length) {
      setErrors(errors)
      return
    }
    setErrors({})
   onSubmit(inputs)
  }
  const setValue = (key: keyof Inputs, value: string) => {
    inputs[key] = value
    setInputs(inputs)
    setValid(requiredFields.every((k) => !!(inputs[k])))
  }
  return {
    valid,
    errors,
    handleSubmit,
    setValue,
  }
}

const validate = (inputs: Inputs): Errors => {
  let errors: Errors = {}
  const email = inputs.email
  if (!email.includes('@')) {
    errors.email = '正しいメールアドレスを入力してください'
  }
  const zip = inputs.zip
  if (!zip.match(/[0-9]{7}/)) {
    errors.zip = 'ハイフンを含めず半角数字で入力してください'
  }
  return errors
}

export default useForm
