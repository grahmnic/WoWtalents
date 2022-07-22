import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../theme/constants';

interface IAnchor extends BaseElement {
    width?: number;
    height?: number;
    backgroundColor?: string;
}

const Hr = (props: IAnchor) => {
    const { width, height = 1, backgroundColor, className, children } = props;

    return (
        <H
            height={height}
            width={width}
            backgroundColor={backgroundColor}
            className={className}
        />
    )
}

const H = styled.div<{ height: number, width: number, backgroundColor: string }>`
    height: ${p => p.height}px;
    width: ${p => p.width ? `${p.width}px` : `100%` };
    background: ${p => p.backgroundColor ? p.backgroundColor : COLOR.DARKGREY}
`;

export default Hr;