"use server";

import { COMMENT_POST } from "@/api";
import { getCookie } from "./cookie";

export async function createComment(id: string, body: {comment: string}){

    try {
        const responseCookie = await getCookie("token");
        if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

        const { url, options } = COMMENT_POST(id, body);
        const response = await fetch(url, options)
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