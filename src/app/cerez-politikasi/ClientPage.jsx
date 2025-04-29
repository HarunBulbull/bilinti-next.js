"use client";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

function ClientPage() {

    return (
        <div className="flex flex-col w-full justify-center items-center py-8">

            <div className="container pb-6">
                <h1 className="clamp-h1 font-bold">Çerez Politikası</h1>

                <div className="flex w-full flex-col sm:gap-6 gap-3">

                    <Breadcrumb
                        items={[
                            {
                                href: '/',
                                title: <HomeOutlined />,
                            },
                            {
                                title: "Çerez Politikası"
                            }
                        ]}
                    />
                    <p className='clamp-p'>
                        Zorunlu Çerezler: Sitemizin temel işlevselliği için gereklidir (örneğin, oturum açma işlemleri).
                        <br /><br />
                        Analitik Çerezler: Ziyaretçi davranışlarını analiz etmek ve site performansını ölçmek için kullanılır (örneğin, Google Analytics).
                        <br /><br />
                        Reklam Çerezleri: İlgi alanlarınıza uygun reklamlar sunmak için kullanılabilir (şu an için Bilinti Haber’de aktif değildir).
                        <br /><br />
                        Çerez Kullanımı: Çerezler, kullanıcı deneyimini kişiselleştirmek, site trafiğini analiz etmek ve hizmetlerimizi geliştirmek için kullanılır. Kişisel bilgileriniz bu çerezlerle paylaşılmaz.
                        <br /><br />
                        Çerezleri Yönetme: Tarayıcı ayarlarınızı değiştirerek çerezleri kabul etmeyi reddedebilir veya silebilirsiniz. Ancak bu, sitemizin bazı işlevlerinin düzgün çalışmamasına neden olabilir.
                        <br /><br />
                        Onay: Sitemizi kullanarak çerez politikamızı kabul etmiş sayılırsınız.
                        <br /><br />
                        Politikamızda değişiklik olursa, bu sayfada güncellenecektir. Sorularınız için <a href="mailto:info@bilintihaber.com" className='text-blue-500'>info@bilintihaber.com</a> adresinden bize ulaşabilirsiniz.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default ClientPage;