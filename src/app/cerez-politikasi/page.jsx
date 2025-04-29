import Footer from '@/components/Footer/Footer.jsx';
import ClientPage from './ClientPage.jsx';
import Navbar from '@/components/Navbar/Navbar.jsx';

export const metadata = {
  title: 'Çerez Politikası - Bilinti',
  description: 'Bilinti Haber ile gündemi yakalayın! Tarafsız habercilik anlayışıyla Türkiye ve dünyadan en güncel haberler, analizler ve özel dosyalar bir tık uzağınızda.',
  alternates: {
    canonical: "https://www.bilintihaber.com/cerez-politikasi"
  }
};

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-[100px]">
        <ClientPage />
      </div>
      <Footer />
    </>
  );
}