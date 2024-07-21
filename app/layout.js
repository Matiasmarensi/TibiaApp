import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tibia App",
  description: "Tibia App",
  icons: {
    icon: "/Icon.png", // Ajusta la ruta si tu imagen está en un subdirectorio
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
