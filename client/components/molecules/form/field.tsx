import React, { useState } from 'react';
import styled from 'styled-components';
import { COLOR } from '../../../theme/constants';
import FlexContainer from '../../atoms/flexContainer';
import Input, { IInput } from '../../atoms/input';

interface IField extends IInput {
    isReversed?: boolean;
}

const Field = (props: IField) => {
    const { isReversed = false, type, placeholder, setValue, value, className, children } = props;

    const [focused, setFocused] = useState(false);

    return (
        <F
            flexDirection="row"
            alignItems="center"
            className={className}
            focused={focused}
        >
            {!isReversed && children}
            <I setFocus={setFocused} value={value} setValue={setValue} type={type} placeholder={placeholder} />
            {isReversed && children}
        </F>
    )
}

const F = styled(FlexContainer)<{ focused: boolean }>`
    padding: 6px;
    border-bottom: 1px solid ${p => p.focused ? COLOR.BLACK : COLOR.GREY};
`;

const I = styled(Input)`
    font-size: 13px;
    color: ${COLOR.BLACK};
    margin: 0 6px;
`;

export default Field;