import { Credit, ChargeCredit, ChartOfTheMonth } from "@features";
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
      <ChartOfTheMonth></ChartOfTheMonth>
    </main>
  );
}
