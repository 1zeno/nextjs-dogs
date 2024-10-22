"use server";

import { PHOTO_DELETE, PHOTO_GET, PHOTO_POST, PHOTOS_GET } from "@/functions/api";
import { getCookie } from "./cookie";
import apiError from "@/functions/api-error";

export type Photo = {
    id?: string;
    img: File;
    nome: string;
    peso: string;
    idade: string;
}

export type PhotoDetails = {
    id: number;
    author: string;
    title: string;
    date: string;
    src: string;
    peso: string;
    idade: string;
    acessos: string;
    total_comments: string;
}

export async function createPhoto(formData: FormData){
    const responseCookie = await getCookie("token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    const usuario: Photo = {
        img: formData.get("img") as File,
        nome: formData.get("nome") as string,
        peso: formData.get("peso") as string,
        idade: formData.get("idade") as string,
    }

    try {
        const { url, options } = PHOTO_POST(usuario, responseCookie.cookie?.value);
        const response = await fetch(url, options);
        if(!response.ok) throw new Error("Erro ao adicionar usuário.");
    } catch (error: unknown) {
        return apiError(error);
    }
}

export async function getPhotos(params:{
    page: number,
    total: number,
    user?: number,
}) {
    const responseCookie = await getCookie("token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    try {
        const { url } = PHOTOS_GET(params);
        const response = await fetch(url, {
            method: "GET",
        },);

        if(!response.ok) throw new Error("Erro ao buscar fotos.");

        const data: PhotoDetails[] = await response.json();
        return {
            data,
            ok: true,
            error: "",
        };
    } catch (error: unknown) {
        return apiError(error);
    }
}

export async function getPhotoById(id: number) {
    const responseCookie = await getCookie("token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    try {
        const { url, options } = PHOTO_GET(id);
        const response = await fetch(url, options)

        if(!response.ok) throw new Error("Erro ao buscar foto.");

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

export async function deletePhoto(id: string) {
    const responseCookie = await getCookie("token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    try {
        const { url, options } = PHOTO_DELETE(id, responseCookie.cookie?.value);
        const response = await fetch(url, options)

        if(!response.ok) throw new Error("Erro ao buscar foto.");

    } catch (error: unknown) {
        return apiError(error);
    }
}