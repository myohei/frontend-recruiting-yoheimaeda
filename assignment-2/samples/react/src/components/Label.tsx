import styled from 'styled-components'

export type LabelParams = {
  text: string;
}

const Label = styled.label`
  color: #000;
  text-align: end;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: auto 0;
`

export default Label
