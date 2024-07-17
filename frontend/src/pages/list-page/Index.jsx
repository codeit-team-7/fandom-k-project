import {
  IdolFunding,
  IdolFundingModal,
  Credit,
  ChargeCredit,
  ChartOfTheMonth,
} from '@features';
import { useState } from 'react';
import { Header } from '../../features';

export default function Index() {
  const [chargeModal, setChargeModal] = useState(false);
  const [idolFundingModal, setIdolFundingModal] = useState(false);
  const handleChargeModal = () => {
    setChargeModal(chargeModal ? false : true);

    document.body.style.overflow = chargeModal ? 'auto' : 'hidden';
  };
  const handleIdolFundingModal = () => setIdolFundingModal(prev => !prev);

  return (
    <main>
      {chargeModal && <ChargeCredit onChargeClick={handleChargeModal} />}
      <Header />
      <Credit onChargeClicknpm={handleChargeModal} />
      <IdolFunding onFundingClick={handleIdolFundingModal} />
      {idolFundingModal && (
        <IdolFundingModal onFundingClick={handleIdolFundingModal} />
      )}
      <ChartOfTheMonth></ChartOfTheMonth>
    </main>
  );
}
