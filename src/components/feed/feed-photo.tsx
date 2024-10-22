"use client";

import React from "react";
import styles from "./feed-photo.module.css";
import { PhotoDetails } from "@/actions/photo";
import Image from "next/image";

interface IProps {
    photo: PhotoDetails;
    setModalPhoto: React.Dispatch<React.SetStateAction<null | PhotoDetails>>;
    index: number;
}

const FeedPhoto = ({photo, setModalPhoto, index}: IProps) => {
    function handleClick() {
        setModalPhoto(photo);
    }

    return (
        <li className={styles.photo} onClick={handleClick}>
            <Image
                className={styles.img}
                src={photo.src}
                width={500}
                height={500}
                alt={photo.title}
                sizes="80vw"
                priority={index < 4}
            />
            <span className={styles.visalizacao}>{photo.acessos}</span>
        </li>
    )
}

export default FeedPhoto;