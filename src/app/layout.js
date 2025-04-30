import "./globals.css";
import tr_TR from "antd/lib/locale/tr_TR";
import { ConfigProvider } from "antd";
import LoadingProvider from "./loading";

export const metadata = {
  title: "Bilinti Haber",
  description: "Bilinti Haber ile gündemi yakalayın! Tarafsız habercilik anlayışıyla Türkiye ve dünyadan en güncel haberler, analizler ve özel dosyalar bir tık uzağınızda.",
  keywords: "haber, bil, araştır"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider locale={tr_TR}>
          <LoadingProvider/>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
