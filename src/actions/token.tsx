"use server";

import { getCookie, setCookie } from "./cookie";

export const API_URL = "https://dogsapi.origamid.dev/json";

export async function authToken(body: {
    username: string;
    password: string;
}){
    try {
        const response = await fetch(`${API_URL}/jwt-auth/v1/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        if(!response.ok) throw new Error("Erro ao autenticar token.");

        const data = await response.json();
        await setCookie("auth_token", data);

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

export async function validateToken(){
    try {
        const responseCookie = await getCookie("auth_token");
        if(!responseCookie.ok) throw new Error("Erro ao buscar token.");
       
        const response = await fetch(`${API_URL}/jwt-auth/v1/token/validate`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${responseCookie.cookie}`,
            },
        })
        if(!response.ok) throw new Error("Erro ao validar token.");
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

