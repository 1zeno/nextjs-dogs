"use client";

import React from "react";
import styles from "./feed-photo.module.css";
import { PhotoDetails } from "@/actions/photo";
import Image from "next/image";
import Link from "next/link";

interface IProps {
    photo: PhotoDetails;
    index: number;
}

const FeedPhoto = ({photo, index}: IProps) => {

    return (
        <li className={styles.photo}>
            <Link href={`/foto/${photo.id}`} scroll={false}>
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
            </Link>
        </li>
    )
}

export default FeedPhoto;