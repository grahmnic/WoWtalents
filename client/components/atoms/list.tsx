import React from 'react';
import styled from 'styled-components';

interface IList extends BaseElement {
  orientation?: 'vertical' | 'horizontal';
  customScrollbar?: any;
  customScrollbarProps?: any;
  customScrollbarPadding?: number;
  spaceBetween?: number;
  listStyle?: string;
  scrollable?: boolean;
}

const List = (props: IList) => {
    const {
        orientation = 'vertical',
        customScrollbar,
        customScrollbarPadding = 16,
        spaceBetween = 8,
        listStyle = 'none',
        scrollable = true,
        className,
        children
    } = props;

    const items = React.Children.map(children, (e, index) => <li>{e}</li>);

    const list = (
    <ListWrapper
        listStyle={listStyle}
        orientation={orientation}
        customScrollbar={customScrollbar}
        customScrollbarPadding={customScrollbarPadding}
        spaceBetween={spaceBetween}
        scrollable={scrollable}
        className={className}
    >
        {items}
    </ListWrapper>
    );

    const scrollbar = props.customScrollbar ? React.cloneElement(<props.customScrollbar />, props.customScrollbarProps, list) : null;

    return scrollbar ? scrollbar : list;
};

interface ListWrapperProps {
  listStyle: string;
  orientation: string;
  customScrollbar: boolean;
  customScrollbarPadding: number;
  spaceBetween: number;
  scrollable: boolean;
}

export const ListWrapper = styled.ul<ListWrapperProps>`
  list-style: ${p => p.listStyle};
  padding-inline-start: 0;
  padding-left: 0;
  padding-top: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin: 0;
  overflow: ${p => p.scrollable ? 'auto' : 'none'};
  min-height: 0;
  ${p => {
    if (p.customScrollbar) {
      if (p.orientation === 'horizontal') {
        return `
          padding-bottom: ${p.customScrollbarPadding}px;
        `;
      } else {
        return `
          padding-right: ${p.customScrollbarPadding}px;
        `;
      }
    }
  }}
  li {
    float: ${p => (p.orientation === 'horizontal' ? 'left' : 'none')};
    &:not(:last-child) {
      margin-${p => (p.orientation === 'horizontal' ? 'right' : 'bottom')}: ${p => p.spaceBetween}px;
    }
  }
`;

export default List;