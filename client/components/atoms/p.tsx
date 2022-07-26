import React from 'react';
import styled from 'styled-components';
import { COLOR, TYPOGRAPHY } from '../../theme/constants';

interface IParagraph extends BaseComponent {

}

const P = (props: IParagraph) => {
    const { className, children } = props;

    return (
        <Paragraph
            className={className}
        >{children}</Paragraph>
    )
}

const Paragraph = styled.p`
    color: ${COLOR.BLACK};
    font-size: 12px;
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
`;

export default P;