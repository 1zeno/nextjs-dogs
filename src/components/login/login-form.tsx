"use client";

import React from "react";
import Input from "@/components/forms/input";
import Button from "@/components/forms/button";
import ErrorMessage from "@/helper/error-message";
import styles from "./login-form.module.css";
import {login} from "@/actions/auth";
import { useFormState, useFormStatus } from "react-dom";

const FormButton = () => {
    const status = useFormStatus()
    return status.pending ? (
        <Button disabled>Carregando...</Button>
    ) : (
        <Button >Entrar</Button>
    )
}

const LoginForm = () => {

    const [state, action] = useFormState(login, {
        ok: false,
        error: "",
        data: null,
    });

    React.useEffect(()=>{
        if(state.ok){
            window.location.href = "/conta";
        }
    },[state.ok])

    return (
        <form className={styles.form} action={action}>
            <Input
                label="Usuário"
                type="text"
                name="username"
            />
            <Input
                label="Senha"
                type="password"
                name="password"
            />
            <FormButton />
            {state.error && <ErrorMessage error={state.error} />}
        </form>
    )
}

export default LoginForm;