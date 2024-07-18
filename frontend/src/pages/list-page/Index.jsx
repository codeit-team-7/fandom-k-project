import { IdolFunding, Credit, ChartOfTheMonth } from "@features";
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
      <Header />
      <Credit onChargeClick={handleChargeModal} />
      <IdolFunding />
      <ChartOfTheMonth></ChartOfTheMonth>
    </main>
  );
}
