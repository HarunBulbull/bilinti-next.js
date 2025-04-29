import Navbar from '@/components/Navbar/Navbar';
import ClientPage from '../ClientPage';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer/Footer';

async function fetchNewsData(haber) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiURL) {
    console.error('API URL tanımlanmamış');
    return null;
  }

  try {
    const response = await fetch(`${apiURL}/api/news/link/${haber}`, { 
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
  const haber = resolvedParams.haber ?? '';
  if (!haber) {
    console.error('Haber parametresi eksik');
    notFound();
  }
  
  const data = await fetchNewsData(haber);
  
  if (!data || !data.data) {
    console.error('Metadata için veri alınamadı');
    notFound();
  }
  
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  
  try {
    return {
      title: `${data?.data?.newSEO?.title || data?.data?.newTitle || 'Haber'} | Bilinti`,
      description: data?.data?.newSEO?.description || 'Bilinti Haber ile gündemi yakalayın!',
      keywords: data?.data?.newSEO?.keywords || 'haber, bil, araştır',
      authors: [{ name: data?.data?.newAuthor?.fullName || 'Bilinti' }],
      alternates: {
        canonical: `https://www.bilintihaber.com/haber/${data?.data?.newLink}`
      },
      openGraph: {
        title: `${data?.data?.newSEO?.title || data?.data?.newTitle || 'Haber'} | Bilinti`,
        description: data?.data?.newSEO?.description || 'Bilinti Haber ile gündemi yakalayın!',
        url: `https://www.bilintihaber.com/haber/${data?.data?.newLink}`,
        type: 'article',
        images: data?.data?.newImage ? [`${apiURL}/api/image/${data?.data?.newImage}`] : []
      },
      twitter: {
        card: 'summary_large_image',
        title: `${data?.data?.newSEO?.title || data?.data?.newTitle || 'Haber'} | Bilinti`,
        description: data?.data?.newSEO?.description || 'Bilinti Haber ile gündemi yakalayın!',
        images: data?.data?.newImage ? [`${apiURL}/api/image/${data?.data?.newImage}`] : []
      }
    };
  } catch (error) {
    console.error('Metadata oluşturulurken hata:', error);
    return {
      title: 'Haber | Bilinti',
      description: 'Bilinti Haber ile gündemi yakalayın!'
    };
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const haber = resolvedParams.haber ?? '';
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