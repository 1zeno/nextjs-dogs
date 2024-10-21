"use client";

import React from "react";
import Input from "@/components/forms/input";
import Button from "@/components/forms/button";
import ErrorMessage from "@/helper/error-message";
import { createUser } from "@/actions/user";
import { useFormState, useFormStatus } from "react-dom";

const FormButton = () => {
    const status = useFormStatus()
    return status.pending ? (
        <Button disabled>Carregando...</Button>
    ) : (
        <Button>Cadastrar</Button>
    )
}

const LoginCreate = () => {

    const [state, action] = useFormState(createUser, {
        data: null,
        ok: false,
        error: "",
    })

    React.useEffect(() => {
        if (state.ok) {
            window.location.href = "/conta";
        }
    }, [state.ok])

    return (
        <form action={action}>
            <Input label="Usuário" type="text" name="username" />
            <Input label="Email" type="email" name="email" />
            <Input label="Senha" type="password" name="password" />
            <FormButton />
            <ErrorMessage error={state.error} />
        </form>
    )
}

export default LoginCreate;