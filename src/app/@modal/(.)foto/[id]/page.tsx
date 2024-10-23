import { getPhotoById } from "@/actions/photo";
import FeedModal from "@/components/feed/feed-modal";
import { notFound } from "next/navigation";

interface IProps {
    params: { id: string}
}

export async function generateMetadata({params}: IProps){
    const { data } = await getPhotoById(Number(params.id));
    if(!data){
      return {
        title: "Foto",
      }  
    }
    return {
        title: data.photo.title
    }
}

export default async function Foto(props: IProps) {
    const { data } = await getPhotoById(Number(props.params.id));

    if(!data){
        return notFound();
    }

    return (
        <FeedModal photo={data} />
    );
}
