import styled, {css} from 'styled-components'
import {ComponentProps} from "react";

type Props = ComponentProps<'input'> & {
  errorMessage?: string;
}

const ErrorMessage = styled.span`
  color: #FB0000;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: inline-block;
`

const InputForm = styled.input<{ hasError: boolean }>`
  border-radius: 5px;
  border: 1px solid #E2E2E2;
  background: #FFF;
  padding: 8px;
  color: #000;
  text-align: start;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  ${props =>
          props.hasError &&
          css`
            border-radius: 5px;
            border: 1px solid #F00;
            background: #FFF;
          `}
`
const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
`

export default function (props: Props) {
  return (
    <Wrapper>
      <InputForm {...props}  hasError={!!props.errorMessage} />
      {
        props.errorMessage ? <ErrorMessage>{props.errorMessage}</ErrorMessage> : <></>
      }
    </Wrapper>
  )
}
