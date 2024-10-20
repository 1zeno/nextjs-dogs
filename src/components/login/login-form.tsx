"use client";

import React from "react";
import Link from "next/link";
import Input from "@/components/forms/input";
import Button from "@/components/forms/button";
import useForm from "@/hooks/useForm";
import ErrorMessage from "@/helper/error-message";
import styles from "./login-form.module.css";
import { login } from "@/actions/auth";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const LoginForm = () => {

    const { setUser } = useUser();

    const router = useRouter();

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const username = useForm();
    const password = useForm();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            if(!username.validate() || !password.validate()){
                throw new Error("Insira usuário de senha válidos.")
            }
            setError(null);
            setLoading(true);
            const response = await login({
                username: username.value,
                password: password.value,
            });
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

    return (
        <section className="animeLeft">
            <h1 className="title">Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    label="Usuário"
                    type="text"
                    name="username"
                    {...username}
                />
                <Input
                    label="Senha"
                    type="password"
                    name="password"
                    {...password}
                />
                {loading ? (
                    <Button disabled>Carregando...</Button>
                ):(
                    <Button >Entrar</Button>
                )}
                
                {error && <ErrorMessage error={error && "Dados incorretos."} />}
            </form>
            <Link className={styles.perdeu} href="/login/perdeu">Perdeu a Senha?</Link>
            <div className={styles.cadastro}>
                <h2 className={styles.subtitle}>Cadastre-se</h2>
                <p>Ainda não possui conta? Cadastre-se no site.</p>
            </div>
            <Link className="button" href="/login/criar">
                Cadastro
            </Link>
        </section>
    )
}

export default LoginForm;