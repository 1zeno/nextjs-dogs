import { getPhotos } from "@/actions/photo";
import Feed from "@/components/feed/feed";

export default async function User({params}: {params: {user: string}}) {
    const {data} = await getPhotos({user: params.user});

    if(!data){
        return null;
    }

    return (
        <section className="container mainSection">
            <h1 className="title">{params.user}</h1>
            <Feed data={data} params={{page: 1, total: 3}} />
        </section>
    );
}
