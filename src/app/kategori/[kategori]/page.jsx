import Footer from '@/components/Footer/Footer';
import ClientPage from '../ClientPage';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';

const validCategories = [
  {link: "gundem", name: "Gündem"},
  {link: "spor", name: "Spor"},
  {link: "ekonomi", name: "Ekonomi"},
  {link: "magazin", name: "Magazin"},
  {link: "siyaset", name: "Siyaset"},
  {link: "teknoloji", name: "Teknoloji"},
  {link: "saglik", name: "Sağlık"},
  {link: "bilim", name: "Bilim"},
  {link: "sanat", name: "Sanat"}
];

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const kategori = resolvedParams.kategori ?? '';
  if (!validCategories.find((el) => el.link === kategori)) {
    notFound();
  }
  const title = kategori ? `${validCategories.find((el) => el.link === kategori).name} Haberleri - Bilinti` : 'Kategori Haberleri - Bilinti';

  return {
    title,
    description:
      'Bilinti Haber ile gündemi yakalayın! Tarafsız habercilik anlayışıyla Türkiye ve dünyadan en güncel haberler, analizler ve özel dosyalar bir tık uzağınızda.',
    alternates: {
      canonical: `https://www.bilintihaber.com/kategori/${kategori}`
    }
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const kategori = resolvedParams.kategori ?? '';
  if (!validCategories.find((el) => el.link === kategori)) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="mt-[100px]">
        <ClientPage />
      </div>
      <Footer />
    </>
  );
}