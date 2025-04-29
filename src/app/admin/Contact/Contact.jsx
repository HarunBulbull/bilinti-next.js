import { Button, Spin, message, Popconfirm, Collapse } from "antd";
import { token, user } from "../../layouts/GetUserData";
import { LoadingOutlined } from '@ant-design/icons';
import { TrashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function ContactAdmin() {
  const [messageApi, contextHolder] = message.useMessage();
  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role != "admin") {
      navigate("/admin");
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiURL}/api/contact`, {
        method: "GET",
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) { setData(data.data); }
      else { messageApi.error(data.message); }
    }
    catch (error) {
      console.log(error);
      messageApi.error("Bir hata oluştu: " + error)
    }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchData(); }, [])

  const deleteContact = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiURL}/api/contact/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data1 = await response.json();
      if (response.ok) {
        message.success(data1.message);
        const filteredData = data.filter((el) => el._id !== id);
        setData(filteredData)
      }
      else { message.error(data1.message); }
    }
    catch (error) {
      console.log(error);
      messageApi.error("Bir hata oluştu: " + error)
    }
    finally { setLoading(false); }
  }


  return (
    <Spin spinning={loading} tip="Yükleniyor..." indicator={<LoadingOutlined spin />} size="large">
      {contextHolder}
      <div className="flex flex-col gap-4">
        {data.map((d, k) => (
          <Collapse key={k}
            items={[{
              key: '1', label: d.name + " (" + d.email + ")", children:
                <div className="flex gap-2">
                  <p className="w-full">{d.message}</p>
                  <Popconfirm
                    title="Formu Sil"
                    description="Formu silmek istediğinize emin misiniz?"
                    okText="Sil"
                    cancelText="İptal"
                    onConfirm={() => deleteContact(d._id)}
                  >
                    <Button type="primary" danger style={{ alignSelf: "end" }}><TrashFill /></Button>
                  </Popconfirm>
                </div>
            }]}
          />
        ))}
      </div>
    </Spin>
  )
}

export default ContactAdmin