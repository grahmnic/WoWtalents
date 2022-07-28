import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useOnClickOutside from '../../helpers/hooks/useOnClickOutside';
import { isEmpty } from '../../helpers/isEmpty';
import { removeTalent, selectTalents, setActiveTalent, updateTalent } from '../../redux/reducers/talents';
import { COLOR } from '../../theme/constants';
import Button from '../atoms/button';
import Checkbox, { CHECKED, UNCHECKED } from '../atoms/checkbox';
import FlexContainer from '../atoms/flexContainer';
import TextInput from '../atoms/input';
import Subtitle from '../atoms/subtitle';
import TextArea from '../atoms/textarea';
import IconSelector from '../molecules/iconSelector';
import { TalentWrapper } from '../molecules/talent';
import TalentTooltip, { TooltipWrapper } from '../molecules/talentTooltip';
import PopperTooltip from '../molecules/tooltip/popperTooltip';

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
    isMelee: false,
    minRange: 0,
    maxRange: 0
}

const TalentEditor = (props: ITalentEditor) => {
    const { id } = props;

    const checkValidity = (key, val) => {
        switch(key) {
            case 'label':
                return !isEmpty(val);
            case 'summary':
                return !isEmpty(val);
            case 'fileId':
                return !isEmpty(val);
            case 'resource':
                return true;
            case 'cost':
                return (val == null || (!isNaN(val) && (val == 0 || !isEmpty(values.resource)))) || !values.isActive;
            case 'minRange':
                return ((val == null || (!isNaN(val) && (val == 0 || (values.maxRange !== null && !isNaN(values.maxRange) && values.maxRange > val)))) || !values.isActive) || values.isMelee;
            case 'maxRange':
                return !isNaN(val) || !values.isActive || values.isMelee;
            case 'castTime':
                return !isNaN(val) || !values.isActive;
            case 'cooldown':
                return !isNaN(val) || !values.isActive;
            case 'charges':
                return !isNaN(val) || !values.isActive;
            case 'isActive':
                return typeof val === 'boolean';
            case 'isMelee':
                return true;
            default:
                return val !== null;
        }
    }

    const [values, setValues] = useState(props as TalentDraft);
    const [editIcon, setEditIcon] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setEditIcon(false));
    const [validObj, setValidObj] = useState<any>({});
    const dispatch = useDispatch();
    const { icons } = useSelector(selectTalents);

    const iconThumbnail = icons[values.fileId] ? icons[values.fileId].value : null;

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
        console.log(values);
    }, [values]);

    const isValid = () => !Object.values(validObj).includes(false);

    const getValue = (e) => {
        let val = null;
        switch(e.target.name) {
            case 'isActive':
                val = e.target.checked;
                break;
            case 'isMelee':
                val = e.target.checked;
                break;
            case 'minRange':
                val = Number(e.target.value);
                break;
            case 'maxRange':
                val = Number(e.target.value);
                break;
            case 'cost':
                val = Number(e.target.value);
                break;
            case 'castTime':
                val = Number(e.target.value);
                break;
            case 'cooldown':
                val = Number(e.target.value);
                break;
            case 'charges':
                val = Number(e.target.value);
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

    const remove = () => {
        dispatch(removeTalent(id));
        dispatch(setActiveTalent(null));
    }

    return (
        <TalentEditorContainer>
            <TalentEditorBody>
                <TalentEditorForm flexDirection="column" alignItems="start" spaceBetween={8}>
                    <TalentEditorInvalid>{!valid ? 'Invalid inputs detected.' : null}</TalentEditorInvalid>
                    <TalentEditorField flexDirection="row" spaceBetween={4}>
                        <TalentEditorFieldLabel required valid={validObj.label}>Talent Name</TalentEditorFieldLabel>
                        <TalentEditorFieldTextInput name="label" value={values.label} setValue={changeHandler} />
                    </TalentEditorField>
                    <TalentEditorField flexDirection="row" alignItems="start" spaceBetween={4}>
                        <TalentEditorFieldLabel valid={validObj.fileId}>Icon</TalentEditorFieldLabel>
                        <PopperTooltip target={<TalentEditorIcon callback={() => setEditIcon(true)}>
                            <TalentEditorTalent src={iconThumbnail} isActive={values.isActive} />
                        </TalentEditorIcon>} placement='right-start' showArrow={false} controlShow={true} showPopper={editIcon}>
                            <div ref={ref}>
                                <IconSelector selectedId={values.fileId} callback={(v) => changeHandler(null, 'fileId', v)} />
                            </div>
                        </PopperTooltip>
                    </TalentEditorField>
                    <TalentEditorField flexDirection="row" spaceBetween={4}>
                        <TalentEditorFieldLabel valid={validObj.isActive}>Active</TalentEditorFieldLabel>
                        <TalentEditorFieldCheckbox name="isActive" value={values.isActive ? CHECKED : UNCHECKED} callback={changeHandler} />
                    </TalentEditorField>
                    {values.isActive &&
                        (<>
                        <TalentEditorField flexDirection="row" spaceBetween={4}>
                            <TalentEditorFieldLabel valid={validObj.cost}>Cost</TalentEditorFieldLabel>
                            <TalentEditorFieldTextInput name="cost" type="number" value={values.cost || 0} setValue={changeHandler} />
                        </TalentEditorField>
                        <TalentEditorField flexDirection="row" spaceBetween={4}>
                            <TalentEditorFieldLabel valid={validObj.resource}>Resource</TalentEditorFieldLabel>
                            <TalentEditorFieldTextInput name="resource" value={values.resource || ''} setValue={changeHandler} />
                        </TalentEditorField>
                        <TalentEditorField flexDirection="row" spaceBetween={4}>
                            <TalentEditorFieldLabel valid={validObj.isMelee}>Melee</TalentEditorFieldLabel>
                            <TalentEditorFieldCheckbox name="isMelee" value={values.isMelee ? CHECKED : UNCHECKED} callback={changeHandler} />
                        </TalentEditorField>
                        {!values.isMelee ? (<>
                            <TalentEditorField flexDirection="row" spaceBetween={4}>
                                <TalentEditorFieldLabel valid={validObj.minRange}>Minimum Range</TalentEditorFieldLabel>
                                <TalentEditorFieldTextInput name="minRange" type="number" value={values.minRange || 0} setValue={changeHandler} />
                            </TalentEditorField>
                            <TalentEditorField flexDirection="row" spaceBetween={4}>
                                <TalentEditorFieldLabel valid={validObj.maxRange}>Maximum Range</TalentEditorFieldLabel>
                                <TalentEditorFieldTextInput name="maxRange" type="number" value={values.maxRange || 0} setValue={changeHandler} />
                            </TalentEditorField>
                        </>).props.children : null}
                        <TalentEditorField flexDirection="row" spaceBetween={4}>
                            <TalentEditorFieldLabel valid={validObj.castTime}>Cast Time</TalentEditorFieldLabel>
                            <TalentEditorFieldTextInput name="castTime" type="number" value={values.castTime || 0} setValue={changeHandler} />
                        </TalentEditorField>
                        <TalentEditorField flexDirection="row" spaceBetween={4}>
                            <TalentEditorFieldLabel valid={validObj.cooldown}>Cooldown</TalentEditorFieldLabel>
                            <TalentEditorFieldTextInput name="cooldown" type="number" value={values.cooldown || 0} setValue={changeHandler} />
                        </TalentEditorField>
                        <TalentEditorField flexDirection="row" spaceBetween={4}>
                            <TalentEditorFieldLabel valid={validObj.charges}>Charges</TalentEditorFieldLabel>
                            <TalentEditorFieldTextInput name="charges" type="number" value={values.charges || 0} setValue={changeHandler} />
                        </TalentEditorField>
                        </>).props.children
                    }
                    <TalentEditorField flexDirection="row" alignItems="start" spaceBetween={4}>
                        <TalentEditorFieldLabel required valid={validObj.summary}>Summary</TalentEditorFieldLabel>
                        <TalentEditorFieldTextArea rows={6} cols={50} name="summary" value={values.summary || ''} setValue={changeHandler} />
                    </TalentEditorField>
                    <TalentEditorPreviewWrapper flexDirection="row" alignItems="start" spaceBetween={12}>
                        <TalentEditorPreviewIconWrapper>
                            <TalentEditorPreviewIcon src={iconThumbnail} isActive={values.isActive} />
                        </TalentEditorPreviewIconWrapper>
                        <TalentEditorPreview {...values}/>
                    </TalentEditorPreviewWrapper>
                    <TalentEditorActions flexDirection="row" spaceBetween={12}>
                        <TalentEditorButton callback={cancel}>Cancel</TalentEditorButton>
                        <TalentEditorButton disabled={!valid} callback={save}>Save</TalentEditorButton>
                        <TalentEditorButton callback={remove} isImportant>Delete Permanently</TalentEditorButton>
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

const TalentEditorPreview = styled(TalentTooltip)``;

const TalentEditorField = styled(FlexContainer)`
    color: ${COLOR.WHITE};
`;

const TalentEditorPreviewWrapper = styled(FlexContainer)`
    margin-top: 20px;
`;

const TalentEditorPreviewIconWrapper = styled.div`\
    width: 56px;
    height: 56px;
    background: url(https://wow.zamimg.com/images/Icon/large/border/default.png);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    padding: 5px;
`;

const TalentEditorPreviewIcon = styled(TalentWrapper)``;

const TalentEditorIcon = styled(Button)`
    width: 40px;
    height: 40px;
    background: url(https://wow.zamimg.com/images/Icon/large/border/default.png);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    padding: 4px;
`;

const TalentEditorTalent = styled(TalentWrapper)``;

const TalentEditorFieldLabel = styled(Subtitle)<{ required?: boolean; valid: boolean }>`
    color: ${p => !p.valid ? 'red' : 'inherit'};
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

const TalentEditorButton = styled(Button)<{ isImportant?: boolean; }>`
    ${p => p.disabled ? `opacity: 0.5;` : ''}
    color: ${COLOR.WHITE};
    padding: 2px 12px;
    border-radius: 12px;
    border: 1px solid ${COLOR.WHITE};

    ${p => !p.disabled ? `
        &:hover {
            color: ${p.isImportant ? 'red' : 'yellow'};
            border-color: ${p.isImportant ? 'red' : 'yellow'};
        }
    ` : `
        cursor: not-allowed !important;
    `}
`;