import LoginPasswordReset from "@/components/login/login-password-reset";
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Resete a senha",
};

export default function Resetar() {
    return (
        <main>
            <LoginPasswordReset />
        </main>
    );
}
