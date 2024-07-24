import styled from 'styled-components';

import { useContextSelector } from './common/hooks';
import { media } from '@utils';
import icDelete from '@assets/icons/ic_delete.svg';

const Section = styled.section`
  ${({ theme }) =>
    media.base`
      padding: ${24};

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

      .card-delete {
        cursor: pointer;
        position: absolute;
        transform: translate(350%, -380%);
        scale: 1.3;
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

export default function FavoriteList({ favoriteState, handleClick }) {
  const {
    InfoContext: { state: infoState },
    DataContext: { state: dataState },
  } = useContextSelector();

  return (
    <Section>
      <div className='container'>
        <h3 className='subtitle'>관심 있는 아이돌</h3>
        <div className='card-wrap'>
          <ul className='card-items'>
            {favoriteState?.map(({ id, profilePicture, name, group }) => (
              <li className='card-item' key={id}>
                <div className='card-header'>
                  <img className='card-image' src={profilePicture} alt='' />
                  <img className='card-delete' id={id} src={icDelete} alt='' onClick={handleClick} />
                </div>
                <div className='card-body'>
                  <p className='card-name'>{name}</p>
                  <p className='card-group'>{group}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
