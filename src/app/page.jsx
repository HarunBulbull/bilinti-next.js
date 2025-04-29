import Navbar from '@/components/Navbar/Navbar.jsx';
import HomeContent from '../components/Home/HomeContent.jsx';
import Footer from '@/components/Footer/Footer.jsx';

export const metadata = {
  title: 'Ana Sayfa - Bilinti',
  description: 'Bilinti Haber ile gündemi yakalayın! Tarafsız habercilik anlayışıyla Türkiye ve dünyadan en güncel haberler, analizler ve özel dosyalar bir tık uzağınızda.',
  alternates: {
    canonical: "https://www.bilintihaber.com"
  }
};

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-[100px]">
        <HomeContent />;
      </div>
      <Footer />
    </>
  );
}