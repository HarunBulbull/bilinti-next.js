import Navbar from '@/components/Navbar/Navbar';
import ClientPage from './ClientPage';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer/Footer';

async function fetchNewsData(link) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiURL) {
    console.error('API URL tanımlanmamış');
    return null;
  }

  try {
    const response = await fetch(`${apiURL}/api/column/${link}`, { 
      method: "GET",
      next: { revalidate: 60 },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error(`API yanıt kodu: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    if (!data || !data.data) {
      console.error('API geçerli veri döndürmedi:', data);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('API isteği sırasında hata:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {

  const resolvedParams = await params;
  const haber = resolvedParams.link ?? '';
  if (!haber) {
    console.error('Haber parametresi eksik');
    notFound();
  }
  
  const data = await fetchNewsData(haber);
  
  if (!data || !data.data) {
    console.error('Metadata için veri alınamadı');
    notFound();
  }
    
  try {
    function stripHtmlTags(html) {
      if (!html) return '';
      const tempElement = new DOMParser().parseFromString(html, 'text/html');
      return tempElement.body.textContent || '';
    }
    const cleanDescription = stripHtmlTags(data?.data?.columnContent.subsstirng(0,60));

    return {
      title: `${data?.data?.columnTitle} | Bilinti`,
      description: cleanDescription || 'Bilinti Haber ile gündemi yakalayın!',
      authors: [{ name: data?.data?.columnAuthor?.fullName || 'Bilinti' }],
      alternates: {
        canonical: `https://www.bilintihaber.com/kose-yazilari/${data?.data?.columnLink}`
      },
    };
  } catch (error) {
    console.error('Metadata oluşturulurken hata:', error);
    return {
      title: 'Köşe Yazısı | Bilinti',
      description: 'Bilinti Haber ile gündemi yakalayın!'
    };
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const haber = resolvedParams.link ?? '';
  if (!haber) {
    notFound();
  }
  
  const data = await fetchNewsData(haber);
  
  if (!data || !data.data) {
    notFound();
  }
  
  return (
    <>
      <Navbar />
      <div className="mt-[100px]">
        <ClientPage initialData={data} />
      </div>
      <Footer />
    </>
  );
}