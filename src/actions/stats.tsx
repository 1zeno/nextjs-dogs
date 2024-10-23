"use server";

import { STATS_GET } from "@/functions/api";
import { getCookie } from "./cookie";

export type StatsData = {
    id: number;
    title: string;
    acessos: string;
}

export async function getStats() {
    const responseCookie = await getCookie("token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    try {

        const { url } = STATS_GET()
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${responseCookie.cookie?.value}`,
            },
            next: {
                revalidate: 60,
            },
        })

        if(!response.ok) throw new Error("Erro ao buscar status.");

        const data: StatsData[] = await response.json();
        return {
            data,
            ok: true,
            error: "",
        };
    } catch (error: unknown) {
        if(error instanceof Error){
            return {
                errors: [error.message],
            }
        }
        return {
            errors: [],
        }
    }
}