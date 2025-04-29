"use client";
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Breadcrumb, Spin } from 'antd';
import { XLg } from 'react-bootstrap-icons';


function ClientPage() {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [selected, setSelected] = useState(null);
    const [opened, setOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/api/team`, { method: "GET", });
            const data = await response.json();
            if (response.ok) { setData(data.data); }
        }
        catch (error) { console.log(error); }
        finally { setLoading(false); }
    }

    useEffect(() => { fetchData(); }, [])

    return (
        <div className="flex flex-col w-full justify-center items-center py-8">
            <div className="container pb-6">
                <h1 className="clamp-h1 font-bold">Ekibimiz</h1>

                <div className="flex w-full flex-col sm:gap-6 gap-3">

                    <Breadcrumb
                        items={[
                            {
                                href: '/',
                                title: <HomeOutlined />,
                            },
                            {
                                title: "Ekibimiz"
                            }
                        ]}
                    />

                    <Spin spinning={loading} tip="Yükleniyor..." indicator={<LoadingOutlined spin />} size="large">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8 gap-4">
                            {data.map((d, k) => (
                                <div onClick={() => { setSelected(d); setOpened(true) }} className="bg-white flex flex-col items-center cursor-pointer shadow-xl hover:bg-gray-200 transition duration-300" key={k}>
                                    <img src={apiURL + "/api/image/" + d.image} className='aspect-3/4 w-full object-cover opacity-90' alt={d.fullName} />
                                    <b className='clamp-p mt-2'>{d.fullName}</b>
                                    <i className='clamp-h6 mb-2'>{d.job}</i>
                                </div>
                            ))}
                        </div>
                    </Spin>
                    <div className={opened ?
                        'transform-[translateX(0)] transition duration-300 w-[350px] h-full fixed top-0 right-0 gap-4 bg-white z-999 shadow-xl pt-[120px] flex flex-col items-center overflow-y-scroll'
                        :
                        'transform-[translateX(100%)] transition duration-300 w-[350px] h-full fixed top-0 right-0 gap-4 bg-white z-999 shadow-xl pt-[120px] flex flex-col items-center overflow-y-scroll'
                    }>
                        <p className='cursor-pointer self-end'><XLg onClick={() => { setOpened(false); setTimeout(() => { setSelected(null) }, 300); }} className='w-5 h-5' /></p>
                        <img src={apiURL + "/api/image/" + selected?.image} className='w-[100px] h-[100px] object-cover rounded-[50%] outline-1 outline-offset-2 outline-(--primary)' alt="selected" />
                        <h6 className='clamp-p font-bold'>{selected?.fullName}</h6>
                        <p dangerouslySetInnerHTML={{ __html: selected?.biography }} className='p-4'></p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ClientPage;