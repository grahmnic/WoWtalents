import React from 'react';
import styled from 'styled-components';
import Img from '../atoms/img';
import TalentTooltip from './talentTooltip';
import PopperTooltip from './tooltip/popperTooltip';

interface ITalent extends Talent, BaseComponent {
    thumbnailUrl: string;
}

const Talent = (props: ITalent) => {
    const { thumbnailUrl, className} = props;

    return (
        <PopperTooltip target={<TalentWrapper {...props} src={thumbnailUrl} className={className}/>} skid={-8} placement={'right-start'} showArrow={false}>
            <TalentTooltip {...props} className=''/>
        </PopperTooltip>
    )
}

export default Talent;

/*-----------------STYLES-----------------*/
export const TalentWrapper = styled.div<{ isActive: boolean; src: string; }>`
    width: 100%;
    height: 100%;
    background: url(${p => p.src});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
`;