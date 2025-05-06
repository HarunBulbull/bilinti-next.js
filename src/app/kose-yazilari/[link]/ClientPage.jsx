"use client";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';


function ClientPage({ initialData }) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;


    return (
        <div className="flex flex-col w-full justify-center items-center py-8">
            <div className="container pb-6 min-h-[50vh]">
                <h1 className="clamp-h1 font-bold">{initialData?.data?.columnTitle}</h1>

                <div className="flex w-full flex-col sm:gap-6 gap-3">

                    <Breadcrumb
                        items={[
                            {
                                href: '/',
                                title: <HomeOutlined />,
                            },
                            {
                                href: '/kose-yazilari',
                                title: "Köşe Yazıları"
                            },
                            {
                                title: initialData?.data?.columnTitle
                            }
                        ]}
                    />

                    <div className="newDetailHtml flex flex-col sm:gap-4 sm:my-4" dangerouslySetInnerHTML={{ __html: initialData?.data?.columnContent }}></div>

                </div>
                <style>
                    {`
                    .newDetailHtml h1 {font-size: clamp(1.75rem, 1.0536rem + 2.4762vw, 3.375rem);}
                    .newDetailHtml h2 {font-size: clamp(1.5625rem, 0.9464rem + 2.1905vw, 3rem);}
                    .newDetailHtml h3 {font-size: clamp(1.375rem, 0.8929rem + 1.7143vw, 2.5rem);}
                    .newDetailHtml h4 {font-size: clamp(1.1875rem, 0.7857rem + 1.4286vw, 2.125rem);}
                    .newDetailHtml h5 {font-size: clamp(1rem, 0.7321rem + 0.9524vw, 1.625rem);}
                    .newDetailHtml p, b, li, i{font-size: clamp(0.8125rem, 0.6786rem + 0.4762vw, 1.125rem);}
                    .newDetailHtml b{font-weight: bold;}
                    .newDetailHtml ol{list-style: inside}
                    `}
                </style>
            </div>

        </div>
    );
}

export default ClientPage;