"use client";

import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Dogs from "@/assets/dogs.svg";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

const Header = () => {
    const {user} = useUser();
    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}>
                <Link
                    className={styles.logo}
                    href="/"
                    aria-label="Dogs - Home"
                >
                    <Image
                        src={Dogs}
                        alt="Dogs - Logo"
                        width={28}
                        height={22}
                        priority
                    />
                </Link>
                <Link className={styles.login} href="/login">{user ? user.username : "Login / Criar"}</Link>
            </nav>
        </header>
    )
}

export default Header;