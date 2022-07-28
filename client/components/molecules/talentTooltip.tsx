import React from 'react';
import styled from 'styled-components';
import FlexContainer from '../atoms/flexContainer';
import Subtitle from '../atoms/subtitle';

interface ITalentTooltip extends TalentDraft, BaseComponent {

}

const Talent = (props: ITalentTooltip) => {
    const { label, summary, ranks, isActive, cost, cooldown, isMelee, castTime, charges, resource, minRange, maxRange, className } = props;

    const talentCost = cost && resource && resource.length ? `${cost}${(() => {
        switch(resource) {
            case `mana`:
                return '% of base mana';
            default:
                return ` ${resource}`;
        }
    })()}` : null;

    let talentRange = !isMelee ? (maxRange ?
        (minRange ?
            `${minRange} - ${maxRange} yd range` :
            `${maxRange} yd range`)
        : null): 'Melee Range';

    const talentCastTime = castTime > 0 ? `${castTime} sec cast` : 'Instant';

    const cooldownSuffix = charges ? `recharge` : `cooldown`;

    const talentCooldown = cooldown && cooldown > 0 ?
        (cooldown >= 60 ?
            `${Math.round(cooldown/6)/10} min ${cooldownSuffix}` :
            `${cooldown} sec ${cooldownSuffix}`
        ) : null;

    const talentCharges = charges && charges > 0 && `${charges} charges`

    return (
        <TalentTooltipContainer className={className}>
            <TalentTooltipBody>
                <TalentTooltipContent flexDirection="column" justifyContent="start" alignItems="start" spaceBetween={2}>
                    <TalentTooltipLabel>{label}</TalentTooltipLabel>
                    <TalentTooltipSubtitle>{isActive ? 'Active' : 'Passive'}</TalentTooltipSubtitle>
                    {isActive && (
                        <>
                            <TalentTooltipDetails justifyContent="space-between">
                                {talentCost && <TalentTooltipDetail>
                                    {talentCost}
                                </TalentTooltipDetail>}
                                {talentRange && <TalentTooltipDetail>
                                    {talentRange}
                                </TalentTooltipDetail>}
                            </TalentTooltipDetails>
                            <TalentTooltipDetails justifyContent="space-between">
                                {talentCastTime && <TalentTooltipDetail>
                                    {talentCastTime}
                                </TalentTooltipDetail>}
                                {talentCooldown && <TalentTooltipDetail>
                                    {talentCooldown}
                                </TalentTooltipDetail>}
                            </TalentTooltipDetails>
                            {talentCharges && <TalentTooltipDetail>
                                {talentCharges}
                            </TalentTooltipDetail>}
                        </>
                    ).props.children}
                    <TalentTooltipSummary>
                        {summary}
                    </TalentTooltipSummary>
                </TalentTooltipContent>
                <TalentTooltipCorner />
            </TalentTooltipBody>
        </TalentTooltipContainer>
    )
}

export default Talent;

export const TooltipWrapper = (props) => <TalentTooltipBody>
    {props.children}
    <TalentTooltipCorner />
</TalentTooltipBody>

/*-----------------STYLES-----------------*/
const borderOffset = 6;

const TalentTooltipLabel = styled(Subtitle)`
    color: white;
    font-size: 14px;
`;

const TalentTooltipSubtitle = styled(Subtitle)``;

const TalentTooltipDetails = styled(FlexContainer)`
    width: 100%;
`;

const TalentTooltipDetail = styled(Subtitle)`
    color: white;
`;

const TalentTooltipSummary = styled(Subtitle)`
    color: yellow;
    margin-top: ${borderOffset}px;
`;

const TalentTooltipContainer = styled.div`
    max-height: 100vh;
    max-width: 400px;
`;

export const TalentTooltipCorner = styled.div`
    height: ${borderOffset}px;
    width: ${borderOffset}3px;
    position: absolute;
    bottom: -${borderOffset}px;
    right: -${borderOffset}px;
    background: url(https://wow.zamimg.com/images/wow/tooltip.png);
    background-position: bottom right;
`;

export const TalentTooltipBody = styled.div`
    background: url(https://wow.zamimg.com/images/wow/tooltip.png);
    padding: ${borderOffset/2}px 0 0 ${borderOffset/2}px;
    position: relative;

    &:before {
        content: '';
        height: ${borderOffset}px;
        width: 100%;
        bottom: -${borderOffset}px;
        left: 0;
        background: url(https://wow.zamimg.com/images/wow/tooltip.png);
        background-position: bottom left;
        position: absolute;
    }

    &:after {
        content: '';
        height: 100%;
        width: ${borderOffset}px;
        top: 0;
        right: -${borderOffset}px;
        background: url(https://wow.zamimg.com/images/wow/tooltip.png);
        background-position: top right;
        position: absolute;
    }
`;

const TalentTooltipContent = styled(FlexContainer)`
    padding: 12px;
`;