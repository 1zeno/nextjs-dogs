import LoginPasswordReset from "@/components/login/login-password-reset";
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Resete a senha",
};

export default function Resetar() {
    return (
        <main>
            <section className="animeLeft">
                <h1 className="title">Resete a Senha</h1>
                <LoginPasswordReset />
            </section>
        </main>
    );
}
