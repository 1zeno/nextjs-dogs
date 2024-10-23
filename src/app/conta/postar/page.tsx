import UserPhotoPost from "@/components/user/user-photo-post";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Poste sua foto",
};

export default function Postar() {
    return (
        <main>
            <UserPhotoPost />
        </main>
    );
}
