import React from 'react';
import styled from 'styled-components';

interface IFlexContainer extends BaseElement {
    spaceBetween?: number;
    justifyContent?: string;
    alignItems?: string;
    flexWrap?: string;
    flexDirection?: "row" | "column";
}

const FlexContainer = (props: IFlexContainer) => {
    const {
        spaceBetween = 0,
        justifyContent = "start",
        alignItems = "start",
        flexWrap = "nowrap",
        flexDirection = "column",
        className,
        children
    } = props;

    return (
        <F
            spaceBetween={spaceBetween}
            justifyContent={justifyContent}
            alignItems={alignItems}
            flexWrap={flexWrap}
            flexDirection={flexDirection}
            className={className}
        >{children}</F>
    )
}

const F = styled.div<{ spaceBetween?: number, justifyContent?: string, alignItems?: string, flexWrap?: string, flexDirection?: string }>`
    display: flex;
    justify-content: ${p => p.justifyContent};
    align-items: ${p => p.alignItems};
    flex-wrap: ${p => p.flexWrap};
    flex-direction: ${p => p.flexDirection};

    > {
        &:not(:last-child) {
            margin-${p => p.flexDirection === 'row' ? 'right' : 'bottom'}: ${p => p.spaceBetween}px;
        }
    }
`;

export default FlexContainer;