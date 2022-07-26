// LIBRARIES
import React, { useRef } from 'react';
import styled from 'styled-components';
import useOnClickOutside from '../../helpers/hooks/useOnClickOutside';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { selectTalents, setActiveTalent } from '../../redux/reducers/talents';

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
            <Talent
                thumbnailUrl={icons[talent.fileId].value}
                {...talent}/>
        </TalentButton>) : null;

    return (
        <TalentsContainer flexDirection="column" alignItems="start" spaceBetween={8}>
            Talents
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
    font-weight: 700;
    font-size: 24px;
    color: ${COLOR.WHITE};
`;

const TalentsWrapper = styled(FlexContainer)`
    padding: 20px;
    background-image: linear-gradient(315deg, #111111 0%, #28282B 74%);
    border-radius: 4px;
    border: 1px solid #28282B;
`;

const TalentButton = styled(Button)``;

const ModalWrapper = styled.div``;