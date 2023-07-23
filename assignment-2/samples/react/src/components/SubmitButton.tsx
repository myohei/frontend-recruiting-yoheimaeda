import styled from 'styled-components'

const SubmitButton = styled.button`
  padding: 12px 38px;
  border-radius: 10px;
  background: #5DD669;
  color: #FFF;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  &:disabled {
    opacity: 0.4;
  }
`

export  default SubmitButton
