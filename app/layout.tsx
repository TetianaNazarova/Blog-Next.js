import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ChatBot from "@/components/chatbot";
import useServerDarkMode from "@/hooks/use-server-dark-mode";

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
      template: '%s | Tatyana App',
      default: 'Tanya App',
  },
  description: "My App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useServerDarkMode()
  return (
    <html lang="en" className={theme}>
      <body
        className={`${roboto.className} antialiased`}
      >
      <Header />
      <main className="mt-12">
          {children}
      </main>

      <ChatBot />
      </body>
    </html>
  );
}
