"use client";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';


function ClientPage({ initialData }) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;


    return (
        <div className="flex flex-col w-full justify-center items-center py-8">
            <div className="container pb-6 min-h-[50vh]">
                <h1 className="clamp-h1 font-bold">Ekibimiz</h1>

                <div className="flex w-full flex-col sm:gap-6 gap-3">

                    <Breadcrumb
                        items={[
                            {
                                href: '/',
                                title: <HomeOutlined />,
                            },
                            {
                                href: '/ekibimiz',
                                title: "Ekibimiz"
                            },
                            {
                                title: initialData?.data?.fullName
                            }
                        ]}
                    />

                    <div className="grid-cols-[1fr_2fr] gap-8 hidden md:grid mt-6">
                        <img src={`${apiURL}/api/image/${initialData?.data?.image}`} alt="team_image" className='w-full rounded-md shadow-xl sticky top-[100px]' />
                        <div className="flex flex-col">
                            <h3 className='clamp-h3 font-bold'>{initialData?.data?.fullName}</h3>
                            <p className='opacity-70 clamp-p'>{initialData?.data?.job}</p>
                            <p dangerouslySetInnerHTML={{ __html: initialData?.data?.biography }} className='py-4 clamp-p'></p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 md:hidden mt-6">
                        <div className="flex gap-4 items-center">
                            <img src={`${apiURL}/api/image/${initialData?.data?.image}`} alt="team_image" className='w-[25%] aspect-1/1 rounded-[50%] object-cover outline-offset-2 outline' />
                            <div className="flex flex-col">
                                <h3 className='clamp-h3 font-bold'>{initialData?.data?.fullName}</h3>
                                <p className='opacity-70 clamp-p'>{initialData?.data?.job}</p>
                            </div>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: initialData?.data?.biography }} className='py-4 clamp-p'></p>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default ClientPage;