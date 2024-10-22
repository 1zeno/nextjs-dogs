import { getPhotos } from "@/actions/photo";
import Feed from "@/components/feed/feed";

export default async function Home() {
  const initialParams = {
    page: 1,
    total: 3,
    user: 0,
}
  const { data } = await getPhotos(initialParams);
  return (
    <section className="container mainContainer">
      {data && <Feed data={data} params={initialParams}/>}
    </section>
  );
}
