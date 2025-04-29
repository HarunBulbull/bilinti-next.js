import Navbar from '@/components/Navbar/Navbar';
import ClientPage from './ClientPage';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'Profil - Bilinti',
  description: 'Bilinti Haber ile gündemi yakalayın! Tarafsız habercilik anlayışıyla Türkiye ve dünyadan en güncel haberler, analizler ve özel dosyalar bir tık uzağınızda.',
  alternates: {
    canonical: "https://www.bilintihaber.com/profil"
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