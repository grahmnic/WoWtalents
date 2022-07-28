import React from 'react';
import styled from 'styled-components';

interface IButton extends BaseComponent {
    callback?: any;
}

const Button = (props: IButton) => {
    const { callback, disabled, className, children } = props;

    return (
        <B
            disabled={disabled}
            onClick={() => callback()}
            className={className}
        >{children}</B>
    )
}

const B = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    background: none;
    padding: 0;
    text-align: left;
`;

export default Button;