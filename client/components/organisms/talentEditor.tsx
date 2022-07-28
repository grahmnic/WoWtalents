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
import TextArea from '../atoms/textarea';
import IconSelector from '../molecules/iconSelector';
import TalentTooltip, { TooltipWrapper } from '../molecules/talentTooltip';

interface ITalentEditor extends TalentDraft {
    id: string;
}

const iterator: TalentDraft = {
    label: '',
    fileId: '',
    summary: '',
    ranks: 0,
    isActive: false,
    cost: 0,
    cooldown: 0,
    castTime: 0,
    charges: 0,
    resource: '',
    minRange: 0,
    maxRange: 0
}

const TalentEditor = (props: ITalentEditor) => {
    const { id } = props;

    const isEmpty = (v: string) => v == null || v.length == 0;

    const checkValidity = (key, val) => {
        switch(key) {
            case 'label':
                return !isEmpty(val);
            case 'resource':
                return true;
            case 'cost':
                return !isNaN(val) || !values.isActive;
            case 'minRange':
                return !isNaN(val) || !values.isActive;
            case 'maxRange':
                return !isNaN(val) || !values.isActive;
            case 'castTime':
                return !isNaN(val) || !values.isActive;
            case 'cooldown':
                return !isNaN(val) || !values.isActive;
            case 'charges':
                return !isNaN(val) || !values.isActive;
            case 'isActive':
                return typeof val === 'boolean';
            default:
                return val !== null;
        }
    }

    const [values, setValues] = useState(props as TalentDraft);
    const [validObj, setValidObj] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const obj = {};
        const clone = structuredClone(iterator);
        for (const [k, v] of Object.entries(values)) {
            obj[k] = checkValidity(k, v);
            delete clone[k];
        }
        for (const k of Object.keys(clone)) {
            obj[k] = checkValidity(k, null);
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

    const changeHandler = (e?, name?, value?) => {
        setValues(prev => {
            return {...prev, [e ? e.target.name : name]: (e ? getValue(e) : value)}
        })
    }

    const cancel = () => dispatch(setActiveTalent(null));

    const valid = isValid();

    const save = () => {
        if (valid) {
            const talent = {id, ...values} as Talent;
            dispatch(updateTalent(talent));
            dispatch(setActiveTalent(null));
        }
    }

    return (
        <TalentEditorContainer>
            <TalentEditorBody>
                <TalentEditorForm flexDirection="column" alignItems="start" spaceBetween={8}>
                    <TalentEditorInvalid>{!valid ? 'Invalid inputs detected.' : null}</TalentEditorInvalid>
                    <TalentEditorField flexDirection="row" spaceBetween={4}>
                        <TalentEditorFieldLabel required>Talent Name</TalentEditorFieldLabel>
                        <TalentEditorFieldTextInput name="label" value={values.label} setValue={changeHandler} />
                    </TalentEditorField>
                    <TalentEditorField flexDirection="row" spaceBetween={4}>
                        <TalentEditorFieldLabel>Icon</TalentEditorFieldLabel>
                        <IconSelector callback={(v) => changeHandler(null, 'fileId', v)} />
                    </TalentEditorField>
                    <TalentEditorField flexDirection="row" spaceBetween={4}>
                        <TalentEditorFieldLabel>Active</TalentEditorFieldLabel>
                        <TalentEditorFieldCheckbox name="isActive" value={values.isActive ? CHECKED : UNCHECKED} callback={changeHandler} />
                    </TalentEditorField>
                    {values.isActive &&
                        (<>
                        <TalentEditorField flexDirection="row" spaceBetween={4}>
                            <TalentEditorFieldLabel>Cost</TalentEditorFieldLabel>
                            <TalentEditorFieldTextInput name="cost" value={values.cost} setValue={changeHandler} />
                        </TalentEditorField>
                        <TalentEditorField flexDirection="row" spaceBetween={4}>
                            <TalentEditorFieldLabel>Resource</TalentEditorFieldLabel>
                            <TalentEditorFieldTextInput name="resource" value={values.resource} setValue={changeHandler} />
                        </TalentEditorField>
                        <TalentEditorField flexDirection="row" spaceBetween={4}>
                            <TalentEditorFieldLabel>Minimum Range</TalentEditorFieldLabel>
                            <TalentEditorFieldTextInput name="minRange" value={values.minRange} setValue={changeHandler} />
                        </TalentEditorField>
                        <TalentEditorField flexDirection="row" spaceBetween={4}>
                            <TalentEditorFieldLabel>Maximum Range</TalentEditorFieldLabel>
                            <TalentEditorFieldTextInput name="maxRange" value={values.maxRange} setValue={changeHandler} />
                        </TalentEditorField>
                        <TalentEditorField flexDirection="row" spaceBetween={4}>
                            <TalentEditorFieldLabel>Cast Time</TalentEditorFieldLabel>
                            <TalentEditorFieldTextInput name="castTime" value={values.castTime} setValue={changeHandler} />
                        </TalentEditorField>
                        <TalentEditorField flexDirection="row" spaceBetween={4}>
                            <TalentEditorFieldLabel>Cooldown</TalentEditorFieldLabel>
                            <TalentEditorFieldTextInput name="cooldown" value={values.cooldown} setValue={changeHandler} />
                        </TalentEditorField>
                        <TalentEditorField flexDirection="row" spaceBetween={4}>
                            <TalentEditorFieldLabel>Charges</TalentEditorFieldLabel>
                            <TalentEditorFieldTextInput name="charges" value={values.charges} setValue={changeHandler} />
                        </TalentEditorField>
                        </>).props.children
                    }
                    <TalentEditorField flexDirection="row" alignItems="start" spaceBetween={4}>
                        <TalentEditorFieldLabel required>Summary</TalentEditorFieldLabel>
                        <TalentEditorFieldTextArea rows={6} cols={50} name="summary" value={values.summary} setValue={changeHandler} />
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

const TalentEditorFieldLabel = styled(Subtitle)<{ required?: boolean }>`
    color: inherit;
    font-weight: 600;
    margin-right: 8px;

    ${p => p.required ? `
        &:after {
            content: "*";
            color: red;
        }
    ` : ''}
`;

const TalentEditorFieldTextInput = styled(TextInput)`
    border-bottom: 1px solid ${COLOR.WHITE} !important;
    color: inherit;
`;

const TalentEditorFieldTextArea = styled(TextArea)`
    background: rgba(0, 0, 0, 0.4);
    color: inherit;
    resize: none;
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