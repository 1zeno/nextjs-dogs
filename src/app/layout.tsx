import type { Metadata } from "next";
import "./globals.css";
import { type_second } from "../functions/fonts";
import { UserContextProvider } from "@/context/UserContext";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getUser } from "@/actions/user";

export const metadata: Metadata = {
  title: "Dogs Next",
  description: "Rede social para cachorros.",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {

  let user = null;

  const { data } = await getUser();
  if(data){
    user = data;
  }
  return (
    <html lang="pt-BR">
      <body className={type_second.variable}>
        <UserContextProvider user={user}>
          <div className="App">
            <Header />
            <main className="AppBody">
              {children}
            </main>
            <div>{modal}</div>
            <Footer />
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
