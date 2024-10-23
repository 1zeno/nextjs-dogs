import { getPhotos } from "@/actions/photo";
import { getUser } from "@/actions/user";
import Feed from "@/components/feed/feed";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Minha conta",
};

export default async function Conta() {
    const { data:user } = await getUser();

    const initialParams = {
        page: 1,
        total: 3,
        user: user?.username,
    }
    const response = await getPhotos(initialParams);
    return (
        <>
            {response.data && response.data.length > 0 ? (
                <Feed data={response.data} params={initialParams} />
            ):(
                <>
                    <p style={{marginBottom: "1rem", fontSize: "1.25rem", color: "#444"}}>Nenhum item encontrado.</p>
                    <Link href={"/conta/postar"} className="button">Postar foto</Link>
                </>
            )}
        </>
    );
}
