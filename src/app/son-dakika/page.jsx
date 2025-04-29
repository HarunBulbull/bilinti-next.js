import Navbar from '@/components/Navbar/Navbar.jsx';
import LatestContent from './latestContent.jsx';
import Footer from '@/components/Footer/Footer.jsx';

export const metadata = {
  title: 'Son Dakika - Bilinti',
  description: 'Bilinti Haber ile gündemi yakalayın! Tarafsız habercilik anlayışıyla Türkiye ve dünyadan en güncel haberler, analizler ve özel dosyalar bir tık uzağınızda.',
  alternates: {
    canonical: "https://www.bilintihaber.com/son-dakika"
  }
};

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-[100px]">
        <LatestContent />
      </div>
      <Footer />
    </>
  );
}