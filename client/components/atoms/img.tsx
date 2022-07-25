import React from 'react';
import styled from 'styled-components';

interface IImg extends BaseComponent {
  src: string,
  alt: string,
  width?: number,
  height?: number,
}

const Img: React.FC<IImg> = (props) => {
  const { height, width, className } = props;
  return (
    <I
      height={height}
      width={width}
      className={className}
      {...props}
    />
  );
}

const I = styled.img<{ height?: number, width?: number }>`
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  min-width: ${p => p.width}px;
  min-height: ${p => p.height}px;
  object-fit: cover;
`;

export default Img;