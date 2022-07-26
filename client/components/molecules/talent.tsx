import React from 'react';
import styled from 'styled-components';
import Img from '../atoms/img';
import TalentTooltip from './talentTooltip';
import PopperTooltip from './tooltip/popperTooltip';

interface ITalent extends Talent, BaseComponent {
    thumbnailUrl: string;
}

const Talent = (props: ITalent) => {
    const { thumbnailUrl} = props;

    return (
        <PopperTooltip target={<TalentWrapper {...props} src={thumbnailUrl} />} skid={-8} placement={'right-start'} showArrow={false}>
            <TalentTooltip {...props} />
        </PopperTooltip>
    )
}

export default Talent;

/*-----------------STYLES-----------------*/
export const TalentWrapper = styled.div<{ isActive: boolean; src: string; }>`
    width: 40px;
    height: 40px;
    border: 2px solid green;
    border-radius: ${p => p.isActive ? '0px' : '50%'};
    background: url(${p => p.src});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
`;