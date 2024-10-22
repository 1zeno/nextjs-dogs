import { getPhotos } from "@/actions/photo";
import { getUser } from "@/actions/user";
import Feed from "@/components/feed/feed";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Minha conta",
};

export default async function Conta() {
    const { data:user } = await getUser();

    const initialParams = {
        page: 1,
        total: 3,
        user: user ? user.id : 0,
    }
    const response = await getPhotos(initialParams);
    return (
        <>
            {response.data && response.data.length > 0 ? (
                <Feed data={response.data} params={initialParams} />
            ):(
                <h3>Nenhum item encontrado.</h3>
            )}
        </>
    );
}
