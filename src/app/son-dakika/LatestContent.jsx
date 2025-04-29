"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Divider } from "antd";
import moment from "moment";
import NewCard from "../../components/Reusable/NewCard/NewCard.jsx";


function LatestContent() {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    const fetchData = async () => {
        try {
            if (loading || !hasMore) return;
            setLoading(true);
            const response = await fetch(`${apiURL}/api/news/latest/${index * 10}/${(index + 1) * 10}`, { method: "GET" });
            const result = await response.json();
            if (response.ok) {
                if (result.data && result.data.length > 0) {
                    setData(prev => [...prev, ...result.data]);
                    if (result.data.length < 10 || data.length + result.data.length >= result.total) {
                        setHasMore(false);
                    }
                } else {
                    setHasMore(false);
                }
            }
        } catch (error) {
            console.log(error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [index]);

    const lastElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setIndex(prevIndex => prevIndex + 1);
                }
            });

            if (node) {
                observer.current.observe(node);
            }
        },
        [loading, hasMore]
    );

    const groupNewsByDate = (news) => {
        const today = moment().startOf('day');
        const groups = {};

        news.forEach(item => {
            try {
                const itemDate = moment(item.createdAt);
                if (!itemDate.isValid()) {
                    console.error("Geçersiz tarih:", item.createdAt);
                    return;
                }

                const itemDay = itemDate.clone().startOf('day');

                let groupKey;
                if (itemDay.isSame(today)) {
                    const hour = itemDate.hour();
                    groupKey = `today-${hour}`;
                } else {
                    groupKey = itemDay.format('YYYY-MM-DD');
                }

                if (!groups[groupKey]) {
                    groups[groupKey] = {
                        rawDate: item.createdAt,
                        momentDate: itemDate,
                        hour: itemDate.hour(),
                        items: []
                    };
                }

                groups[groupKey].items.push(item);
            } catch (error) {
                console.error("Haber gruplaması sırasında hata:", error, item);
            }
        });

        return Object.values(groups).sort((a, b) => {
            try {
                const dateA = a.momentDate;
                const dateB = b.momentDate;
                return dateB.valueOf() - dateA.valueOf();
            } catch (error) {
                console.error("Tarih sıralaması sırasında hata:", error);
                return 0;
            }
        });
    };

    const formatDateHeader = (dateGroup) => {
        try {
            if (!dateGroup || !dateGroup.momentDate) {
                return "Tarih Bilgisi Yok";
            }

            const date = dateGroup.momentDate;
            const today = moment().startOf('day');
            const yesterday = moment().subtract(1, 'day').startOf('day');

            if (date.clone().startOf('day').isSame(today)) {
                const hour = dateGroup.hour;
                const nextHour = (hour + 1) % 24;
                return `Saat ${hour}:00 - ${nextHour}:00`;
            } else if (date.clone().startOf('day').isSame(yesterday)) {
                return 'Dün';
            } else {
                return date.format('DD.MM.YYYY');
            }
        } catch (error) {
            console.error("Tarih formatlaması sırasında hata:", error, dateGroup);
            return "Tarih Bilgisi Yok";
        }
    };

    const groupedNews = groupNewsByDate(data);

    return (
        <div className="flex justify-center items-center gap-4 py-8">
            <div className="container min-h-[100vh]">
                <div className="flex flex-col gap-4">
                    <h1 className="clamp-h1 font-bold">Son Dakika</h1>
                    <Breadcrumb
                        items={[
                            {
                                href: '/',
                                title: <HomeOutlined />,
                            },
                            {
                                title: 'Son Dakika'
                            }
                        ]}
                    />

                    {groupedNews.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {groupedNews.map((group, groupIndex) => (
                                <div key={groupIndex} className="group-container">
                                    <Divider orientation="left" className="font-medium text-lg">
                                        {formatDateHeader(group)}
                                    </Divider>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {group.items.map((item, itemIndex) => (
                                            <div
                                                key={item.id || `${groupIndex}-${itemIndex}`}
                                                ref={(groupIndex === groupedNews.length - 1 &&
                                                    itemIndex === group.items.length - 1) ?
                                                    lastElementRef : null}
                                            >
                                                <NewCard data={item} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (!loading &&
                        <p>Henüz içerik yok</p>
                    )}

                    {loading && <p>Yükleniyor...</p>}
                </div>
            </div>
        </div>
    );
}

export default LatestContent;