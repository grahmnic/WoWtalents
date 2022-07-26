import React, { useEffect, useRef } from 'react';

export const CHECKED = 1
export const UNCHECKED = 2
export const INDETERMINATE = -1

interface ICheckbox extends BaseComponent {
  name?: string,
  value: number,
  callback?: any,
  readOnly?: boolean,
}

const defaultProps: ICheckbox = {
  value: 2,
  readOnly: true,
}

const Checkbox: React.FC<ICheckbox> = (props) => {
  const checkRef = useRef(null);

  useEffect(() => {
    if (checkRef && checkRef.current) {
      checkRef.current.checked = props.value == CHECKED
      checkRef.current.indeterminate = props.value == INDETERMINATE
    }
  }, [props.value])

  return (
    <input
      type="checkbox"
      name={props.name}
      readOnly={props.readOnly}
      onChange={props.callback}
      ref={checkRef}
      style={{cursor: 'pointer'}}
      className={props.className}
    />
  );
}

Checkbox.defaultProps = defaultProps;

export default Checkbox;