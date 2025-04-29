"use client";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

function ClientPage() {

    return (
        <div className="flex flex-col w-full justify-center items-center py-8">

            <div className="container pb-6">
                <h1 className="clamp-h1 font-bold">Gizlilik Politikası</h1>

                <div className="flex w-full flex-col sm:gap-6 gap-3">

                    <Breadcrumb
                        items={[
                            {
                                href: '/',
                                title: <HomeOutlined />,
                            },
                            {
                                title: "Gizlilik Politikası"
                            }
                        ]}
                    />
                    <p className='clamp-p'>
                        Bilinti Haber olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası, sitemizi ziyaret ettiğinizde kişisel bilgilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
                        <br /><br />
                        Toplanan Bilgiler: Sitemizi ziyaret ettiğinizde, IP adresiniz, tarayıcı bilgileriniz ve ziyaret süreleriniz gibi standart veriler otomatik olarak toplanabilir. Eğer bir form doldurur veya yorum yaparsanız, verdiğiniz bilgiler (ad, e-posta vb.) kaydedilebilir.
                        <br /><br />
                        Bilgilerin Kullanımı: Topladığımız bilgiler, sitemizin işlevselliğini artırmak, kullanıcı deneyimini iyileştirmek ve istatistiksel analizler yapmak için kullanılır. Kişisel bilgileriniz asla üçüncü taraflarla paylaşılmaz, satılmaz veya kiralanmaz.
                        <br /><br />
                        Güvenlik: Kişisel verilerinizin güvenliğini sağlamak için gerekli teknik ve idari önlemleri alıyoruz. Ancak, internet üzerinden veri iletiminin tamamen güvenli olmadığını hatırlatırız.
                        <br /><br />
                        Çerezler: Sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır. Çerez Politikası sayfamızdan detaylı bilgi alabilirsiniz.
                        <br /><br />
                        Haklarınız: Kişisel verilerinizle ilgili bilgi alma, düzeltme veya silme talebinde bulunabilirsiniz. Bu talepler için <a href="mailto:info@bilintihaber.com" className='text-blue-500'>info@bilintihaber.com</a> adresine başvurabilirsiniz.
                        <br /><br />
                        Bu politikayı, gizlilik haklarınızı korumak ve şeffaf bir şekilde bilgilendirmek amacıyla hazırladık. Politikamızda değişiklik olması durumunda, bu sayfada güncelleme yapılacaktır.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default ClientPage;