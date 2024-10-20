import LoginCreate from "@/components/login/login-create";
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Crie sua conta",
};

export default function Criar() {
    return (
        <main>
            <LoginCreate />
        </main>
    );
}
