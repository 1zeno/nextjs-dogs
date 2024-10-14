"use server";

import { getCookie } from "./cookie";

export const API_URL = "https://dogsapi.origamid.dev/json";

export type Usuario = {
    id?: string;
    username: string;
    email: string;
    password: string;
}

function validarNome(nome: unknown) {
    return typeof nome === "string" && nome.length > 1;
}
function validarPreco(preco: unknown) {
    return typeof preco === "number" && preco > 0;
}

export async function createUser(formData: FormData){

    const usuario: Usuario = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const errors = [];

    if(!validarNome(usuario.username)) errors.push("Nome inválido.");
    if(!validarPreco(usuario.email)) errors.push("Preço inválido.");

    if(errors.length > 0) return { errors };

    try {
        const response = await fetch(`${API_URL}/api/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
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

export async function getUser() {
    const responseCookie = await getCookie("auth_token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    try {
        const response = await fetch(`${API_URL}/api/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${responseCookie.cookie}`,
            },
        })

        if(!response.ok) throw new Error("Erro ao buscar usuário.");

        const data = await response.json();
        return data as Usuario;
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