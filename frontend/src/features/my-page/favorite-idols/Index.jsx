import { Fragment } from 'react';
import styled from 'styled-components';

import useMyPageState from '@pages/my-page/hooks/useMyPageState';
import deleteIcon from '@assets/icons/ic_delete.svg';
import { SubTitle, Item, Img, Texts, Name, Group } from '@styles/MyPageStyles';
import { media } from '@utils';

const S = {
  Items: styled.ul`
    ${() => media.base`
      overflow: auto hidden;
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: ${108};
      grid-template-rows: ${160};
      align-items: center;
      justify-items: center;
      column-gap: ${16};
      padding: ${16} ${24};
    `}
  `,
  ImgWrap: styled.picture`
    ${({ theme }) => media.base`
      width: ${90};
      border: 2px solid ${theme.colors.BRAND[100]};
      border-radius: 50%;
      overflow: hidden;
      padding: ${7};
    `}
  `,
  Delete: styled.img`
    ${() => media.base`
      cursor: pointer;
      position: absolute;
      left: 75%;
      top: 5%;
      z-index: 1;
    `}
  `,
};

export default function Index() {
  const {
    FavoriteState: { state: favoriteState, delete: favoriteDelete },
  } = useMyPageState();

  const handleClick = e => {
    const { currentTarget } = e;
    const id = Number(currentTarget.id.substring(currentTarget.id.indexOf('-') + 1));
    favoriteDelete(id);
  };

  return (
    <section>
      <SubTitle>관심 있는 아이돌</SubTitle>
      <S.Items>
        {favoriteState?.map(({ id, profilePicture, name, group }) => (
          <Fragment key={id}>
            <Item>
              <S.ImgWrap>
                <Img src={profilePicture} />
                <S.Delete id={id} src={deleteIcon} onClick={handleClick} />
              </S.ImgWrap>
              <Texts>
                <Name>{name}</Name>
                <Group>{group}</Group>
              </Texts>
            </Item>
          </Fragment>
        ))}
      </S.Items>
    </section>
  );
}
