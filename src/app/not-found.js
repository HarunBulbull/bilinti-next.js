
import Link from 'next/link';
import { Button } from 'antd';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';

export const metadata = {
  title: "Bilinti Haber",
  description: "Bilinti Haber ile gündemi yakalayın! Tarafsız habercilik anlayışıyla Türkiye ve dünyadan en güncel haberler, analizler ve özel dosyalar bir tık uzağınızda.",
  keywords: "haber, bil, araştır"
};

export default function NotFound() {
  return (<>
    <Navbar />
    <div className="mt-[100px]">
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">

        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl">Sayfa Bulunamadı</h2>
        <p className="text-gray-600">Aradığınız sayfa bulunamadı veya taşınmış olabilir.</p>
        <Link href="/">
          <Button type="primary">Ana Sayfaya Dön</Button>
        </Link>
      </div>
    </div>
    <Footer />
  </>
  );
} 