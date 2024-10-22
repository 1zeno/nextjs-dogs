import UserHeader from "@/components/user/user-header";

export default function ContaLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="container mainContainer">
            <UserHeader />
            {children}
        </section>
    )
}
