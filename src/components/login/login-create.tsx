"use client";

import React from "react";
import Input from "@/components/forms/input";
import Button from "@/components/forms/button";
import useForm from "@/hooks/useForm";
import ErrorMessage from "@/helper/error-message";
import { login } from "@/actions/auth";
import { createUser } from "@/actions/user";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const LoginCreate = () => {

    const username = useForm();
    const email = useForm("email");
    const password = useForm();
    const { setUser } = useUser();
    const router = useRouter();

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleLogin = async(username: string, password: string) => {
        try {
            setError(null);
            setLoading(true);
            const response = await login({username, password});
            if(response.ok){
                setUser({
                    id: response.data.id!,
                    email: response.data.email,
                    username: response.data.username,
                })
                router.replace("/conta");
            } else {
                throw new Error(response.errors?.join(" / ") || "Erro ao buscar usuário");
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

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const formData = new FormData();

        formData.append("username", username.value);
        formData.append("email", email.value);
        formData.append("password", password.value);

        try {
            await createUser(formData);
            await handleLogin(username.value, password.value);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="animeLeft">
            <h1 className="title">Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="username" {...username} />
                <Input label="Email" type="email" name="email" {...email} />
                <Input label="Senha" type="password" name="password" {...password} />
                {loading ? (<Button disabled>Carregando...</Button>) : (<Button>Cadastrar</Button>)}
                <ErrorMessage error={error} />
            </form>
        </section>
    )
}

export default LoginCreate;