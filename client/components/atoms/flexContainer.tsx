import React from 'react';
import styled from 'styled-components';

interface IFlexContainer extends BaseComponent {
    spaceBetween?: number;
    justifyContent?: string;
    alignItems?: string;
    flexWrap?: boolean;
    flexDirection?: "row" | "column";
}

const FlexContainer = (props: IFlexContainer) => {
    const {
        spaceBetween = 0,
        justifyContent = "center",
        alignItems = "center",
        flexWrap = false,
        flexDirection = "row",
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

const F = styled.div<{ spaceBetween?: number, justifyContent?: string, alignItems?: string, flexWrap?: boolean, flexDirection?: string }>`
    display: flex;
    justify-content: ${p => p.justifyContent};
    align-items: ${p => p.alignItems};
    flex-wrap: ${p => p.flexWrap ? 'wrap' : 'nowrap'};
    flex-direction: ${p => p.flexDirection};
    gap: ${p => p.spaceBetween}px;
`;

export default FlexContainer;