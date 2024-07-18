import { useEffect, useRef } from 'react';

import { VoteModalMainBox } from './VoteModalMain.style';
import { LoadingItem } from './ChartMain.style';

import icCheckbox from '@assets/icons/ic_checkbox.svg';
import icCheckboxActive from '@assets/icons/ic_checkbox_active.svg';

export default function VoteModalMain({
  idolList,
  onClickCheck,
  checkedId,
  observer,
  isLoading,
}) {
  const targetRef = useRef(null);
  useEffect(() => {
    if (observer && targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (observer && targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [observer]);
  return (
    <VoteModalMainBox>
      {!idolList.length ||
        idolList.map((idol, index) => {
          return (
            <li
              key={Date.now() * index}
              className='list-item'
              onClick={() => {
                onClickCheck(idol.id);
              }}>
              <div className='idol'>
                <span className='img'>
                  <img src={idol.profilePicture} />
                </span>
                <span className='rank'>{index + 1}</span>
                <div className='voteWrapper'>
                  <div>
                    <span className='group'>{idol.group}</span>
                    <span className='name'>{idol.name}</span>
                  </div>
                  <span className='votes'>{idol.totalVotes}표</span>
                </div>
              </div>
              <button className='check'>
                <img
                  src={checkedId === idol.id ? icCheckboxActive : icCheckbox}
                />
              </button>
            </li>
          );
        })}
      {isLoading && <LoadingItem />}
      <div ref={targetRef} className='observer'></div>
    </VoteModalMainBox>
  );
}
