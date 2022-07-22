import * as React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { COLOR, FONT } from '../theme/constants';
import config from '../config.js';
import Header from '../components/templates/branding/header/header';
import Footer from '../components/templates/branding/footer/footer';

const Layout = ({
   children,
   title = 'Breaking Dev',
   description = 'A blog about what I do for a living and everything else',
   width = '',
   url = config.publicPath,
   bgColor = COLOR.WHITE,
   isTransparent = false,
}) => (
   <>
      <LayoutWrapper width={width}>
         <Head>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <title>{`${title}`}</title>
            <script
               type='application/ld+json'
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                     '@context': 'http://schema.org',
                     '@type': 'Webpage',
                     headline: `${title}`,
                     name: `${title}`,
                     description: `${description}`,
                     url: `${url}`,
                  })
               }}
            ></script>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
         </Head>
         {!isTransparent && <Header />}
         <ChildWrapper bgColor={bgColor}>{children}</ChildWrapper>
         {!isTransparent && <Footer />}
      </LayoutWrapper>
   </>
);

const LayoutWrapper = styled.div<{ width: string }>`
   width: auto;
   margin: 0 auto;
   margin-top: 0px;
   background-color: ${COLOR.WHITE};

   @media (min-width: 991px) {
      width: ${({ width }) => (width === 'full' ? '100%' : '950px')};
   }

   @media (min-width: 1250px) {
      width: ${({ width }) => (width === 'full' ? '100%' : '1130px')};
   }
`;

const ChildWrapper = styled.div<{ bgColor: string }>`
   min-height: 100vh;
   margin: auto;
   background-color: ${({ bgColor }) => (bgColor ? bgColor : COLOR.WHITE)};
`;

export default Layout;