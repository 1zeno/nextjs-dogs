"use server";

import { cookies } from "next/headers";

export async function setCookie(key: string, value: string) {
    cookies().set(key, value, {
        httpOnly: true,
        secure: true,
    })
    return {ok: true};
}

export async function getCookie(key: string) {
    if(cookies().has(key)){
        const cookie = cookies().get(key)
        return {cookie, ok: true};
    }
    return {ok: false};
}