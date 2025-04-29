

import NewCard from "../../Reusable/NewCard/NewCard";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd"

function Likeds({data, loading}) { 



    return (
        <Spin spinning={loading} tip="Yükleniyor..." indicator={<LoadingOutlined spin />} size="large">
            <div className="flex flex-col gap-4 w-full order-1">
                <h4 className="clamp-h4 font-black">Öne Çıkan Haberler</h4>
                <span className="block md:w-150 w-full h-[2px] bg-linear-to-r from-(--primary) to-(--secondary)" />
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-8 gap-6">
                    {data?.map((e, k) => (
                        <NewCard data={e} key={k}/>
                    ))}
                </div>
            </div>
        </Spin>
    )
}

export default Likeds