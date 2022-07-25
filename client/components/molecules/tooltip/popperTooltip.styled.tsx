import styled from 'styled-components';
import { COLOR } from '../../../theme/constants';

export const Target = styled.div`
  display: inline;
`;

export const Popup = styled.div`
  z-index: 20;
  // box-shadow: 0px 4px 8px 0px rgba(17, 17, 17, 0.25);
  // -webkit-box-shadow: 0px 4px 8px 0px rgba(17, 17, 17, 0.25);
  // -moz-box-shadow: 0px 4px 8px 0px rgba(17, 17, 17, 0.25);

  .arrow {
    position: absolute;
    width: 10px;
    height: 10px;

    &:after {
      content: ' ';
      position: absolute;
      left: 0;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      width: 10px;
      height: 10px;
      background-color: ${COLOR.WHITE};
    }
  }

  &[data-placement^='top'] > .arrow {
    bottom: -5px;
    // :after {
    //   box-shadow: 1px 1px 1px rgba(17, 17, 17, 0.1);
    //   -moz-box-shadow: 1px 1px 1px rgba(17, 17, 17, 0.1);
    //   -webkit-box-shadow: 1px 1px 1px rgba(17, 17, 17, 0.1);
    // }
  }

  &[data-placement^='bottom'] > .arrow {
    top: -5px;
    // :after {
    //   box-shadow: -1px -1px 1px rgba(17, 17, 17, 0.1);
    //   -moz-box-shadow: -1px -1px 1px rgba(17, 17, 17, 0.1);
    //   -webkit-box-shadow: -1px -1px 1px rgba(17, 17, 17, 0.1);
    // }
  }

  &[data-placement^='left'] > .arrow {
    right: -5px;
    // :after {
    //   box-shadow: 1px -1px 1px rgba(17, 17, 17, 0.1);
    //   -moz-box-shadow: 1px -1px 1px rgba(17, 17, 17, 0.1);
    //   -webkit-box-shadow: 1px -1px 1px rgba(17, 17, 17, 0.1);
    // }
  }

  &[data-placement^='right'] > .arrow {
    left: -5px;
    // :after {
    //   box-shadow: -1px 1px 1px rgba(17, 17, 17, 0.1);
    //   -moz-box-shadow: -1px 1px 1px rgba(17, 17, 17, 0.1);
    //   -webkit-box-shadow: -1px 1px 1px rgba(17, 17, 17, 0.1);
    // }
  }
`;