"use server";

import { cookies } from "next/headers";

export async function setCookie(key: string, value: string, maxAge?: number) {
    cookies().set(key, value, {
        httpOnly: true,
        secure: true,
        maxAge,
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

export async function removeCookie(key: string) {
    if(cookies().has(key)){
        const cookie = cookies().delete(key)
        return {cookie, ok: true};
    }
    return {ok: false};
}