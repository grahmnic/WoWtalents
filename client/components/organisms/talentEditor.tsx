import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setActiveTalent, updateTalent } from '../../redux/reducers/talents';
import { COLOR } from '../../theme/constants';
import Button from '../atoms/button';
import FlexContainer from '../atoms/flexContainer';
import TextInput from '../atoms/input';
import Subtitle from '../atoms/subtitle';
import TalentTooltip, { TooltipWrapper } from '../molecules/talentTooltip';

interface ITalentEditor extends Talent {

}

const TalentEditor = (props: ITalentEditor) => {
    const [values, setValues] = useState(props);
    const dispatch = useDispatch();

    const changeHandler = e => {
        setValues(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const cancel = () => dispatch(setActiveTalent(null));

    const save = () => {
        dispatch(updateTalent(values));
        dispatch(setActiveTalent(null));
    }

    return (
        <TalentEditorContainer>
            <TalentEditorBody>
                <TalentEditorForm flexDirection="column" alignItems="start" spaceBetween={8}>
                    <TalentEditorField flexDirection="row" spaceBetween={4}>
                        <TalentEditorFieldLabel>Talent Name:</TalentEditorFieldLabel>
                        <TalentEditorFieldTextInput name="label" value={values.label} setValue={changeHandler} />
                    </TalentEditorField>
                    <TalentEditorPreview {...values}/>
                    <TalentEditorActions flexDirection="row" spaceBetween={12}>
                        <TalentEditorButton callback={cancel}>Cancel</TalentEditorButton>
                        <TalentEditorButton callback={save}>Save</TalentEditorButton>
                    </TalentEditorActions>
                </TalentEditorForm>
            </TalentEditorBody>
        </TalentEditorContainer>
    )
}

export default TalentEditor;

/*-----------------STYLES-----------------*/
const TalentEditorContainer = styled.div``;

const TalentEditorBody = styled(TooltipWrapper)``;

const TalentEditorForm = styled(FlexContainer)`
    padding: 40px;
`;

const TalentEditorPreview = styled(TalentTooltip)`
    margin-top: 20px;
`;

const TalentEditorField = styled(FlexContainer)`
    color: ${COLOR.WHITE};
`;

const TalentEditorFieldLabel = styled(Subtitle)`
    color: inherit;
    font-size: 14px;
`;

const TalentEditorFieldTextInput = styled(TextInput)`
    border-bottom: 1px solid ${COLOR.WHITE} !important;
    color: inherit;
`;

const TalentEditorActions = styled(FlexContainer)`
    margin-top: 20px;
`;

const TalentEditorButton = styled(Button)`
    color: ${COLOR.WHITE};
    padding: 2px 12px;
    border-radius: 12px;
    border: 1px solid ${COLOR.WHITE};

    &:hover {
        color: yellow;
        border-color: yellow;
    }
`;