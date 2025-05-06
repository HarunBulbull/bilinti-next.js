import Navbar from '@/components/Navbar/Navbar';
import ClientPage from './ClientPage';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer/Footer';

function stripHtml(html) {
  if (!html) return '';
  // HTML etiketlerini kaldır
  const plainText = html.replace(/<[^>]*>/g, '');
  // HTML karakterlerini decode et
  const decodedText = plainText
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  // İlk 70 karakteri al
  return decodedText.substring(0, 70);
}

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
    return {
      title: `${data?.data?.columnTitle} | Bilinti`,
      description: stripHtml(data?.data?.columnContent) || 'Bilinti Haber ile gündemi yakalayın!',
      authors: [{ name: data?.data?.columnAuthor.fullName || 'Bilinti' }],
      alternates: {
        canonical: `https://www.bilintihaber.com/kose-yazilari/${data?.data?.columnLink}`
      },
      openGraph: {
        title: `${data?.data?.columnTitle} | Bilinti`,
        description: stripHtml(data?.data?.columnContent) || 'Bilinti Haber ile gündemi yakalayın!',
        canonical: `https://www.bilintihaber.com/kose-yazilari/${data?.data?.columnLink}`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${data?.data?.columnTitle} | Bilinti`,
        description: stripHtml(data?.data?.columnContent) || 'Bilinti Haber ile gündemi yakalayın!',
      }
    };
  } catch (error) {
    console.error('Metadata oluşturulurken hata:', error);
    return {
      title: 'Köşe Yazıları | Bilinti',
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