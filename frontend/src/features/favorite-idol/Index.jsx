import PropTypes from 'prop-types';
import { StyledSection } from './Index.styles';
import deleteIcon from '@assets/icons/ic_delete.svg';

export default function Index({ store, handleChoose }) {
  console.log(store);
  return (
    <StyledSection>
      <h1 className='title'>내가 관심있는 아이돌</h1>
      <div className='items-wrap'>
        <ul id='items' className='items'>
          {store &&
            store.map(item => (
              <li className='item' key={item.id} onClick={handleChoose}>
                <img className='item-delete' src={deleteIcon} alt='' />
                <picture className='item-picture' data-id={item.id}>
                  <img className='item-img' src={item.profilePicture} alt='' />
                </picture>
                <div className='item-box'>
                  <p>{item.name}</p>
                  <p>{item.group}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </StyledSection>
  );
}

Index.propTypes = {
  store: PropTypes.array,
  handleChoose: PropTypes.func,
};
