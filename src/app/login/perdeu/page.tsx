import LoginPasswordLost from "@/components/login/login-password-lost";
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Perdeu a senha",
};

export default function Perdeu() {
    return (
        <main>
            <LoginPasswordLost />
        </main>
    );
}
