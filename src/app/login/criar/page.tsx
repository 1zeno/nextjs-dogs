import LoginCreate from "@/components/login/login-create";
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Crie sua conta",
};

export default function Criar() {
    return (
        <main>
            <section className="animeLeft">
                <h1 className="title">Cadastre-se</h1>
                <LoginCreate />
            </section>
        </main>
    );
}
