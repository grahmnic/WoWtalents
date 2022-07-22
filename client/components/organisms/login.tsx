import { faKey, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import useOnClickOutside from '../../helpers/hooks/useOnClickOutside';
import { COLOR, TYPOGRAPHY } from '../../theme/constants';
import FlexContainer from '../atoms/flexContainer';
import TextField from '../molecules/form/field';
import Modal from '../molecules/modal';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectAuth } from '../../redux/reducers/auth';
import Button from '../atoms/button';
import Subtitle from '../atoms/subtitle';

interface ILogin {
    close: any;
}

const Login = (props: ILogin) => {
    const { close } = props;

    const ref = useRef(null);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginError = useSelector(selectAuth).loginError;

    const handleLogin = () => {
        dispatch(login({
            username: username,
            password: password
        }));
    }

    useOnClickOutside(ref, () => close());

    return (
        <Modal>
            <ModalWrapper ref={ref}>
                <ModalHeader
                    alignItems="end"
                >
                    <FontAwesomeIcon
                        icon={faTimes}
                        fontSize={18}
                        height={20}
                        width={20}
                        onClick={() => close()}
                        cursor="pointer"
                        color={COLOR.BLACK}
                    />
                </ModalHeader>
                <ModalBody
                    alignItems="center"
                    justifyContent="center"
                    spaceBetween={20}
                >
                    <TextField
                        value={username}
                        setValue={setUsername}
                        placeholder="Username"
                    >
                        <FontAwesomeIcon
                            icon={faUser}
                            fontSize={18}
                            height={18}
                            width={18}
                            color={COLOR.LIGHTGREY}
                        />
                    </TextField>
                    <TextField
                        value={password}
                        setValue={setPassword}
                        placeholder="Password"
                        type="password"
                    >
                        <FontAwesomeIcon
                            icon={faKey}
                            fontSize={18}
                            height={18}
                            width={18}
                            color={COLOR.LIGHTGREY}
                        />
                    </TextField>
                    <ModalButton
                        callback={handleLogin}
                    >SIGN IN
                        {loginError && <ModalError>{loginError}.</ModalError>}
                    </ModalButton>
                </ModalBody>
            </ModalWrapper>
        </Modal>
    )
}

const ModalWrapper = styled.div`
    border-radius: 4px;
    background: ${COLOR.WHITE};
    width: 500px;
    height: 600px;
    box-shadow: rgb(0 0 0 / 15%) 0px 2px 10px;
    position: relative;
`;

const ModalHeader = styled(FlexContainer)`
    position: absolute;
    padding: 20px;
    width: 100%;
    top: 0;
    left: 0;
`;

const ModalBody = styled(FlexContainer)`
    height: 100%;
`;

const ModalButton = styled(Button)`
    width: 50%;
    padding: 12px 0;
    background: ${COLOR.BLACK};
    border-radius: 4px;
    font-size: 18px;
    color: ${COLOR.WHITE};
    ${TYPOGRAPHY.BOLD};
    position: relative;
`;

const ModalError = styled(Subtitle)`
    color: ${COLOR.ERROR};
    ${TYPOGRAPHY.BOLD};
    position: absolute;
    bottom: -100%;
    left: 0;
    width: 100%;
    text-align: center;
`;

export default Login;
