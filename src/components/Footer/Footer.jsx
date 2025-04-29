import Link from "next/link"


function Footer() {

    const news = [
        { path: '/son-dakika', name: 'Son Dakika' },
        { path: '/kategori/gundem', name: 'Gündem' },
        { path: '/kategori/spor', name: 'Spor' },
        { path: '/kategori/ekonomi', name: 'Ekonomi' },
        { path: '/kategori/magazin', name: 'Magazin' },
        { path: '/kategori/siyaset', name: 'Siyaset' },
        { path: '/kategori/teknoloji', name: 'Teknoloji' },
        { path: '/kategori/saglik', name: 'Sağlık' },
        { path: '/kategori/bilim', name: 'Bilim' },
        { path: '/kategori/sanat', name: 'Sanat' }
    ]

    const links = [
        { path: '/hakkimizda', name: 'Hakkımızda' },
        { path: '/ekibimiz', name: 'Ekibimiz' },
        { path: '/kullanim-sartlari', name: 'Kullanım Şartları' },
        { path: '/gizlilik-politikasi', name: 'Gizlilik Politikası' },
        { path: '/cerez-politikasi', name: 'Çerez Politikası' },
        { path: '/kvkk', name: 'Kişisel Verilerin Korunması' },
        { path: '/iletisim', name: 'İletişim' },
        { path: '/tesekkurler', name: 'Teşekkürler' },
    ]

    const contact = [
        { path: 'https://youtube.com/@bilintihaber?si=fTjLEcZ6jSm1TOnZ', name: 'Youtube' },
        { path: 'https://www.instagram.com/bilintihaber?igsh=bTVxcnpycms3bGZr', name: 'Instagram' },
        { path: 'https://www.tiktok.com/@baysungur00?_t=ZS-8vfmmfXj2Yx&_r=1', name: 'TikTok' },
    ]

    return (
        <footer className="w-full bg-[url(/bilinti-3.png)] bg-no-repeat bg-cover bg-fixed" style={{boxShadow: "0px 0px 20px rgba(0,0,0,.7)"}}>
            <div className="w-full h-full bg-[rgba(0,0,0,.6)] p-8 flex justify-center items-center flex-col gap-8">
                <div className="container grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                    <div className="flex flex-col items-start justify-start gap-4 sm:border-r-1 border-white  h-full">
                        <img src="/bilinti-5.png" alt="footer_logo" className="w-full" />
                        <p className="clamp-p text-white self-center">Haberin Nabzı Burada!</p>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-4 lg:border-r-1 border-white h-full">
                        <h5 className="clamp-h5 font-semibold text-white">Haberler</h5>
                        <ul>
                            {news.map((e, k) => (
                                <li key={k}>
                                    <Link
                                        href={e.path}
                                        className="
                                    text-white duration-300 transition whitespace-nowrap clamp-p
                                    hover:text-(--primary)
                                "
                                    >
                                        {e.name} Haberleri
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col items-start justify-start gap-4 sm:border-r-1 border-white h-full">
                        <h5 className="clamp-h5 font-semibold text-white">Hızlı Linkler</h5>
                        <ul>
                            {links.map((e, k) => (
                                <li key={k}>
                                    <Link
                                        href={e.path}
                                        className="
                                    text-white duration-300 transition whitespace-nowrap clamp-p
                                    hover:text-(--primary)
                                "
                                    >
                                        {e.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col items-start justify-start gap-4 h-full">
                        <h5 className="clamp-h5 font-semibold text-white">Bize Ulaşın</h5>
                        <ul>
                            {contact.map((e, k) => (
                                <li key={k}>
                                    <a
                                        href={e.path}
                                        target="_blank"
                                        className="
                                    text-white duration-300 transition whitespace-nowrap clamp-p
                                    hover:text-(--primary)
                                "
                                    >
                                        {e.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start border-t-1 border-white container">
                    <p className="clamp-p text-white mt-4">
                        2025 Bilinti Haber &copy; Tüm Hakları Saklıdır.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer