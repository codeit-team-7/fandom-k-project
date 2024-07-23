import { Fragment } from 'react';
import styled from 'styled-components';

import useMyPageState from '@pages/my-page/hooks/useMyPageState';
import deleteIcon from '@assets/icons/ic_delete.svg';
import { media } from '@utils';

const Section = styled.section`
  padding: 1rem;
`;

const SubTitle = styled.h4`
  ${({ theme }) => `
    ${media.base`
      padding: 0 ${24};
      font-weight: 700;
    `}

    ${media.md`
      font-size: ${theme.fontSize.XLG};
    `}
  `}
`;

const Items = styled.ul`
  ${() => media.base`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${140};
  column-gap: ${24};
  padding: ${32} ${24};
  overflow: auto hidden;
  
  &::-webkit-scrollbar {
    width: 100%;
    height: ${5};
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a0a0a5;
    border-radius: ${10};
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`}
`;

const Item = styled.li`
  ${() => media.base`
  position: relative;
  width: fit-content;
`}
`;

const ImgWrap = styled.picture`
  ${({ theme }) => media.base`
  overflow: hidden;
  max-width: ${140};
  width: 100%;
  border: 2px solid ${theme.colors.BRAND[100]};
  border-radius: 50%;
  padding: ${7};
`}
`;

const Img = styled.img`
  max-width: ${120};
  width: 100%;
  border: none;
  border-radius: inherit;
`;

const Delete = styled.img`
  ${() => media.base`
  position: absolute;
  top: 5%;
  right: 5%;
  scale: 1.5;
  cursor: pointer;
`}
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.p`
  font-weight: 700;
`;

const Group = styled.p`
  opacity: 0.6;
`;

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
    <Section>
      <SubTitle>관심 있는 아이돌</SubTitle>
      <Items>
        {favoriteState?.map(({ id, profilePicture, name, group }) => (
          <Fragment key={id}>
            <Item>
              <ImgWrap>
                <Img src={profilePicture} />
                <Delete id={id} src={deleteIcon} onClick={handleClick} />
              </ImgWrap>
              <Texts>
                <Name>{name}</Name>
                <Group>{group}</Group>
              </Texts>
            </Item>
          </Fragment>
        ))}
      </Items>
    </Section>
  );
}
