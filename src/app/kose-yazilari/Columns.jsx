"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from "antd";
import moment from "moment";


function Columns() {
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
      const response = await fetch(`${apiURL}/api/column/${index * 10}/${(index + 1) * 10}`, { method: "GET" });
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

  return (
    <div className="flex justify-center items-center gap-4 py-8">
      <div className="container">
        <div className="flex flex-col gap-4">
          <h1 className="clamp-h1 font-bold">Köşe Yazıları</h1>
          <Breadcrumb
              items={[
                {
                  href: '/',
                  title: <HomeOutlined />,
                },
                {
                  title: 'Köşe Yazıları'
                }
              ]}
            />
          {data.length > 0 ? (
            data.map((item, index) => (
              <div 
                key={item.id || index} 
                ref={index === data.length - 1 ? lastElementRef : null}
                style={{backgroundColor: "white"}}
                className="bg-white w-full p-4 shadow-xl rounded-xl"

              >
                
                <h5 className="clamp-h5 font-semibold">{item.columnTitle}</h5>
                <p className="clamp-p">{item.columnContent}</p>
                <div className="flex items-end flex-col sm:flex-row sm:justify-between mt-4">
                  <i className="clamp-p">{item.columnAuthor.fullName}</i>
                  <i className="clamp-p">{moment(item.createdAt).format("DD.MM.YYYY H:mm")}</i>
                </div>
              </div>
            ))
          ) : (!loading &&
            <p>Henüz içerik yok</p>
          )}
          
          {loading && <p>Yükleniyor...</p>}
        </div>
      </div>
    </div>
  );
}

export default Columns;