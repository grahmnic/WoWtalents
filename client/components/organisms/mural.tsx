import React from 'react';
import styled from 'styled-components';
import { COLOR, TYPOGRAPHY } from '../../theme/constants';
import Image from 'next/image';
import Hr from '../atoms/hr';
import FlexContainer from '../atoms/flexContainer';
import Title from '../atoms/title';

interface IMural {
    isMobile?: boolean;
}

const Mural = (props: IMural) => {
    const { isMobile = false } = props;

    return (
        <M
            justifyContent="center"
            alignItems="center"
            isMobile={isMobile}
        >
            <MuralDeskContainer>
                <Image width={200} height={235} src="/images/mural.svg" alt="desk" priority={true}/>
            </MuralDeskContainer>
            <MuralWire height={3} backgroundColor={COLOR.WHITE} />
            <MuralCatContainerWhite>
                <Image width={200} height={60} src="/images/cat-dark.svg" alt="cat" priority={true}/>
            </MuralCatContainerWhite>
            <MuralOutletContainer>
                <Image width={30} height={55} src="/images/outlet.svg" alt="outlet" priority={true}/>
            </MuralOutletContainer>
            <MuralCTAContainer>
                <MuralCTA>
                    This is beautiful, calm, and very happy. There’s a story, but no villain. A journey, but no obstacle other than distance. There’s no struggle, only progress. I was constantly on edge, waiting for something to happen to the witches, to the star, but nothing ever did. This is beautiful, calm, and very happy. There’s a story, but no villain. A journey, but no obstacle other than distance. There’s no struggle, only progress. I was constantly on edge, waiting for something to happen to the witches, to the star, but nothing ever did.
                </MuralCTA>
            </MuralCTAContainer>
        </M>
    )
}

const M = styled(FlexContainer)<{ isMobile: boolean }>`
    width: 100%;
    height: 320px;
    background: ${COLOR.BLACK};
    position: relative;
`;

const MuralCTAContainer = styled.div`
    width: 2200px;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
`;

const MuralCTA = styled(Title)`
    color: ${COLOR.WHITE};
    font-size: 60px;
    width: 110%;
    opacity: 0.05;
    ${TYPOGRAPHY.BLACK};
    position: relative;
    z-index: 1;
    user-select: none;
`;

const MuralDeskContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 235px;
    user-select: none;
    z-index: 2;
`;

const MuralWire = styled(Hr)`
    position: absolute;
    bottom: 20px;
    left: 195px;
    width: calc(100% - 400px);
    z-index: 2;
`;

const MuralCatContainerWhite = styled.div`
    position: absolute;
    bottom: -30px;
    right: 20px;
    user-select: none;
    z-index: 3;
    transform: rotate(30deg);
`;

const MuralOutletContainer = styled.div`
    position: absolute;
    bottom: -2px;
    right: 190px;
    user-select: none;
    z-index: 2;
`;

export default Mural;