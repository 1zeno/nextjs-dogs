import React from "react";
import styles from "./Footer.module.css";
import Dogs from "@/assets/dogs-footer.svg"
import Image from "next/image";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Image
                src={Dogs}
                alt="Dogs - Logo"
            />
            <p>Dogs. Alguns direitos reservados.</p>
        </footer>
    )
}

export default Footer;