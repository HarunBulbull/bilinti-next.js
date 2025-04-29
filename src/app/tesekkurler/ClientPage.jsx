"use client";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

function ClientPage() {

    return (
        
        <div className="flex flex-col w-full justify-center items-center py-8">

            <div className="container pb-6">
                <h1 className="clamp-h1 font-bold">Teşekkürler</h1>

                <div className="flex w-full flex-col sm:gap-6 gap-3">

                    <Breadcrumb
                        items={[
                            {
                                href: '/',
                                title: <HomeOutlined />,
                            },
                            {
                                title: "Teşekkürler"
                            }
                        ]}
                    />
                    <p className='clamp-p'>
                        Bilinti Haber’in teknik altyapısını ve kullanıcı dostu tasarımını titizlikle inşa eden, projemizin arkasındaki değerli isim Harun Bülbül’e içten teşekkürlerimizi sunarız. Kendisi, modern teknolojilerle donatılmış bu platformu sıfırdan hayata geçirmemize yardımcı olarak, okurlarımıza sorunsuz ve etkileyici bir deneyim sundu.
                        <br /><br />
                        Harun Bey’in teknik yetkinliği, yaratıcı vizyonu ve özverili çalışma disiplini, Bilinti Haber’in bugünkü başarısının temel taşlarından biridir. Eğer siz de kendisiyle iletişime geçmek veya portfolyosunu incelemek isterseniz, <a href='https://harunbulbul.com' target='_blank' className='text-blue-700 hover:text-blue-500 transition duration-400'>harunbulbul.com</a>'a göz atabilirsiniz. Kendisiyle çalışmak, hem profesyonel hem de insani açıdan büyük bir ayrıcalık!
                        <br /><br />
                        Harun Bey’e tekrar teşekkür eder, nice başarılı projelere imza atmasını dileriz.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default ClientPage;