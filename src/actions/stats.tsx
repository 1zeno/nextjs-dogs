"use server";

import { STATS_GET } from "@/functions/api";
import { getCookie } from "./cookie";

export async function getStats() {
    const responseCookie = await getCookie("token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    try {

        const { url, options } = STATS_GET(responseCookie.cookie?.value)
        const response = await fetch(url, options)

        if(!response.ok) throw new Error("Erro ao buscar status.");

        const data = await response.json();
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