import React, { useState } from 'react'
import { WrapperInputStyle } from './style'

const InputForm = (props) => {
  const [valueInput, setValueInput] = useState('')
  const { placehold = 'Nhập text', ...rests } = props
  return (
    <WrapperInputStyle placeholder={placehold} valueInput={valueInput} {...rests} />
  )
}

export default InputForm
