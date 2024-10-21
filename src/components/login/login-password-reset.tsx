"use client";

import React from "react";
import Input from "@/components/forms/input";
import Button from "@/components/forms/button";
import useForm from "@/hooks/useForm";;
import ErrorMessage from "@/helper/error-message";
import { resetPassword } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

const FormButton = () => {
    const status = useFormStatus();
    return (status.pending ? (
        <Button disabled>Resetando...</Button>
    ) : (
        <Button>Resetar</Button>
    ))
}

const LoginPasswordReset = () => {
    const [login, setLogin] = React.useState("");
    const [key, setKey] = React.useState("");

    const [state, action] = useFormState(resetPassword, {
        data: null,
        ok: false,
        error: "",
    })

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

    return (
        <>
            <p>{key}</p>
            <p>{login}</p>
            <form action={action}>
                <Input label="Nova Senha" type="password" name="password" />
                <input type="hidden" name="key" value={key}/>
                <input type="hidden" name="login" value={login}/>
                <FormButton />
            </form>
            <ErrorMessage error={state.error} />
        </>
    )
}

export default LoginPasswordReset;