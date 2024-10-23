import { getStats } from "@/actions/stats";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const UserStatsGraphs = dynamic(()=> import("@/components/user/user-stats-graphs"), {
    loading: () => <p>Carregando...</p>,
    ssr: false,
})

export const metadata: Metadata = {
    title: "Estatísticas | Minha conta",
}

export default async function Estatisticas() {
    const response = await getStats();

    if(!response.data){
        return null;
    }
    return (
        <section>
            <UserStatsGraphs data={response.data} />
        </section>
    );
}
