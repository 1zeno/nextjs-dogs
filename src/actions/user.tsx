"use server";

import { USER_GET, USER_POST } from "@/functions/api";
import { getCookie } from "./cookie";
import apiError from "@/functions/api-error";
import {login} from "./auth";

export type Usuario = {
    id: number;
    username: string;
    email: string;
}

export async function createUser(state: {}, formData: FormData){
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        if(!username || !password || !email) {
            throw new Error("Preencha os dados.");
        }
        const {url} = USER_POST();
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        if(!response.ok) throw new Error("Erro ao criar usuário. Email ou usuário já existe.");

        const { ok } = await login({ok: true, error: ""}, formData);
        if(!ok) throw new Error("Error ao tentar fazer login.");

        return {
            data: null,
            ok: true,
            error: "",
        };
    } catch (error: unknown) {
        return apiError(error);
    }
}

export async function getUser() {
    try {
        const responseCookie = await getCookie("token");
        if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

        const {url} = USER_GET();
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${responseCookie.cookie?.value}`,
            },
            next: {revalidate: 60}
        })

        if(!response.ok) throw new Error("Erro ao buscar usuário.");

        const data: Usuario = await response.json();
        return {
            data,
            ok: true,
            error: "",
        };
    } catch (error: unknown) {
        return apiError(error);
    }
}