
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import Link from 'next/link'
import { Spin } from "antd"
import moment from 'moment';

const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent.substring(0,200) + '...' || tmp.innerText.substring(0,200) + '...' || '';
  };
  

function Column() {
    const apiURL =  process.env.NEXT_PUBLIC_API_URL;;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/api/column/homePage`, { method: "GET", });
            const data = await response.json();
            if (response.ok) { setData(data.data); }
        }
        catch (error) { console.log(error); }
        finally { setLoading(false); }
    }

    useEffect(() => { fetchData(); }, [])

    return (

        <div className="flex flex-col gap-4 w-full lg:items-end items-start lg:sticky top-24 lg:order-2 order-0">
            <h4 className="clamp-h4 font-black">Günün Yazısı</h4>
            <span className="block lg:w-50 md:w-100 w-full h-[2px] bg-linear-to-r from-(--secondary) to-(--primary)" />
            <Spin spinning={loading} tip="Yükleniyor..." indicator={<LoadingOutlined spin />} size="large">
                <div className="bg-white w-full shadow-md flex flex-col rounded-md hover:shadow-lg transition duration-300 p-4">
                    {data ? 
                    <Link href={`/kose-yazilari/${data?.columnLink}`} style={{color: "black"}}>
                        <b className="clamp-p">{data?.columnTitle}</b>
                        <p className="clamp-p">{stripHtml(data?.columnContent)}</p>
                        <div className="flex justify-between mt-4">
                            <i style={{fontSize: "12px"}}>{data?.columnAuthor?.fullName}</i>
                            <i style={{fontSize: "12px"}}>{moment(data?.createdAt).format("DD.MM.YYYY")}</i>  
                        </div>
                    </Link>
                    :
                    <p className='clamp-p'>Bugün için köşe yazısı henüz eklenmedi. :(</p>
                    }
                </div>
            </Spin>
            <Link
                href='/kose-yazilari'
                className="
                    bg-white shadow-md lg:w-full lg:p-4 py-4 px-12 text-center font-semibold clamp-p rounded-md transition duration-300
                    hover:bg-(--secondary) hover:text-white
                "
            >
                Tüm Köşe Yazıları
            </Link>
        </div>
    )
}

export default Column