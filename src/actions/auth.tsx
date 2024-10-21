"use server";

import { PASSWORD_LOST, PASSWORD_RESET, TOKEN_POST, TOKEN_VALIDATE_POST } from "@/functions/api";
import { getCookie, setCookie } from "./cookie";
import apiError from "@/functions/api-error";
import { redirect } from "next/navigation";

export async function login(state: {}, formData: FormData) {

    const username = formData.get("username") as string | null
    const password = formData.get("password") as string | null

    try {
        if(!username || !password) {
            throw new Error("Preencha os dados.");
        }
        const { url } = TOKEN_POST();
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        })

        if(!response.ok) {
            throw new Error("Erro ao autenticar usuário. Verifique se os dados estão corretos.");
        }

        const data = await response.json();
        const oneDay = 60 * 60 * 24;
        await setCookie("token", data.token, oneDay);

        return {
            data,
            ok: true,
            error: "",
        };

    } catch (error: unknown) {
        return apiError(error);
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

export async function lostPassword(state: {}, formData: FormData){
    const login = formData.get("login") as string | null
    const urlPerdeu = formData.get("url") as string | null
    try {
        if(!login) {
            throw new Error("Preencha os dados.");
        }
        const { url } = PASSWORD_LOST();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login,
                url: urlPerdeu,
            }),
        })
        if(!response.ok) throw new Error("Erro ao solicitar recuperação de senha.");

        const data = await response.json();
        return {
            data,
            ok: true,
            error: "",
        };

    } catch (error: unknown) {
        return apiError(error);
    }
}

export async function resetPassword(state: {}, formData: FormData){
    const login = formData.get("login") as string | null
    const key = formData.get("key") as string | null
    const password = formData.get("password") as string | null

    try {
        const { url, options } = PASSWORD_RESET({
            login,
            key,
            password,
        });
        const response = await fetch(url, options)
        if(!response.ok) throw new Error("Erro ao resetar senha.");
    } catch (error: unknown) {
        return apiError(error);
    }

    redirect("/login");
}
