'use client';

import { useEffect, useState, useRef, useCallback } from "react";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import NewCard from "@/components/Reusable/NewCard/NewCard";

function ClientPage({ initialData, searchValue }) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(initialData?.data || []);
  const [total, setTotal] = useState(initialData?.total || 0);
  const observer = useRef();

  const fetchData = async () => {
    try {
      if (loading || !hasMore) return;
      setLoading(true);
      const encodedValue = encodeURIComponent(searchValue);
      const response = await fetch(`${apiURL}/api/news/search/${encodedValue}/${index * 10}/${(index + 1) * 10}`, { method: "GET" });
      const result = await response.json();
      if (response.ok) {
        if (result.data && result.data.length > 0) {
          setData(prev => [...prev, ...result.data]);
          setTotal(result.total || 0);
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
    setData(initialData?.data || []);
    setTotal(initialData?.total || 0);
    setHasMore(initialData?.data?.length === 10);
    setIndex(0);
  }, [searchValue, initialData]);

  useEffect(() => {
    if (index > 0 && hasMore) {
      fetchData();
    }
  }, [index, hasMore]);

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
          <h1 className="clamp-h1 font-bold">Ara: {searchValue}</h1>
          <Breadcrumb
            items={[
              {
                href: '/',
                title: <HomeOutlined />,
              },
              {
                title: "Haber ara: " + searchValue
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

          {loading && (
            <div className="flex justify-center items-center py-8">
              <Spin tip="Yükleniyor..." indicator={<LoadingOutlined spin />} size="large" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientPage; 