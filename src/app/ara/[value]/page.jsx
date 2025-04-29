import Navbar from '@/components/Navbar/Navbar';
import ClientPage from '../ClientPage';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer/Footer';

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const value = resolvedParams.value ?? '';
    if (!value) {
        notFound();
    }

    const decodedValue = decodeURIComponent(value);

    return {
        title: `Haber Ara: ${decodedValue} | Bilinti`,
        description: `Bilinti'nin köşe yazıları sayfasında gündeme dair derin analizler, uzman görüşleri ve farklı bakış açılarıyla kaleme alınmış yazılarla düşünce dünyanızı zenginleştirin.`,
        keywords: `haber, son, dakika, bil, ${decodedValue}`,
        alternates: {
            canonical: `https://www.bilintihaber.com/ara/${value}`
        }
    };
}

export default async function Page({ params }) {
    const resolvedParams = await params;
    const value = resolvedParams.value ?? '';
    if (!value) {
        notFound();
    }

    const decodedValue = decodeURIComponent(value);

    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${apiURL}/api/news/search/${decodedValue}/0/10`, {
            method: "GET",
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            console.error(`API yanıt kodu: ${response.status}`);
            return <ClientPage initialData={{ data: [], total: 0 }} searchValue={decodedValue} />;
        }

        const data = await response.json();

        return (
            <>
                <Navbar />
                <div className="mt-[100px]">
                    <ClientPage initialData={data} searchValue={decodedValue} />
                </div>
                <Footer />
            </>
        );

    } catch (error) {
        console.error('Arama verisi alınırken hata:', error);
        return (
            <>
                <Navbar />
                <div className="mt-[100px]">
                    <ClientPage initialData={{ data: [], total: 0 }} searchValue={decodedValue} />

                </div>
                <Footer />
            </>
        );
    }
} 