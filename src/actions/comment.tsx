"use server";

import { COMMENT_POST } from "@/functions/api";
import { getCookie } from "./cookie";
import apiError from "@/functions/api-error";
import { revalidateTag } from "next/cache";

export type Comment = {
    comment_ID: string;
    comment_post_ID: string;
    comment_author: string;
    comment_author_email: string;
    comment_author_url: string;
    comment_author_IP: string;
    comment_date: string;
    comment_date_gmt: string;
    comment_content: string;
    comment_karma: string;
    comment_approved: string;
    comment_agent: string;
    comment_type: string;
    comment_parent: string;
    user_id: string;
  }

export async function createComment(state: {}, formData: FormData){

    const id = formData.get("id") as string;
    try {
        const responseCookie = await getCookie("token");
        if(!responseCookie.ok) throw new Error("Erro ao buscar token.");

        const { url } = COMMENT_POST(Number(id));
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${responseCookie.cookie?.value}`,
            },
            body: formData,
        })

        if(!response.ok) throw new Error("Erro ao adicionar comentário.");
        const data: Comment = await response.json();
        revalidateTag("comment");
        return {
            data,
            ok: true,
            error: "",
        };
    } catch (error: unknown) {
        return apiError(error);
    }
}