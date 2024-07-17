import { IdolListUl } from "./ChartIdolList.style";

export default function ChartIdolList({ idolList, showItemNum }) {
  const showList = idolList.slice(0, showItemNum);
  return (
    <IdolListUl>
      {showList?.length > 0 &&
        showList.map((idol, index) => {
          return (
            <li key={Date.now() * index} className="list-item">
              <div className="idol">
                <span className="img">
                  <img src={idol.profilePicture} />
                </span>
                <span className="rank">{index + 1}</span>
                <span className="group">{idol.group}</span>
                <span className="name">{idol.name}</span>
              </div>
              <span className="votes">{idol.totalVotes}표</span>
            </li>
          );
        })}
    </IdolListUl>
  );
}
