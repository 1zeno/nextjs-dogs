"use server";

import { getCookie } from "./cookie";

export const API_URL = "https://dogsapi.origamid.dev/json";

export type Photo = {
    id?: string;
    img: File;
    nome: string;
    peso: string;
    idade: string;
}

export async function createPhoto(formData: FormData){
    const responseCookie = await getCookie("auth_token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    const usuario: Photo = {
        img: formData.get("img") as File,
        nome: formData.get("nome") as string,
        peso: formData.get("peso") as string,
        idade: formData.get("idade") as string,
    }

    try {
        const response = await fetch(`${API_URL}/api/photo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${responseCookie.cookie}`,
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

export async function getPhotos(params:{
    page: string,
    total: number,
    user: string,
}) {
    const responseCookie = await getCookie("auth_token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    try {
        const response = await fetch(`${API_URL}/api/photo/?_page=${params.page}&_total=${params.total}&_user=${params.user}`, {
            method: "GET",
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${responseCookie.cookie}`,
            },
        })

        if(!response.ok) throw new Error("Erro ao buscar fotos.");

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

export async function getPhotoById(id: string) {
    const responseCookie = await getCookie("auth_token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    try {
        const response = await fetch(`${API_URL}/api/photo/${id}`, {
            method: "GET",
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${responseCookie.cookie}`,
            },
        })

        if(!response.ok) throw new Error("Erro ao buscar foto.");

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

export async function deletePhoto(id: string) {
    const responseCookie = await getCookie("auth_token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    try {
        const response = await fetch(`${API_URL}/api/photo/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${responseCookie.cookie}`,
            },
        })

        if(!response.ok) throw new Error("Erro ao buscar foto.");

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