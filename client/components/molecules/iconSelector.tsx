import React, { useState } from 'react';
import { selectTalents } from '../../redux/reducers/talents';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import TextInput from '../atoms/input';
import FlexContainer from '../atoms/flexContainer';
import { COLOR } from '../../theme/constants';
import Button from '../atoms/button';

interface IIconSelector extends BaseComponent {
    callback: any;
}

const IconSelector = (props: IIconSelector) => {
    const { callback } = props;

    const [search, setSearch] = useState('');

    const handleSetSearch = (e) => setSearch(e.target.value);

    const { lookup: icons } = useSelector(selectTalents);

    const pattern = new RegExp(search, 'g');

    const filteredIcons = Object.keys(icons).filter((url) => pattern.test(url)).slice(0, 85).map((url) =>
        <Icon key={url} url={url} callback={() => callback(icons[url].file_data_id)}/>
    );

    return (
        <IconSelectorContainer>
            <IconSelectorSearch value={search} setValue={handleSetSearch} />
            <IconSelectorGrid flexDirection="row" justifyContent="start" alignItems="start" spaceBetween={4} flexWrap>
                {filteredIcons}
            </IconSelectorGrid>
        </IconSelectorContainer>
    )
}

export default IconSelector;

/*-----------------STYLES-----------------*/
const IconSelectorContainer = styled.div`
    background: rgba(255, 255, 255, 0.05);
    padding: 12px;
    width: 650px;
`;

const IconSelectorSearch = styled(TextInput)`
    background: rgba(0, 0, 0, 0.4);
    color: ${COLOR.WHITE};
    font-size: 16px;
    margin-bottom: 12px;
    padding: 4px;
`;

const Icon = styled(Button)<{ url: string }>`
    width: 32px;
    height: 32px;
    background: url(${p => p.url});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 4px;
`;

const IconSelectorGrid = styled(FlexContainer)``;