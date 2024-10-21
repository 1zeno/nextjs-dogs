import LoginForm from "@/components/login/login-form";
import { Metadata } from "next/types";
import styles from "./login.module.css";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Login",
};

export default function Login() {
    return (
        <main>
            <section className="animeLeft">
                <h1 className="title">Login</h1>
                <LoginForm />
                <Link className={styles.perdeu} href="/login/perdeu">Perdeu a Senha?</Link>
                <div className={styles.cadastro}>
                    <h2 className={styles.subtitle}>Cadastre-se</h2>
                    <p>Ainda não possui conta? Cadastre-se no site.</p>
                </div>
                <Link className="button" href="/login/criar">
                    Cadastro
                </Link>
            </section>
        </main>
    );
}
