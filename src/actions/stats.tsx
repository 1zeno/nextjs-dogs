"use server";

import { getCookie } from "./cookie";

export const API_URL = "https://dogsapi.origamid.dev/json";

export async function getStats() {
    const responseCookie = await getCookie("auth_token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    try {
        const response = await fetch(`${API_URL}/api/stats`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${responseCookie.cookie}`,
            },
        })

        if(!response.ok) throw new Error("Erro ao buscar usuário.");

        const data = await response.json();
        return data;
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