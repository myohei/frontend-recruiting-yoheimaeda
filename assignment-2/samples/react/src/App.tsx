import "./App.css";
import Label from "./components/Label";
import InputFormsWrapper from "./components/InputFormsWrapper";
import InputForm from "./components/InputForm";
import SubmitButton from "./components/SubmitButton";
import Container from "./components/Container";
import PrefectureSelect from "./components/PrefectureSelect";
import usePrefectures from "./hooks/usePrefectures";
import Form from "./components/Form";
import useForm, {Inputs} from "./hooks/useForm";
import {ChangeEvent, FormEvent} from "react";
import useSubmit from "./hooks/useSubmit";


function App() {
  const {valid, errors, setValue, handleSubmit} = useForm();
  const {data: prefectures, isLoading} = usePrefectures();
  const mutation = useSubmit()
  const onSubmit = (inputs: Inputs) => {
    mutation.mutate(inputs)
  }
  return <Container>
    <Form onSubmit={(e: FormEvent) => {
      handleSubmit(onSubmit)
      e.preventDefault()
    }}>
      <InputFormsWrapper>
        <Label htmlFor={`name`}>氏名</Label>
        <InputForm name={`name`}
                   placeholder={`(例)トレタ 太郎`}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setValue('name', e.target.value)}/>

        <Label key={'l-email'} htmlFor={`email`}>Eメール</Label>
        <InputForm name={`email`}
                   placeholder={`(例)yayaku@toreta.in`}
                   errorMessage={errors.email}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setValue('email', e.target.value)}/>

        <Label htmlFor={`zip`}>郵便番号</Label>
        <InputForm name={`zip`}
                   placeholder={`(例)000000`}
                   errorMessage={errors.zip}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setValue('zip', e.target.value)}/>

        <Label htmlFor={`prefecture`}>都道府県</Label>
        <PrefectureSelect name={`prefecture`}
                          placeholder={`選択してください`}
                          onChange={(e: ChangeEvent<HTMLSelectElement>) => setValue('prefecture', prefectures!!.find(p => p.id === e.target.value)!!.name)}>
          {isLoading ?
            ([]) :
            prefectures!!.map(prefecture =>
              <option key={prefecture.id} value={prefecture.id}>
                {prefecture.name}
              </option>)
          }
        </PrefectureSelect>
        <Label htmlFor={`address1`}>市区町村・番地</Label>
        <InputForm name={`address1`}
                   placeholder={`(例)品川区西五反田７丁目２２−１７`}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setValue('address1', e.target.value)}/>
        <Label htmlFor={`address2`}>建物名・号室</Label>
        <InputForm name={`address2`}
                   placeholder={`(例)TOCビル 8F`}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setValue('address2', e.target.value)}/>
      </InputFormsWrapper>
      <Container>
        <SubmitButton disabled={!valid} type='submit'>登録</SubmitButton>
      </Container>
    </Form>
  </Container>;
}

export default App;
