import React, { useEffect } from 'react';
import config from '../config';
import { HOME_PAGE_DESCRIPTION, HOME_PAGE_TITLE } from '../constants/seo-copy';
import Layout from '../components/layout';
import { useDispatch } from 'react-redux';
import { get_icons } from '../redux/reducers/talents';
import Talents from '../components/templates/talents';
import { COLOR } from '../theme/constants';

const Home = (props: any) => {
  const isBrowser = () => typeof window !== "undefined";

  // SEO
  const title = HOME_PAGE_TITLE;
  const description = HOME_PAGE_DESCRIPTION;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_icons());
  }, [])

  return (
    <Layout
      title={title}
      description={description}
      width={'full'}
      bgColor={COLOR.BLACK}
      url={`${config.publicPath}`}
    >
      <Talents />
    </Layout>
  )
}

export default Home;
