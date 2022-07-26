import React from 'react';
import styled from 'styled-components';
import FlexContainer from '../atoms/flexContainer';

interface IModal extends BaseComponent {
  isMobile?: boolean
}

const Modal = (props: IModal) => {
  return (
    <ModalWrapper
      justifyContent="center"
      alignItems="center"
      className={props.className}
      isMobile={props.isMobile}>
      {props.children}
    </ModalWrapper>
  )
}

export const ModalWrapper = styled(FlexContainer)<{ isMobile: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 200;
`;

export default Modal;