"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { HomeOutlined } from '@ant-design/icons';
import { useParams } from "next/navigation";
import { Breadcrumb } from "antd";
import NewCard from "@/components/Reusable/NewCard/NewCard";


function ClientPage() {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const params = useParams();
  const observer = useRef();

  const validCategories = [
    {link: "gundem", name: "Gündem"},
    {link: "spor", name: "Spor"},
    {link: "ekonomi", name: "Ekonomi"},
    {link: "magazin", name: "Magazin"},
    {link: "siyaset", name: "Siyaset"},
    {link: "teknoloji", name: "Teknoloji"},
    {link: "saglik", name: "Sağlık"},
    {link: "bilim", name: "Bilim"},
    {link: "sanat", name: "Sanat"}
  ];

  const fetchData = async () => {
    try {
      if (loading || !hasMore) return;
      setLoading(true);
      const response = await fetch(`${apiURL}/api/news/category/${validCategories.find((el) => el.link === params.kategori).name}/${index * 10}/${(index + 1) * 10}`, { method: "GET" });
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
    setData([]);
    setHasMore(true);
    setIndex(0);
  }, [params.kategori]);

  useEffect(() => {
    if(hasMore){
      fetchData();
    }
  }, [index, params.kategori, hasMore]); 

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

  return (
    <div className="flex justify-center items-center gap-4 py-8">
      <div className="container">
        <div className="flex flex-col gap-4 min-h-[100vh]">
          <h1 className="clamp-h1 font-bold">{validCategories.find((el) => el.link === params.kategori).name} Haberleri</h1>
          <Breadcrumb
            items={[
              {
                href: '/',
                title: <HomeOutlined />,
              },
              {
                title: validCategories.find((el) => el.link === params.kategori).name + " Haberleri"
              }
            ]}
          />
          {data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data.map((item, index) => (
                <div
                  key={item.id || index}
                  ref={index === data.length - 1 ? lastElementRef : null}
                >
                  <NewCard data={item} />
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

export default ClientPage;