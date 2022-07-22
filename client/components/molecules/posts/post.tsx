import React from 'react';
import styled from 'styled-components';
import FlexContainer from '../../atoms/flexContainer';
import moment from 'moment';
import Subtitle from '../../atoms/subtitle';
import { COLOR, FONT, TYPOGRAPHY } from '../../../theme/constants';
import StyledLink from '../styledlink';
import Title from '../../atoms/title';
import Hr from '../../atoms/hr';
import P from '../../atoms/p';

interface IPost {
    isMobile?: boolean;
    title: string;
    subtitle: string;
    blurb: string;
    slug: string;
    publishedAt: any;
    primaryTopic: string;
    secondaryTopics: string[];
    timeToRead: number;
    thumbnail?: any;
}

const Post = (props: IPost) => {
    const { isMobile = false, title, slug, subtitle, blurb, publishedAt, primaryTopic, secondaryTopics, thumbnail, timeToRead } = props;

    const minutesToRead = Math.round(timeToRead / 60) + " min";

    const formattedDate = moment(publishedAt).format('MMM Do YYYY');

    const formattedBlurb = blurb + "...";

    return (
        <PostWrapper isMobile={isMobile}>
            <PostBody
                spaceBetween={6}
            >
                <PostHeader
                    flexDirection="row"
                    alignItems="center"
                    spaceBetween={12}
                >
                    <PostCategory>{primaryTopic}</PostCategory>
                    <Hr backgroundColor={COLOR.GREY}/>
                </PostHeader>
                <PostTitle href={`/post/${slug}`}>{title}</PostTitle>
                <PostSubtitle>{subtitle}</PostSubtitle>
                <PostBlurb>
                    {formattedBlurb}
                </PostBlurb>
                <PostReadMore href={`/post/${slug}`}>
                    Read More...
                </PostReadMore>
                <PostMeta
                    flexDirection="row"
                    alignItems="center"
                    spaceBetween={16}
                >
                    <PostDate>{formattedDate}</PostDate>
                    <PostReadingTime>{minutesToRead}</PostReadingTime>
                    <PostPrimaryTopic>{secondaryTopics[0]}</PostPrimaryTopic>
                </PostMeta>
            </PostBody>
            {thumbnail && <div></div>}
        </PostWrapper>
    )
}

const PostWrapper = styled(FlexContainer)<{ isMobile: boolean }>`
    width: 100%;
`;

const PostHeader = styled(FlexContainer)`
    width: 100%;
`;

const PostBody = styled(FlexContainer)``;

const PostCategory = styled(Title)`
    ${TYPOGRAPHY.BOLD};
    font-size: 14px;
    text-transform: uppercase;
    color: ${COLOR.GREY};
    white-space: nowrap;
`;

const PostTitle = styled(StyledLink)`
    ${TYPOGRAPHY.BLACK};
    font-size: 24px;

    &:hover {
        text-decoration: underline;
    }
`;

const PostReadMore = styled(StyledLink)`
    margin-top: 8px;
    ${TYPOGRAPHY.BOLD};
    font-size: 13px;

    &:hover {
        text-decoration: underline;
    }
`;

const PostSubtitle = styled(Subtitle)`
    font-size: 14px;
    color: ${COLOR.DARKGREY};
    font-style: ${FONT.STYLE.ITALIC};
`;

const PostBlurb = styled(P)`
    font-size: 12px;
    color: ${COLOR.BLACK};
    margin-top: 8px;
    position: relative;

    &:after {
        content: "";
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        background-image : linear-gradient(to bottom,
            rgba(255,255,255, 0),
            rgba(255,255,255, 0.8) 90%);
        width: 100%;
        height: 60px;
    }
`;

const PostMeta = styled(FlexContainer)`
    height: 18px;
    margin-top: 8px;

    > {
        &:not(:last-child) {
            position: relative;

            &:after {
                content: "•";
                color: ${COLOR.DARKGREY};
                position: absolute;
                top: 1px;
                right: -10px;
            }
        }
    }
`;

const PostDate = styled(Subtitle)`
    color: ${COLOR.DARKGREY};
`;

const PostReadingTime = styled(Subtitle)`
    color: ${COLOR.DARKGREY};
`;

const PostPrimaryTopic = styled(Subtitle)`
    color: ${COLOR.DARKGREY};
    background: ${COLOR.LIGHTGREY};
    border-radius: 16px;
    padding: 2px 8px;
`;

export default Post;