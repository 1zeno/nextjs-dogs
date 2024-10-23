"use client";

import React from "react";
import styles from "./photo-delete.module.css";
import { deletePhoto } from "@/actions/photo";

interface IProps {
    id: number;
}

const PhotoDelete = ({id}: IProps) => {

    const [loading, setLoading] = React.useState(false);

    async function handleClick() {
        const confirm = window.confirm("Tem certeza que deseja deletar?");
        if(confirm){
            try {
                setLoading(true);
                await deletePhoto(id);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
            
        }
    }

    return (
        <>
            {loading ? (
                <button className={styles.delete} disabled>Deletar</button>
            ):(
                <button className={styles.delete} onClick={handleClick}>Deletar</button>
            )}
            
        </>
    )
}

export default PhotoDelete;