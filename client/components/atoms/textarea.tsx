import React from 'react';
import styled from 'styled-components';

export interface ITextArea extends BaseComponent {
  placeholder?: string,
  name?: string;
  setFocus?: any,
  value?: string | number,
  setValue?: any,
  rows?: number,
  cols?: number
}

const TextArea: React.FC<ITextArea> = (props) => {
  const { placeholder, name, rows, cols, setFocus, value, setValue, className } = props;

    const handleFocus = (val) => {
        if (setFocus) {
            setFocus(val);
        }
    }

    return (
        <TA
            rows={rows}
            cols={cols}
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

export const TA = styled.textarea`
  border: none;
  background: transparent;

  &:focus {
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

export default TextArea;