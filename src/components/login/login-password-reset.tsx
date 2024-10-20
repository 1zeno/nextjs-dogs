"use client";

import React from "react";
import Input from "@/components/forms/input";
import Button from "@/components/forms/button";
import useForm from "@/hooks/useForm";;
import ErrorMessage from "@/helper/error-message";
import { resetPassword } from "@/actions/auth";
import { useRouter } from "next/navigation";

const LoginPasswordReset = () => {
    const [login, setLogin] = React.useState("");
    const [key, setKey] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const password = useForm();
    const router = useRouter();

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const key = params.get("key");
        const login = params.get("login");
        if (key) {
            setKey(key);
        }
        if (login) {
            setLogin(login);
        }
    }, [])


    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            if(!password.validate()){
                throw new Error("Insira uma senha válida.")
            }
            setError(null);
            setLoading(true);
            const response = await resetPassword({
                login,
                key,
                password: password.value,
            });
            if(response.ok){
                router.replace("/login");
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
            <h1 className="title">Resete a Senha</h1>
            <p>{key}</p>
            <p>{login}</p>
            <form onSubmit={handleSubmit}>
                <Input label="Nova Senha" type="password" name="password" {...password} />
                {loading ? (
                    <Button disabled>Resetando...</Button>
                ) : (
                    <Button>Resetar</Button>
                )}
            </form>
            <ErrorMessage error={error} />
        </section>
    )
}

export default LoginPasswordReset;