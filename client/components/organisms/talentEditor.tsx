import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setActiveTalent, updateTalent } from '../../redux/reducers/talents';
import { COLOR } from '../../theme/constants';
import Button from '../atoms/button';
import Checkbox, { CHECKED, UNCHECKED } from '../atoms/checkbox';
import FlexContainer from '../atoms/flexContainer';
import TextInput from '../atoms/input';
import Subtitle from '../atoms/subtitle';
import TalentTooltip, { TooltipWrapper } from '../molecules/talentTooltip';

interface ITalentEditor extends Talent {

}

const TalentEditor = (props: ITalentEditor) => {
    const checkValidity = (key, val) => {
        switch(key) {
            case 'label':
                return val !== null && val.length > 0;
            case 'isActive':
                return typeof val === 'boolean';
            default:
                return val !== null;
        }
    }

    const [values, setValues] = useState(props);
    const [validObj, setValidObj] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const obj = {};
        for (const [k, v] of Object.entries(values)) {
            obj[k] = checkValidity(k, v);
        }
        setValidObj(obj);
        console.log(obj);
    }, [values]);

    const isValid = () => !Object.values(validObj).includes(false);

    const getValue = (e) => {
        let val = null;
        switch(e.target.name) {
            case 'isActive':
                val = e.target.checked;
                break;
            default:
                val = e.target.value;
                break;
        }
        return val;
    }

    const changeHandler = e => {
        setValues(prev => {
            return {...prev, [e.target.name]: getValue(e)}
        })
    }

    const cancel = () => dispatch(setActiveTalent(null));

    const valid = isValid();

    const save = () => {
        if (valid) {
            dispatch(updateTalent(values));
            dispatch(setActiveTalent(null));
        }
    }

    return (
        <TalentEditorContainer>
            <TalentEditorBody>
                <TalentEditorForm flexDirection="column" alignItems="start" spaceBetween={8}>
                    <TalentEditorInvalid>{!valid ? 'Invalid inputs detected.' : null}</TalentEditorInvalid>
                    <TalentEditorField flexDirection="row" spaceBetween={4}>
                        <TalentEditorFieldLabel>Talent Name </TalentEditorFieldLabel>
                        <TalentEditorFieldTextInput name="label" value={values.label} setValue={changeHandler} />
                    </TalentEditorField>
                    <TalentEditorField flexDirection="row" spaceBetween={4}>
                        <TalentEditorFieldLabel>Active </TalentEditorFieldLabel>
                        <TalentEditorFieldCheckbox name="isActive" value={values.isActive ? CHECKED : UNCHECKED} callback={changeHandler} />
                    </TalentEditorField>
                    <TalentEditorPreview {...values}/>
                    <TalentEditorActions flexDirection="row" spaceBetween={12}>
                        <TalentEditorButton callback={cancel}>Cancel</TalentEditorButton>
                        <TalentEditorButton disabled={!valid} callback={save}>Save</TalentEditorButton>
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

const TalentEditorInvalid = styled(Subtitle)`
    color: ${COLOR.ERROR};
    font-weight: 700;
`;

const TalentEditorPreview = styled(TalentTooltip)`
    margin-top: 20px;
`;

const TalentEditorField = styled(FlexContainer)`
    color: ${COLOR.WHITE};
`;

const TalentEditorFieldLabel = styled(Subtitle)`
    color: inherit;
    font-weight: 600;
`;

const TalentEditorFieldTextInput = styled(TextInput)`
    border-bottom: 1px solid ${COLOR.WHITE} !important;
    color: inherit;
`;

const TalentEditorFieldCheckbox = styled(Checkbox)``;

const TalentEditorActions = styled(FlexContainer)`
    margin-top: 20px;
`;

const TalentEditorButton = styled(Button)`
    ${p => p.disabled ? `opacity: 0.5;` : ''}
    color: ${COLOR.WHITE};
    padding: 2px 12px;
    border-radius: 12px;
    border: 1px solid ${COLOR.WHITE};

    &:hover {
        color: yellow;
        border-color: yellow;
    }
`;