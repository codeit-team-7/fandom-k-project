import styled from 'styled-components';

import { useContextSelector } from './common/hooks';
import { media } from '@utils';
import check from '@assets/icons/ic_check.svg';

const Section = styled.section`
  ${({ theme }) =>
    media.base`
      padding: 0 ${24};

      .container {
        width: min(${1920} - ${360}, 100%);
        margin-inline: auto;
      }

      .subtitle {
        font-weight: 700;
        font-size: ${16};
      }

      .card-wrap {
        overflow: auto hidden;
        &::-webkit-scrollbar {
          width: 100%;
          height: ${6};
        }

        &::-webkit-scrollbar-track {
            background: transparent; 
        }

        &::-webkit-scrollbar-thumb {
          background: #888; 
          border-radius: 6px;
        }
      }

      .card-items {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: min-content;
        justify-content: start;
        align-items: center;
        column-gap: ${16};
        height: ${183};
      }

      .card-header {
        position: relative;
        border: ${2} solid ${theme.colors.BRAND[100]};
        border-radius: 50%;
        width: ${88};
        height: ${88};
      }

      .card-image {
        padding: ${6};
        border-radius: inherit;
        object-fit: cover;
      }

      .card-overlay {
        visibility: hidden;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% - ${9});
        height: calc(100% - ${9});
        border-radius: inherit;
        background: rgba(255, 0, 0, 0.3);
        background-image: url(${check});
        background-position: center;
        background-repeat: no-repeat;
      }

      .card-overlay.active {
        visibility: visible;
      }

      .card-body {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .card-name {
        font-weight: 700;
      }
      
      .card-group {
        font-size: ${14};
        opacity: 0.6;
      }

      .btn {
        cursor: pointer;
        display: none;
      }

      .btn.hidden {
        visibility: hidden;
      }
  ` +
    media.sm`
      .subtitle {
        font-size: ${20}; 
      }

      .content-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: ${16};
      }

      .card-items {
        justify-content: start;
        height: ${210};
      }

      .card-header {
        width: ${128};
        height: ${128};
      }

      .btn {
        display: block;
        width: ${29};
        height: ${135};
        font-weight: 700;
        background: #1b1b1b;
        color: white;
      }
  ` +
    media.lg`
      .subtitle {
        font-size: ${24}; 
      }
      .card-header {
        width: ${128};
        height: ${128};
      }
    `}
`;

const splitDataInHarf = data => {
  const mid = Math.floor(data.length / 2);
  return [data.slice(0, mid), data.slice(mid)];
};

const calculateData = (data, pageSize, renderIndex) => {
  if (pageSize === 12) {
    const flatedData = data.flat();
    return splitDataInHarf(flatedData);
  } else {
    const selectedData = [...data[renderIndex]];
    return splitDataInHarf(selectedData);
  }
};

export default function FavoritePick({ favoriteState, handleClick, handleScroll, handlePick }) {
  const {
    InfoContext: { state: infoState },
    DataContext: { state: dataState },
  } = useContextSelector();

  const { pageSize, renderIndex, cursors, cursorIndex } = infoState;
  const { data } = dataState;

  let splitedData;
  let isPrev;
  let isNext;

  if (data.length) {
    splitedData = calculateData(data, pageSize, renderIndex);
    isPrev = renderIndex - 1 >= 0;
    isNext = cursors[cursorIndex + 1] !== null;
  }

  return (
    <Section>
      <div className='container'>
        <h3 className='subtitle'>관심 있는 아이돌</h3>
        <div className='content-wrap'>
          <button id='prev' className={`btn btn-prev ${!isPrev ? 'hidden' : ''}`} onClick={handleClick}>
            {'<'}
          </button>
          <div className='card-wrap' onScroll={handleScroll}>
            {splitedData &&
              splitedData.length > 0 &&
              splitedData.map((subset, ulIndex, ulArr) => {
                return (
                  <ul className='card-items' key={ulIndex}>
                    {subset.map(({ id, profilePicture, name, group }, liIndex, liArr) => {
                      const favorited = favoriteState.find(favorited => favorited.id === id);
                      return (
                        <li className='card-item' key={id}>
                          <div className='card-header'>
                            <img
                              id={id}
                              onClick={handlePick}
                              className='card-image'
                              alt=''
                              src={profilePicture}
                              data-name={name}
                              data-last-component={ulIndex === ulArr.length - 1 && liIndex === liArr.length - 1}
                            />
                            <div className={`card-overlay ${favorited ? 'active' : ''}`}></div>
                          </div>
                          <div className='card-body'>
                            <p className='card-name'>{name}</p>
                            <p className='card-group'>{group}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
          </div>
          <button id='next' className={`btn btn-next ${!isNext ? 'hidden' : ''}`} onClick={handleClick}>
            {'>'}
          </button>
        </div>
      </div>
    </Section>
  );
}
