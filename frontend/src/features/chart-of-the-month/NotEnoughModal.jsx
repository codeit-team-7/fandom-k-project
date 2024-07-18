import { NotEnoughModalBox, ModalButton } from './NotEnoughModal.style';

import icClose from '@assets/icons/btn_delete_24px.svg';

export default function NotEnoughModal({ onClick }) {
  return (
    <NotEnoughModalBox>
      <button className='close-button' onClick={onClick}>
        <img src={icClose} alt='투표창 닫기' />
      </button>
      <div className='bottom-box'>
        <p>
          앗! 투표하기 위한&nbsp;<p className='color-p'>크레딧</p>이 부족해요
        </p>
        <ModalButton onClick={onClick}>확인</ModalButton>
      </div>
    </NotEnoughModalBox>
  );
}
