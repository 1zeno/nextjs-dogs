"use client";

import React from "react";
import styles from "./user-photo-post.module.css";
import Input from "../forms/input";
import Button from "../forms/button";
import ErrorMessage from "@/helper/error-message";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { createPhoto } from "@/actions/photo";


const FormButton = () => {
    const status = useFormStatus();
    return (status.pending ? (
        <Button disabled>Enviando...</Button>
    ) : (
        <Button>Enviar</Button>
    ))
}

const UserPhotoPost = () => {

    const [img, setImg] = React.useState("");
    const router = useRouter();

    const [state, action] = useFormState(createPhoto, {
        data: null,
        ok: false,
        error: "",
    })


    function handleImgChange ({target}: React.ChangeEvent<HTMLInputElement>) {
        if(target.files){
            setImg(URL.createObjectURL(target.files[0]))
        }
    }

    return (
        <section className={`${styles.photoPost} ${styles.animeLeft}`}>
            <form action={action}>
                <Input label="Nome" type="text" name="nome" />
                <Input label="Peso" type="text" name="peso" />
                <Input label="Idade" type="text" name="idade" />
                <input
                    className={styles.file}
                    type="file"
                    name="img"
                    id="img"
                    onChange={handleImgChange}
                />
                <FormButton />
                <ErrorMessage error={state.error} />
            </form>
            <div>
            {img && <div className={styles.preview} style={{ backgroundImage: `url("${img}")`}}></div>}
            </div>
        </section>
    )
}

export default UserPhotoPost;