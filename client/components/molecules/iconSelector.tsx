import React, { useState } from 'react';
import { selectTalents } from '../../redux/reducers/talents';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import TextInput from '../atoms/input';
import FlexContainer from '../atoms/flexContainer';
import { COLOR } from '../../theme/constants';
import Button from '../atoms/button';
import { TalentWrapper } from './talent';
import PopperTooltip from './tooltip/popperTooltip';
import Subtitle from '../atoms/subtitle';

interface IIconSelector extends BaseComponent {
    callback: any;
    selectedId: string;
}

const IconSelector = (props: IIconSelector) => {
    const { callback, selectedId } = props;

    const [search, setSearch] = useState('');

    const handleSetSearch = (e) => setSearch(e.target.value);

    const { lookup: icons } = useSelector(selectTalents);

    const pattern = new RegExp(search.toLocaleLowerCase(), 'g');

    const filteredIcons = Object.keys(icons).filter((url) => pattern.test(url)).slice(0, 75).map((url) =>
        <Icon key={url} selected={icons[url].file_data_id == selectedId} callback={() => callback(icons[url].file_data_id.toString())}>
            <PopperTooltip target={<TalentWrapper src={url} isActive />} skid={-8} placement={'auto'} showArrow={false}>
                <IconTooltip>{url.split('/').pop().split('.')[0]}</IconTooltip>
            </PopperTooltip>
        </Icon>
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
    background: rgba(255, 255, 255, 0.1);
    padding: 12px;
    width: 400px;
`;

const IconSelectorSearch = styled(TextInput)`
    background: rgba(0, 0, 0, 0.4);
    color: ${COLOR.WHITE};
    font-size: 16px;
    margin-bottom: 12px;
    padding: 4px;
`;

const Icon = styled(Button)<{ selected: boolean; }>`
    width: 32px;
    height: 32px;
    ${p => p.selected ? `
        border: 2px solid yellow;
    `: ''}
`;

const IconTooltip = styled(Subtitle)`
    color: ${COLOR.WHITE};
    font-weight: 600;
    background: rgba(0, 0, 0, 0.4);
    padding: 4px;
`;

const IconSelectorGrid = styled(FlexContainer)``;