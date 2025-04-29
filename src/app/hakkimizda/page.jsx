
import Footer from '@/components/Footer/Footer.jsx';
import AboutContent from './AboutContent.jsx';
import Navbar from '@/components/Navbar/Navbar.jsx';
export const metadata = {
  title: 'Hakkımızda - Bilinti',
  description: 'Bilinti Haber ile gündemi yakalayın! Tarafsız habercilik anlayışıyla Türkiye ve dünyadan en güncel haberler, analizler ve özel dosyalar bir tık uzağınızda.',
  alternates: {
    canonical: "https://www.bilintihaber.com/hakkimizda"
  }
}; 

export default function Home() {
    return (
      <>
        <Navbar />
        <div className="mt-[100px]">
          <AboutContent />
      </div>
      <Footer />
    </>);
  }