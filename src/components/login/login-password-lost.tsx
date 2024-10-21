"use client";

import React from "react";
import Input from "@/components/forms/input";
import Button from "@/components/forms/button";
import ErrorMessage from "@/helper/error-message";
import { lostPassword } from "@/actions/auth";
import { useFormState, useFormStatus } from "react-dom";

const FormButton = () => {
    const status = useFormStatus();
    return (status.pending ? (
        <Button disabled>Enviando...</Button>
    ) : (
        <Button>Enviar Email</Button>
    ))
}

const LoginPasswordLost = () => {

    const [url, setUrl] = React.useState("");

    React.useEffect(()=>{
        setUrl(window.location.href.replace("perdeu", "resetar"));
    },[])

    const [state, action] = useFormState(lostPassword, {
        data: null,
        ok: true,
        error: "",
    })

    return (
        <>
            {state.data ? (
                <p style={{color: "#4c1"}}>{state.data}</p>
            ) : (
                <form action={action}>
                    <Input label="Email / Usuário" type="text" name="login"/>
                    <input
                        type="hidden"
                        name="url"
                        value={url}
                    />
                    <FormButton />
                </form>
            )}
            <ErrorMessage error={state.error} />
        </>
    )
}

export default LoginPasswordLost;