import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import config from '../../../config';
import APIClient from '../../../helpers/apiClient';
import useAsync from '../../../helpers/hooks/useAsync';
import FlexContainer from '../../atoms/flexContainer';
import Posts from '../../molecules/posts/posts';
import Headshot from '../../organisms/headshot';

const Body = (props: any) => {
  const { execute, status, value, error } = useAsync(async () => {
    const res = await APIClient('get', `${config.apiHost}posts`);

    return res.data;
  }, false);

  useEffect(() => {
    if (!value) {
      execute();
    }
  }, [value]);

  const posts = value ? value : [];

  return (
    <HomeWrapper
      flexDirection="row"
    >
        <LeftPanel
          alignItems="center"
        >
          <Headshot />
        </LeftPanel>
        <Posts posts={posts} />
        <RightPanel></RightPanel>
    </HomeWrapper>
  )
}

const LeftPanel = styled(FlexContainer)`
  width: 600px;
  position: sticky;
  top: 48px;
`;

const HomeWrapper = styled(FlexContainer)`
  padding: 48px 0;
  position: relative;
  z-index: 2;
`;

const RightPanel = styled.div`
    width: 600px;
`;

export default Body;
