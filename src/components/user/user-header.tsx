"use client";

import React from "react";
import UserHeaderNav from "./user-header-nav";
import styles from "./user-header.module.css";
import { usePathname } from "next/navigation";

type Titles = {
    [key: string]: string;
  }

const UserHeader = () => {
    const [title, setTitle] = React.useState('');

    const location = usePathname();

    React.useEffect(()=>{
        const titles: Titles = {
            "/conta": "Minha Conta",
            "/conta/estatisticas": "Estatísticas",
            "/conta/postar": "Poste Sua Foto",
        }
        setTitle(titles[location]);
    },[location]);

    return (
        <header className={styles.header}>
            <h1 className="title">{title}</h1>
            <UserHeaderNav />
        </header>
    )
}

export default UserHeader;