import { VoteModalMainBox } from "./VoteModalMain.style";
import icCheckbox from "@assets/icons/ic_checkbox.svg";
import icCheckboxActive from "@assets/icons/ic_checkbox_active.svg";
export default function VoteModalMain({ idolList }) {
  return (
    <VoteModalMainBox>
      {!idolList.length ||
        idolList.map((idol, index) => {
          return (
            <li key={Date.now() * index} className="list-item">
              <div className="idol">
                <span className="img">
                  <img src={idol.profilePicture} />
                </span>
                <span className="rank">{index + 1}</span>
                <div className="voteWrapper">
                  <div>
                    <span className="group">{idol.group}</span>
                    <span className="name">{idol.name}</span>
                  </div>
                  <span className="votes">{idol.totalVotes}표</span>
                </div>
              </div>
              <button class="check">
                <img src={icCheckbox} />
              </button>
            </li>
          );
        })}
    </VoteModalMainBox>
  );
}
