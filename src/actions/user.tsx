"use server";

import { USER_GET, USER_POST } from "@/api";
import { getCookie } from "./cookie";

export type Usuario = {
    id?: string;
    username: string;
    email: string;
}

export async function createUser(formData: FormData){

    const usuario = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    try {
        const {url, options} = USER_POST(usuario);
        const response = await fetch(url, options)
        const data = await response.json();
        console.log("data", data);
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

export async function getUser() {
    try {
        const responseCookie = await getCookie("token");
        if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

        const {url, options} = USER_GET(responseCookie.cookie?.value);
        const response = await fetch(url, options)

        if(!response.ok) throw new Error("Erro ao buscar usuário.");

        const data: Usuario = await response.json();
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