"use client";

import React from "react";
import MinhasFotos from "@/assets/feed.svg";
import Estatisticas from "@/assets/estatisticas.svg";
import AdicionarFoto from "@/assets/adicionar.svg";
import Sair from "@/assets/sair.svg";
import styles from "./user-header-nav.module.css";
import useMedia from "@/hooks/useMedia";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { removeCookie } from "@/actions/cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserHeaderNav = () => {
    const [ mobileMenu, setMobileMenu ] = React.useState(false);
    const { setUser } = useUser();

    const pathname = usePathname();
    const mobile = useMedia("(max-width: 40rem)");

    async function handleLogout(){
        await removeCookie("token");
        setUser(null);
        window.location.href = "/login";
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
                    <Image
                        src={MinhasFotos}
                        alt="minhas-fotos"
                    />
                    {mobile && "Minhas Fotos"}
                </Link>
                <Link href="/conta/estatisticas">
                    <Image
                        src={Estatisticas}
                        alt="estatisticas"
                    />
                    {mobile && "Estatísticas"}
                </Link>
                <Link href="/conta/postar">
                    <Image
                        src={AdicionarFoto}
                        alt="adicionar-foto"
                    />
                    {mobile && "Adicionar Foto"}
                </Link>
                <button onClick={handleLogout}>
                    <Image
                        src={Sair}
                        alt="sair"
                    />
                    {mobile && "Sair"}
                </button>
            </nav>
        </>
    )
}

export default UserHeaderNav;