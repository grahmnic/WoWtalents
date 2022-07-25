import React, { ReactNode, useState } from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import * as PopperJS from '@popperjs/core';

import { Target, Popup } from './popperTooltip.styled';

interface ITooltip extends BaseComponent {
  target: ReactNode;
  placement: PopperJS.Placement;
  skid?: number;
  distance?: number;
  showArrow?: boolean;
  //control show via external state, use when children controls parent tooltip
  showPopper?: boolean;
  controlShow?: boolean;
}

const PopperTooltip = (props: ITooltip) => {
  const { target, placement, skid = 0, distance = 10, showArrow = true, controlShow = false, showPopper = false } = props;

  const [show, setShow] = useState(false);

  const handleToggle = (state: boolean) => {
    setShow(state);
  }

  const showTooltip = controlShow ? showPopper : show;

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          !controlShow ? <Target ref={ref} onMouseEnter={() => handleToggle(true)} onMouseLeave={() => handleToggle(false)}>
            {target}
          </Target> : <Target ref={ref}>{target}</Target>
        )}
      </Reference>
      {showTooltip ? (
        <Popper
          placement={placement}
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [skid, distance]
              }
            }
          ]}
        >
          {({ ref, style, placement, arrowProps }) => (
            <Popup ref={ref} style={style} data-placement={placement} className="popper-tooltip">
              {props.children}
              {showArrow ? <div ref={arrowProps.ref} style={arrowProps.style} className='arrow'></div> : null}
            </Popup>
          )}
        </Popper>
      ) : null}
    </Manager>
  );
};

export default PopperTooltip;