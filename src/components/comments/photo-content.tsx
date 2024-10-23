"use client";

import React from "react";
import styles from "./photo-content.module.css";
import Link from "next/link";
import PhotoComments from "./photo-comments";
import PhotoDelete from "./photo-delete";
import Image from "next/image";
import { PhotoGet } from "@/actions/photo";
import { useUser } from "@/context/UserContext";

interface IProps {
    data: PhotoGet;
    single?: boolean;
}

const PhotoContent = ({ data, single=false }: IProps) => {

    const { user } = useUser();
    const { photo, comments } = data;
    return (
        <div className={`${styles.photo} ${single ? styles.single : ""}`}>
            <div className={styles.img}>
                <Image
                    src={photo.src}
                    alt={photo.title}
                    width={1500}
                    height={1500}
                />
            </div>
            <div className={styles.details}>
                <div>
                    <p className={styles.author}>
                        {
                            user && user.username === photo.author ?
                                <PhotoDelete id={photo.id} />
                                :
                                <Link href={`/perfil/${photo.author}`}>@{photo.author}</Link>
                        }

                        <span className={styles.visualizacoes}>{photo.acessos}</span>
                    </p>
                    <h1 className="title">
                        <Link href={`/foto/${photo.id}`}>{photo.title}</Link>
                    </h1>
                    <ul className={styles.attributes}>
                        <li>{photo.peso} kg</li>
                        <li>{photo.idade} anos</li>
                    </ul>
                </div>
            </div>
            <PhotoComments id={photo.id} comments={comments} single={single} />
        </div>
    )
}

export default PhotoContent;