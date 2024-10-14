"use server";

import { getCookie } from "./cookie";

export const API_URL = "https://dogsapi.origamid.dev/json";

export async function createUser(id: string, body: {comment: string}){
    const responseCookie = await getCookie("auth_token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    try {
        const response = await fetch(`${API_URL}/api/comment/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${responseCookie.cookie}`,
            },
            body: JSON.stringify(body),
        })
        if(!response.ok) throw new Error("Erro ao adicionar usuário.");
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