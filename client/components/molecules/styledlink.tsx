import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import A from '../atoms/a';

interface IStyledLink extends BaseElement {
    href: string;
}

const StyledLink = (props: IStyledLink) => {
    const { href, className, children } = props;

    return (
        <Link
            href={href}
            passHref
        >
            <a href={href} className={className}>{children}</a>
        </Link>
    )
}

export default StyledLink;