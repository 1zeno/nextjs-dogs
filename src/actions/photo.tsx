"use server";

import { PHOTO_DELETE, PHOTO_GET, PHOTO_POST, PHOTOS_GET } from "@/functions/api";
import { getCookie } from "./cookie";
import apiError from "@/functions/api-error";
import { Comment } from "./comment";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

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

export type PhotoGet = {
    photo: PhotoDetails;
    comments: Comment[];
}

export async function createPhoto(state: {}, formData: FormData){
    const responseCookie = await getCookie("token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    const img = formData.get("img") as File;
    const nome = formData.get("nome") as string;
    const peso = formData.get("peso") as string;
    const idade = formData.get("idade") as string;

    try {
        if(!nome || !idade || !peso || img.size === 0){
            throw new Error("Preencha os dados.");
        }
        const { url } = PHOTO_POST();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${responseCookie.cookie?.value}`,
            },
            body: formData,
        },);
        if(!response.ok) throw new Error("Erro ao adicionar usuário.");
    } catch (error: unknown) {
        return apiError(error);
    }

    revalidateTag("photos");
    redirect("/conta");
}

export async function getPhotos({page=1,total=3,user}:{
    page?: number,
    total?: number,
    user?: string,
}) {
    
    try {
        const responseCookie = await getCookie("token");
        if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

        const { url } = PHOTOS_GET({page, total, user});
        const response = await fetch(url, {
            method: "GET",
            next: {
                tags: ["photos", "comment"],
            }
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
        const { url } = PHOTO_GET(id);
        const response = await fetch(url, {
            method: "GET",
            next: {
                tags: ["comment"],
            }
        },)

        if(!response.ok) throw new Error("Erro ao buscar foto.");

        const data: PhotoGet = await response.json();
        return {
            data,
            ok: true,
            error: "",
        };
    } catch (error: unknown) {
        return apiError(error);
    }
}

export async function deletePhoto(id: number) {
    const responseCookie = await getCookie("token");
    if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

    try {
        const { url } = PHOTO_DELETE(id);
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${responseCookie.cookie?.value}`,
            },
        },)

        if(!response.ok) throw new Error("Erro ao buscar foto.");
    } catch (error: unknown) {
        return apiError(error);
    }
    revalidateTag("photos");
    redirect("/conta");
}