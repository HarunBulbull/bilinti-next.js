import { TrashFill, ArrowClockwise } from "react-bootstrap-icons";
import { Button, Table, message, Space, Popconfirm} from "antd";
import { token, user } from "../../layouts/GetUserData";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function TeamMembers() {
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
      const response = await fetch(`${apiURL}/api/team/admin`, {
        method: "GET",
        headers: {'Authorization': `Bearer ${token}`},
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

  const Columns = [
    {
      title: 'Resim',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={apiURL + '/api/image/' + image} style={{ height: "150px" }} />

    },
    {
      title: 'İsim',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => <p>{text}</p>
    },
    {
      title: 'Sıra',
      dataIndex: 'order',
      key: 'order',
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
            title="Üyeyi Sil"
            description="Üyeyi silmek istediğinize emin misiniz?"
            okText="Sil"
            cancelText="İptal"
            onConfirm={() => deleteMember(id)}
          >
            <Button type="primary" danger><TrashFill /></Button>
          </Popconfirm>
          <Button type="primary" onClick={() => navigate(`/admin/ekip-duzenle/${id}`)}><ArrowClockwise /></Button>
        </Space>

      )
    },
  ];

  const deleteMember = async (id) => {
    try {
        setLoading(true);
        const response = await fetch(`${apiURL}/api/team/${id}`, {
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

export default TeamMembers