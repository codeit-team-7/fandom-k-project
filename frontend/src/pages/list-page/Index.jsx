import { FavoriteIdol, Credit, ChargeCredit } from "@features";
import { useState } from "react";
import { Header } from "../../features";

export default function Index() {
  const [chargeModal, setChargeModal] = useState(false);

  const handleChargeModal = () => {
    setChargeModal(chargeModal ? false : true);

    document.body.style.overflow = chargeModal ? "auto" : "hidden";
  };

  return (
    <main>
      {chargeModal && <ChargeCredit onChargeClick={handleChargeModal} />}
      <Header />
      <Credit onChargeClick={handleChargeModal} />
      <FavoriteIdol />
      <section>리스트</section>
    </main>
  );
}
