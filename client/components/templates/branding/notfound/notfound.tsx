import React from 'react';
import styled from 'styled-components';

interface INotFound {

}

const NotFound = (props: INotFound) => {
    const {  } = props;

    return (
        <NotFoundWrapper></NotFoundWrapper>
    )
}

const NotFoundWrapper = styled.div`
    text-decoration: ${p => p.textDecoration};
`;

export default NotFound;