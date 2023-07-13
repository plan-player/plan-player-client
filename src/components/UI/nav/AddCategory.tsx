import React from 'react'
import { styled } from 'styled-components'

const WrapperInput = styled.input`
    width:22.125rem;
    height:4rem;
    border-radius:0.565rem;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:1.25rem;
    color: #C3C5CC;
    font-style: normal;
    font-weight: 400;
    &::placeholder {
        opacity: 0.4;
    }
`;

const AddCategory = () => {
  return (
    <WrapperInput placeholder='● Add new Category'>
        

    </WrapperInput>
  )
}

export default AddCategory