import PropTypes from 'prop-types';
import { StyledSection } from './Index.styles';
import check from '@assets/icons/ic_check.svg';

export default function Index({
  store,
  state,
  handleClick,
  handleChoose,
  handleScroll,
}) {
  const { items } = state;
  let newItems = [...items];

  if (items.length < state.pageSize) {
    Array(8 - newItems.length)
      .fill(0)
      .forEach((_, index) => {
        newItems.push({
          id: 'dummy',
          key: `dummy-${index}`,
        });
      });
  }

  return (
    <StyledSection>
      <h1 className='title'>관심 있는 아이돌을 추가해보세요</h1>
      <div className='content-wrap'>
        <button
          id='prev'
          className={`${state.currentCursorIndex < 1 && 'hidden'}`}
          onClick={handleClick}>
          {'<'}
        </button>
        <div className='items-wrap'>
          <ul id='items' className='items' onScroll={handleScroll}>
            {newItems.map(item =>
              item.id !== 'dummy' ? (
                <li className='item' key={item.id} onClick={handleChoose}>
                  <picture
                    className={`item-picture ${
                      store?.some(storeItem => storeItem.id === item.id) &&
                      'active'
                    }`}
                    data-id={item.id}>
                    <img
                      className='item-img'
                      src={item.profilePicture}
                      alt=''
                    />
                    <img className='item-img__check' src={check} alt='' />
                  </picture>
                  <div className='item-box'>
                    <p>{item.name}</p>
                    <p>{item.group}</p>
                  </div>
                </li>
              ) : (
                <li className='dummy' key={item.key}></li>
              ),
            )}
          </ul>
        </div>
        <button
          id='next'
          className={`${
            state.cursors.length < 2 ||
            (state.cursors[state.currentCursorIndex + 1] === null && 'hidden')
          }`}
          onClick={handleClick}>
          {'>'}
        </button>
      </div>
    </StyledSection>
  );
}

Index.propTypes = {
  store: PropTypes.array,
  state: PropTypes.object,
  handleClick: PropTypes.func,
  handleChoose: PropTypes.func,
  handleScroll: PropTypes.func,
};
