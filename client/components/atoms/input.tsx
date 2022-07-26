import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../theme/constants';

export interface IInput extends BaseComponent {
  placeholder?: string,
  name?: string;
  setFocus?: any,
  value?: string,
  setValue?: any,
  type?: string,
}

const TextInput: React.FC<IInput> = (props) => {
  const { placeholder, name, type = 'text', setFocus, value, setValue, className } = props;

    const handleFocus = (val) => {
        if (setFocus) {
            setFocus(val);
        }
    }

    return (
        <Input
            type={type}
            name={name}
            value={value}
            onChange={setValue}
            onFocus={() => handleFocus(true)}
            onBlur={() => handleFocus(false)}
            placeholder={placeholder}
            className={className}
        />
    );
}

export const Input = styled.input`
  border: none;
  background: transparent;
  &:focus {
    background: transparent;
    border: none;
    outline: none;
  }
  &::placeholder {
    opacity: 0.5;
  }
  &:-ms-input-placeholder {
    opacity: 0.5;
  }
  &::-ms-input-placeholder {
    opacity: 0.5;
  }
  &::-ms-clear {
    display: none;
  }
`;

export default TextInput;