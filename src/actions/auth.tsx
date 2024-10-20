"use server";

import { PASSWORD_LOST, PASSWORD_RESET, TOKEN_POST, TOKEN_VALIDATE_POST } from "@/api";
import { getCookie, setCookie } from "./cookie";
import { getUser } from "./user";

export async function login(body: {
    username: string;
    password: string;
}){
    try {
        const { url, options } = TOKEN_POST(body);
        const response = await fetch(url, options)

        if(!response.ok) {
            const json = await response.json();
            throw new Error(`Erro ao autenticar usuário. ${json.message}`);
        }

        const data = await response.json();
        await setCookie("token", data.token);

        return getUser();

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
        const responseCookie = await getCookie("token");
        if(!responseCookie.ok) throw new Error("Erro ao buscar token.");
       
        const { url, options } = TOKEN_VALIDATE_POST(responseCookie.cookie?.value);
        const response = await fetch(url, options)
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

export async function lostPassword({login, redirectUrl}:{login: string; redirectUrl: string}){
    try {
        const { url, options } = PASSWORD_LOST({
            login,
            url: redirectUrl,
        });
        const response = await fetch(url, options)
        if(!response.ok) throw new Error("Erro ao solicitar recuperação de senha.");

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

export async function resetPassword({login, key, password}:{login: string; key: string, password: string}){
    try {
        const { url, options } = PASSWORD_RESET({
            login,
            key,
            password,
        });
        const response = await fetch(url, options)
        if(!response.ok) throw new Error("Erro ao resetar senha.");

        return {
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
