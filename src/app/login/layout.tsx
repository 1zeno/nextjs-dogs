import styles from "./layout.module.css";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className={styles.login}>
        <div className={styles.forms}>
            {children}
        </div>
    </section>
    )
}
