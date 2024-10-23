"use client";

import React from "react";
import EnviarIcon from "@/icons/enviar-icon"
import ErrorMessage from "@/helper/error-message";
import styles from "./photo-comments-form.module.css";
import { Comment, createComment } from "@/actions/comment";
import { useFormState } from "react-dom";

interface IProps {
    id: number;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    single: boolean;
}

const PhotoCommentsForm = ({id, setComments, single}: IProps) => {

    const [comment, setComment] = React.useState("");

    const [state, action] = useFormState(createComment, {
        data: null,
        ok: false,
        error: "",
    })

    React.useEffect(()=>{
        if(state.ok && state.data){
            setComments((comments)=>[...comments, state.data])
            setComment("");
        }
    },[state, setComments])

    return (
        <form action={action} className={`${styles.form} ${single ? styles.single : ""}`}>
            <input type="hidden" name="id" value={id} />
            <textarea
                className={styles.textarea}
                id="comment"
                name="comment"
                placeholder="Comente..."
                value={comment}
                onChange={({ target })=> setComment(target.value)}
            />
            <button className={styles.button} type="submit">
                <EnviarIcon />
            </button>
            <ErrorMessage error={state.error} />
        </form>
    )
}

export default PhotoCommentsForm;