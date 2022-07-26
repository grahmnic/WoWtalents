import React from 'react';
import styled from 'styled-components';
import { COLOR, TYPOGRAPHY } from '../../theme/constants';

interface ITitle extends BaseComponent {

}

const Title = (props: ITitle) => {
    const { className, children } = props;

    return (
        <T
            className={className}
        >{children}</T>
    )
}

const T = styled.h1`
    color: ${COLOR.BLACK};
    ${TYPOGRAPHY.BOLD};
    font-size: 18px;
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
`;

export default Title;