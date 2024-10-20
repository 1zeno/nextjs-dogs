"use client";

import React from "react";
import Input from "@/components/forms/input";
import Button from "@/components/forms/button";
import useForm from "@/hooks/useForm";;
import ErrorMessage from "@/helper/error-message";
import { lostPassword } from "@/actions/auth";

const LoginPasswordLost = () => {

    const login = useForm();
    const [data, setData] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            if (!login.validate()) {
                throw new Error("Insira um login válido.")
            }
            setError(null);
            setLoading(true);
            const response = await lostPassword({
                login: login.value,
                redirectUrl: window.location.href.replace("perdeu", "resetar"),
            });
            if(response.ok){
                setData(response.data);
            }
        } catch (error: unknown) {
            console.error(error);
            if(error instanceof Error){
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="animeLeft">
            <h1 className="title">Perdeu a senha?</h1>
            {data ? (
                <p style={{color: "#4c1"}}>{data}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <Input label="Email / Usuário" type="text" name="login" {...login} />
                    {loading ? (
                        <Button disabled>Enviando...</Button>
                    ) : (
                        <Button>Enviar Email</Button>
                    )}
                </form>
            )}
            <ErrorMessage error={error} />
        </section>
    )
}

export default LoginPasswordLost;