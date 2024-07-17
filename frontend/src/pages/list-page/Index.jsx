import {
  IdolFunding,
  IdolFundingModal,
  Credit,
  ChartOfTheMonth,
} from '@features';
import { useState } from 'react';
import { Header } from '../../features';

export default function Index() {
  const [idolFundingModal, setIdolFundingModal] = useState(false);
  const handleIdolFundingModal = () => setIdolFundingModal(prev => !prev);

  return (
    <main>
      <Header />
      <Credit />
      <IdolFunding onFundingClick={handleIdolFundingModal} />
      {idolFundingModal && (
        <IdolFundingModal onFundingClick={handleIdolFundingModal} />
      )}
      <ChartOfTheMonth></ChartOfTheMonth>
    </main>
  );
}
