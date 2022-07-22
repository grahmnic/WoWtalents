import React from 'react';
import styled from 'styled-components';

interface IAnchor extends BaseElement {
    href: string;
    target?: string;
    textDecoration?: string;
}

const A = (props: IAnchor) => {
    const { href, target='_self', className, children } = props;

    return (
        <Anchor
            href={href}
            target={target}
            rel="noreferrer noopener"
            className={className}
        >{children}</Anchor>
    )
}

const Anchor = styled.a<{ textDecoration?: string }>`
    text-decoration: ${p => p.textDecoration};
`;

export default A;