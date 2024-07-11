import useWidth from "@hooks/use-width/index";
import useFetchIdolData from "./hooks/useFetchIdolData";

export default function Index() {
  const width = useWidth();
  const pageSize = Math.floor(width / 100);
  const { idols } = useFetchIdolData(pageSize);

  return (
    <main>
      <section>
        <h1>내가 좋아하는 아이돌</h1>
        <ul>
          <li></li>
        </ul>
      </section>
      <section>
        <h1>관심 있는 아이돌을 추가해보세요.</h1>
        <ul>
          <li></li>
        </ul>
      </section>
    </main>
  );
}
