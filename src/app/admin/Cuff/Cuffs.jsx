import { TrashFill, ArrowClockwise } from "react-bootstrap-icons";
import { Button, Table, message, Space, Popconfirm} from "antd";
import { token, user } from "../../layouts/GetUserData";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function Cuffs() {
  const [messageApi, contextHolder] = message.useMessage();
  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role != "admin" && user.role != "baseditor") {
      navigate("/admin");
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiURL}/api/cuff`, {method: "GET",});
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

  const Columns = [
    {
      title: 'Resim',
      dataIndex: 'cuffImage',
      key: 'cuffImage',
      render: (image) => <img src={apiURL + '/api/image/' + image} style={{ height: "150px" }} />

    },
    {
      title: 'Bağlantı',
      dataIndex: 'cuffPath',
      key: 'cuffPath',
      render: (text) => <p>{text}</p>
    },
    {
      title: 'Sıra',
      dataIndex: 'cuffOrder',
      key: 'cuffOrder',
      render: (text) => <p>{text}</p>
    },
    {
      title: 'Detay',
      dataIndex: '_id',
      key: '_id',
      width: 1,
      render: (id) => (
        <Space>
          <Popconfirm
            title="Manşeti Sil"
            description="Manşeti silmek istediğinize emin misiniz?"
            okText="Sil"
            cancelText="İptal"
            onConfirm={() => deleteCuff(id)}
          >
            <Button type="primary" danger><TrashFill /></Button>
          </Popconfirm>
          <Button type="primary" onClick={() => navigate(`/admin/manset-duzenle/${id}`)}><ArrowClockwise /></Button>
        </Space>

      )
    },
  ];

  const deleteCuff = async (id) => {
    try {
        setLoading(true);
        const response = await fetch(`${apiURL}/api/cuff/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
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
};

  return (
    <>
      {contextHolder}
      <Table
        dataSource={data}
        columns={Columns}
        rowKey={(record) => record._id}
        loading={loading}
        scroll={{ x: 400 }}
        size="small"
      />
    </>
  )
}

export default Cuffs