import React from 'react';
import styled from 'styled-components';

interface IButton extends BaseElement {
    callback?: any;
}

const Button = (props: IButton) => {
    const { callback, className, children } = props;

    return (
        <B
            onClick={() => callback()}
            className={className}
        >{children}</B>
    )
}

const B = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
`;

export default Button;