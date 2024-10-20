import LoginForm from "@/components/login/login-form";
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Login",
};

export default function Login() {
    return (
        <main>
            <LoginForm />
        </main>
    );
}
