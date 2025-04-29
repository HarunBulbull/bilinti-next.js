import Footer from '@/components/Footer/Footer.jsx';
import Navbar from '@/components/Navbar/Navbar.jsx';
import Columns from './Columns';

export const metadata = {
  title: 'Köşe Yazıları - Bilinti',
  description: 'Bilinti Haber ile gündemi yakalayın! Tarafsız habercilik anlayışıyla Türkiye ve dünyadan en güncel haberler, analizler ve özel dosyalar bir tık uzağınızda.',
  alternates: {
    canonical: "https://www.bilintihaber.com/kose-yazilari"
  }
};

export default function Home() {
    return (
      <>
        <Navbar />
        <div className="mt-[100px]">
          <Columns />
        </div>
        <Footer />
      </>
    );
  }