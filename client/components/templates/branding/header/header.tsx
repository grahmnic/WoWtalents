import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { COLOR, TYPOGRAPHY } from '../../../../theme/constants';
import FlexContainer from '../../../atoms/flexContainer';
import List from '../../../atoms/list';
import Title from '../../../atoms/title';
import StyledLink from '../../../molecules/styledlink';
import { useSelector } from 'react-redux';
import { selectAuth, selectAuthenticated, selectRole, setLoginError, setLoginModal,  } from '../../../../redux/reducers/auth';
import { useDispatch } from 'react-redux';
import Button from '../../../atoms/button';
import LoginModal from '../../../organisms/login';
import { useScrollBlock } from '../../../../helpers/hooks/useScrollBlock';

interface IHeader {
    isTransparent?: boolean;
}

const Header = (props: IHeader) => {
    const { isTransparent = false } = props;

    const authenticated = useSelector(selectAuthenticated);
    const showLoginModal = useSelector(selectAuth).showLoginModal;

    const router = useRouter();
    const dispatch = useDispatch();
    const [block, unblock] = useScrollBlock();

    if(!showLoginModal) {
        unblock();
    }

    const handleLogin = () => {
        dispatch(setLoginModal(true));
        block();
    }

    const closeLogin = () => {
        dispatch(setLoginModal(false));
        dispatch(setLoginError(null));
        unblock();
    }

    return (
        <H
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            isTransparent={isTransparent}
        >
            <StyledLink href="/">
                <HeaderTitle>BREAKING/DEV</HeaderTitle>
            </StyledLink>
            <Nav>
                <List
                    orientation="horizontal"
                    spaceBetween={20}
                >
                    <NavLink active={router.pathname == "/"} href="/">Home</NavLink>
                    <NavLink active={router.pathname == "/archive"} href="/">Archive</NavLink>
                    <NavLink active={router.pathname == "/faq"} href="/">FAQ</NavLink>
                    <NavLink active={router.pathname == "/archive"} href="/">Random</NavLink>
                    {authenticated ? null :
                    <NavButton
                        callback={handleLogin}
                    >
                        Login
                    </NavButton>}
                </List>
            </Nav>
            {showLoginModal && <LoginModal close={closeLogin} />}
        </H>
    )
}

const H = styled(FlexContainer)<{ isTransparent: boolean }>`
    height: 75px;
    width: 100%;
    padding: 0 48px;
    position: absolute;
    z-index: 200;
    top: 0;
    left: 0;
    background: transparent;
`;

const HeaderTitle = styled(Title)`
    font-size: 22px;
    color: ${COLOR.WHITE};
`;

const Nav = styled.nav``;

const NavLink = styled(StyledLink)<{ active: boolean }>`
    color: ${COLOR.WHITE};
    ${TYPOGRAPHY.BOLD};
    font-size: 14px;
    display: block;
    padding: 10px 0;

    ${p => p.active ? `
        border-bottom: 4px solid ${COLOR.DARKGREY};
    ` : ''}
`;

const NavButton = styled(Button)`
    border: 1px solid ${COLOR.WHITE};
    background: transparent;
    padding: 4px 8px;
    margin-top: 6px;
    color: ${COLOR.WHITE};
    ${TYPOGRAPHY.LIGHT};
`;

export default Header;