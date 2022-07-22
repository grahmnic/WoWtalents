import React from 'react';
import styled from 'styled-components';
import List from '../../atoms/list';
import Post from './post';

interface IPosts {
    isMobile?: boolean;
    posts: any[];
}

const Posts = (props: IPosts) => {
    const { isMobile = false, posts } = props;

    const postList = posts.map((post, index) =>
        <Post
            title={post.title}
            subtitle={post.subtitle}
            blurb={post.blurb}
            primaryTopic={post.primaryTopic}
            secondaryTopics={post.secondaryTopics}
            slug={post.slug}
            timeToRead={post.timeToRead}
            publishedAt={new Date(post.publishedAt)}
            key={index}
        />
    );

    return (
        <PostList
            isMobile={isMobile}
            spaceBetween={32}
            scrollable={false}
            >
            {postList}
        </PostList>
    )
}

const PostList = styled(List)<{ isMobile: boolean }>`
    width: 100%;
`;

export default Posts;