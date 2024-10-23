"use client";

import React from "react";
import styles from "./feed-modal.module.css";
import { PhotoGet } from "@/actions/photo";
import PhotoContent from "../comments/photo-content";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
    photo: PhotoGet;
}

const FeedModal = ({photo}: IProps) => {

    const router = useRouter();
    const pathname = usePathname();

    if(!pathname.includes("foto")){
        return null;
    }

    function handleOutsideClick(event: React.MouseEvent<HTMLElement>){
        if(event.target === event.currentTarget){
            router.back();
        }
    }

    return (
        <div className={styles.modal} onClick={handleOutsideClick}>
            <PhotoContent data={photo} />
        </div>
    )
}

export default FeedModal;