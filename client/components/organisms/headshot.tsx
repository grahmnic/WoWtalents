import React from 'react';
import styled from 'styled-components';
import P from '../atoms/p';
import Title from '../atoms/title';
import Image from 'next/image';
import Subtitle from '../atoms/subtitle';
import A from '../atoms/a';
import List from '../atoms/list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubAlt, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { COLOR } from '../../theme/constants';
import FlexContainer from '../atoms/flexContainer';

const Headshot = (props: any) => {

  return (
    <HeadshotWrapper
        alignItems="center"
    >
        <ImageContainer>
            <Image layout="fill" objectFit="cover" src="/images/headshot.jpg" alt="headshot" priority={true} />
        </ImageContainer>
        <Name>Nick Chen</Name>
        <Tag>@grahmnic</Tag>
        <Blurb>Making magic happen.</Blurb>
        <Links
            spaceBetween={0}
        >
            <LinkAnchor href="https://github.com/grahmnic" target="_blank">
                <FontAwesomeIcon
                    width={16}
                    height={16}
                    fontSize={16}
                    icon={faGithubAlt}
                />
                github.com/grahmnic
            </LinkAnchor>
            <LinkAnchor href="https://www.linkedin.com/in/nickschen/" target="_blank">
                <FontAwesomeIcon
                    width={16}
                    height={16}
                    fontSize={16}
                    icon={faLinkedinIn}
                />
                linkedin.com/nickschen
            </LinkAnchor>
        </Links>
    </HeadshotWrapper>
  )
}

const HeadshotWrapper = styled(FlexContainer)`

`;

const Name = styled(Title)`
    font-size: 20px;
    text-align: center;
    margin-top: 12px;
`;

const Tag = styled(Subtitle)`
    display: block;
    text-align: center;
    color: ${COLOR.DARKGREY};
`;

const Blurb = styled(P)`
    padding: 12px 0;
    display: block;
    text-align: center;
`;

const Links = styled(List)``;

const LinkAnchor = styled(A)`
    font-size: 12px;
    display: flex;
    align-items: center;
    padding: 2px 0;

    &:hover {
        text-decoration: underline;
    }

    svg {
        margin-right: 12px;
        color: ${COLOR.GREY};
    }
`;

const ImageContainer = styled.div`
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    width: 140px;
    height: 140px;
`;

export default Headshot;
