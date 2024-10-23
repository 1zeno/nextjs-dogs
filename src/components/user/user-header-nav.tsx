"use client";

import React from "react";
import MinhasFotos from "@/icons/feed-icon";
import Estatisticas from "@/icons/estatisticas-icon";
import AdicionarFoto from "@/icons/adicionar-icon";
import Sair from "@/icons/sair-icon";
import styles from "./user-header-nav.module.css";
import useMedia from "@/hooks/useMedia";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";

const UserHeaderNav = () => {
    const [ mobileMenu, setMobileMenu ] = React.useState(false);
    const { setUser } = useUser();

    const pathname = usePathname();
    const mobile = useMedia("(max-width: 40rem)");

    async function handleLogout(){
        await logout();
        setUser(null);
    }

    React.useEffect(()=>{
        setMobileMenu(false);
    }, [pathname]);

    return (
        <>
            {
                mobile && (
                    <button
                        className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
                        aria-label="Menu"
                        onClick={()=>setMobileMenu(!mobileMenu)}
                    ></button>
                )
            }
            <nav className={`${mobile? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
                <Link href="/conta">
                    <MinhasFotos />
                    {mobile && "Minhas Fotos"}
                </Link>
                <Link href="/conta/estatisticas">
                    <Estatisticas />
                    {mobile && "Estatísticas"}
                </Link>
                <Link href="/conta/postar">
                    <AdicionarFoto />
                    {mobile && "Adicionar Foto"}
                </Link>
                <button onClick={handleLogout}>
                    <Sair />
                    {mobile && "Sair"}
                </button>
            </nav>
        </>
    )
}

export default UserHeaderNav;