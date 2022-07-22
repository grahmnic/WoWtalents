import React from 'react';
import styled from 'styled-components';
import { COLOR, TYPOGRAPHY } from '../../../../theme/constants';
import A from '../../../atoms/a';
import FlexContainer from '../../../atoms/flexContainer';
import List from '../../../atoms/list';
import Subtitle from '../../../atoms/subtitle';
import StyledLink from '../../../molecules/styledlink';

interface IFooter {

}

const Footer = (props: IFooter) => {
    const { } = props;

    return (
        <FooterWrapper
            justifyContent="center"
            alignItems="center"
        >
            <F
                justifyContent="space-evenly"
                flexDirection="row"
            >
                <FooterList
                    spaceBetween={8}
                >
                    <FooterSubtitle>NAVIGATION</FooterSubtitle>
                    <FooterLink href="/">Home</FooterLink>
                    <FooterLink href="/about">About</FooterLink>
                    <FooterLink href="/contact">Contact Me</FooterLink>
                </FooterList>
                <FooterList
                    spaceBetween={8}
                >
                    <FooterSubtitle>POPULAR</FooterSubtitle>
                    <FooterLink href="/post/In Losing The Village We Abandoned Society’s Parents">In Losing The Village We Abandoned Society’s Parents</FooterLink>
                    <FooterLink href="/post/In Losing The Village We Abandoned Society’s Parents">In Losing The Village We Abandoned Society’s Parents</FooterLink>
                    <FooterLink href="/post/In Losing The Village We Abandoned Society’s Parents">In Losing The Village We Abandoned Society’s Parents</FooterLink>
                    <FooterLink href="/post/In Losing The Village We Abandoned Society’s Parents">In Losing The Village We Abandoned Society’s Parents</FooterLink>
                    <FooterLink href="/post/In Losing The Village We Abandoned Society’s Parents">In Losing The Village We Abandoned Society’s Parents</FooterLink>
                </FooterList>
                <FooterList
                    spaceBetween={8}
                >
                    <FooterSubtitle>LINKS</FooterSubtitle>
                    <FooterAnchor href="https://google.com">Top 10 College Pranks</FooterAnchor>
                    <FooterAnchor href="https://google.com">Top 10 College Pranks</FooterAnchor>
                    <FooterAnchor href="https://google.com">Top 10 College Pranks</FooterAnchor>
                    <FooterAnchor href="https://google.com">Top 10 College Pranks</FooterAnchor>
                </FooterList>
            </F>
        </FooterWrapper>
    )
}

const FooterWrapper = styled(FlexContainer)`
    width: 100%;
    height: 380px;
    background: ${COLOR.BLACK};
    padding: 0 48px;
    position: relative;
    z-index: 100;
`;

const F = styled(FlexContainer)`
    width: 100%;
`;

const FooterList = styled(List)`
`;

const FooterSubtitle = styled(Subtitle)`
    ${TYPOGRAPHY.BLACK};
    letter-spacing: 1px;
    color: ${COLOR.WHITE};
`;

const FooterLink = styled(StyledLink)`
    font-size: 11px;
    color: ${COLOR.WHITE};

    &:hover {
        text-decoration: underline;
    }
`;

const FooterAnchor = styled(A)`
    font-size: 11px;
    color: ${COLOR.WHITE};

    &:hover {
        text-decoration: underline;
    }
`;

export default Footer;