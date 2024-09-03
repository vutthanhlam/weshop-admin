import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./ui/header";
import Footer from "./ui/footer";
import "bootstrap/dist/css/bootstrap.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "S Shop",
  description: "Bring good products to everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={inter.className}
        className="flex-column min-vh-100 d-flex">
        <Header />
        {children}
        <Footer />

        <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"></script>
      </body>
    </html>
  );
}
