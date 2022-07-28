// LIBRARIES
import React, { useRef } from 'react';
import styled from 'styled-components';
import useOnClickOutside from '../../helpers/hooks/useOnClickOutside';
import { generateId } from '../../helpers/generateId';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { clearDraft, selectTalents, setActiveTalent } from '../../redux/reducers/talents';

// COMPONENTS
import FlexContainer from '../atoms/flexContainer';
import Talent from '../molecules/talent';
import { COLOR } from '../../theme/constants';
import Modal from '../molecules/modal';
import TalentEditor from '../organisms/talentEditor';
import Button from '../atoms/button';

const Talents = (props) => {
    const dispatch = useDispatch();
    const { talents: talentList, loaded, icons, activeTalent } = useSelector(selectTalents);

    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => dispatch(setActiveTalent(null)));

    const talents = loaded ? talentList.map((talent, index) =>
        <TalentButton key={index} callback={() => dispatch(setActiveTalent(talent.id))}>
            <TalentButtonTalent
                thumbnailUrl={icons[talent.fileId].value}
                {...talent}/>
        </TalentButton>) : null;

    const handleNewTalent = () => {
        dispatch(setActiveTalent(generateId()));
    }

    return (
        <TalentsContainer flexDirection="column" alignItems="start" spaceBetween={8}>
            <TalentsHeader flexDirection="row" spaceBetween={12}>
                Talents
                <TalentsAddNew callback={handleNewTalent}>
                    <FontAwesomeIcon
                        width={20}
                        size="1x"
                        icon={faPlusSquare}
                    />
                </TalentsAddNew>
            </TalentsHeader>
            <TalentsWrapper justifyContent="start" alignItems="stretch" spaceBetween={8}>
                {talents}
            </TalentsWrapper>
            {activeTalent && <Modal>
                <ModalWrapper ref={ref}>
                    <TalentEditor {...activeTalent} />
                </ModalWrapper>
            </Modal>}
        </TalentsContainer>
    )
}

export default Talents;

/*-----------------STYLES-----------------*/
const TalentsContainer = styled(FlexContainer)`
    padding: 40px;
`;

const TalentsHeader = styled(FlexContainer)`
    font-weight: 700;
    font-size: 24px;
    color: ${COLOR.WHITE};
`;

const TalentsAddNew = styled(Button)`
    color: ${COLOR.WHITE};
    width: 20px;
    height: 20px;
`;

const TalentsWrapper = styled(FlexContainer)`
    padding: 20px;
    background-image: linear-gradient(315deg, #111111 0%, #28282B 74%);
    border-radius: 4px;
    border: 1px solid #28282B;
`;

const TalentButton = styled(Button)`
    width: 40px;
    height: 40px;
    background: url(https://wow.zamimg.com/images/Icon/large/border/default.png);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    padding: 4px;
`;

const TalentButtonTalent = styled(Talent)`
`;

const ModalWrapper = styled.div``;