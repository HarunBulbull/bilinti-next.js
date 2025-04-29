import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Haber Ara | Bilinti',
  description: 'Bilinti Haber ile gündemi yakalayın! Tarafsız habercilik anlayışıyla Türkiye ve dünyadan en güncel haberler, analizler ve özel dosyalar bir tık uzağınızda.',
  keywords: 'haber, arama, bil, araştır',
  alternates: {
    canonical: 'https://www.bilintihaber.com/ara'
  }
};

export default function Page() {
  notFound();
} 