import React from 'react';
import styled from 'styled-components';
import { COLOR, TYPOGRAPHY } from '../../theme/constants';

interface ISubtitle extends BaseElement {

}

const Subtitle = (props: ISubtitle) => {
    const { className, children } = props;

    return (
        <S
            className={className}
        >{children}</S>
    )
}

const S = styled.span`
    color: ${COLOR.GREY};
    ${TYPOGRAPHY.LIGHT};
    font-size: 12px;
`;

export default Subtitle;