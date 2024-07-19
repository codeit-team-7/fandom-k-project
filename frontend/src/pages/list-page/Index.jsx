import { IdolFunding, Credit, ChartOfTheMonth } from '@features';

export default function Index() {
  return (
    <main>
      <Credit />
      <IdolFunding />
      <ChartOfTheMonth></ChartOfTheMonth>
    </main>
  );
}
