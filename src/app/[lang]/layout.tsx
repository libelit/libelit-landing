"use client";

import { Inter, Open_Sans } from "next/font/google";
import Header from "@/components/header";
import { Locale } from "@/i18n.config";
import { Footer } from "@/components/footer";
import { useParams } from "next/navigation";

import "./globals.scss";
import { AlertProvider } from "@/contexts/AlertContext";
import GlobalAlerts from "@/components/UiComponents/Alert/GlobalAlerts";

const inter = Inter({ subsets: ["latin"] });
const sans_serif = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const lang = (params?.lang || "en") as Locale;

  return (
    <html lang={lang}>
      <body className={`${sans_serif.className} ${inter.className}`}>
        <AlertProvider>
          <GlobalAlerts />
          <div className="items-start bg-white flex flex-col font-inter-700 text-primary-800">
            <Header lang={lang} />
            {children}
            <Footer lang={lang} />
          </div>
        </AlertProvider>
      </body>
    </html>
  );
}
