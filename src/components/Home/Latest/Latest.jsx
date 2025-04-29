import NewCard from "../../Reusable/NewCard/NewCard";
import { ArrowUpRight } from "react-bootstrap-icons";
import { LoadingOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link'
import { useRef } from "react";
import { Spin } from "antd";
import 'swiper/css';


function Latest({ data, loading }) {
    const swiperRef = useRef(null);


    return (
        <Spin spinning={loading} tip="Yükleniyor..." indicator={<LoadingOutlined spin />} size="large">
            <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between items-center">
                    <h4 className="clamp-h4 font-black">Son Dakika</h4>
                    <Link href='/son-dakika' style={{ color: "black" }} className="flex items-center gap-2 opacity-70 transition duration:300 hover:opacity-100">Tüm Son Dakika Haberleri <ArrowUpRight /></Link>
                </div>
                <Swiper
                    grabCursor={true}
                    slidesPerView={4.5}
                    breakpoints={{ 
                        0: { slidesPerView: 1.5 },
                        768: { slidesPerView: 2.5 },
                        1024: { slidesPerView: 3.5 },
                        1350: { slidesPerView: 4.5 }
                    }}
                    spaceBetween={20}
                    loop={true}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    className="swiper-wrapper"
                    style={{ paddingBottom: "1rem" }}
                >
                    {data?.map((e, k) => (
                        <SwiperSlide key={k} className="swiper-slide">
                            <NewCard data={e} />
                        </SwiperSlide>
            
                    ))}

                </Swiper>
            </div>
        </Spin>
    )
}

export default Latest