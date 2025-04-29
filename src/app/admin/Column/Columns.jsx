import { Button, Table, Radio, message, Badge, Flex, Space, Popconfirm } from "antd";
import { TrashFill, InfoLg } from "react-bootstrap-icons";
import { token, user } from "../../layouts/GetUserData";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment/moment";


function Columns() {
  const [messageApi, contextHolder] = message.useMessage();
  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("all");
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  const [take, setTake] = useState(10);
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
      const response = await fetch(`${apiURL}/api/column/admin/${index}/${take}/${status}`, {
        method: "GET",
        headers: { 'Authorization': `Bearer ${token}` }
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

  useEffect(() => { fetchData(); }, [index, take, status])

  const Columns = [
    {
      title: 'Başlık',
      dataIndex: 'columnTitle',
      key: 'columnTitle',
      render: (text) => <p>{text}</p>
    },
    {
      title: 'Yazar',
      dataIndex: 'columnAuthor',
      key: 'columnAuthor',
      render: (item) => <div className="flex flex-col"><p>{item.fullName}</p><p>{item.email}</p></div>
    },
    {
      title: 'Durum',
      dataIndex: 'columnStatus',
      key: 'columnStatus',
      render: (status) => <Badge status={status === "Onay bekliyor" ? "warning" : (status === "Yayınlandı" ? "success" : "error")} text={status} />
    },
    {
      title: 'Tarih',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => <p>{moment(date).format("DD.MM.YYYY H:mm")}</p>
    },
    {
      title: 'Eylemler',
      dataIndex: '_id',
      key: '_id',
      width: 1,
      render: (id) => (
        <Space>
          <Popconfirm
            title="Köşe Yazısını Sil"
            description="Köşe Yazısını  silmek istediğinize emin misiniz?"
            okText="Sil"
            cancelText="İptal"
            onConfirm={() => deleteColumn(id)}
          >
            <Button type="primary" danger><TrashFill /></Button>
          </Popconfirm>
          <Button type="primary" onClick={() => navigate(`/admin/kose-yazisi-detay/${id}`)}><InfoLg /></Button>
        </Space>
      )
    },
  ];

  const deleteColumn = async (id) => {
    try {
        setLoading(true);
        const response = await fetch(`${apiURL}/api/column/${id}`, {
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
    <Flex vertical className="w-full" gap="large">
      {contextHolder}
      <Radio.Group
        block
        options={[
          {label: "Hepsi", value: "all"},
          {label: "Onay bekliyor", value: "Onay bekliyor"},
          {label: "Yayınlandı", value: "Yayınlandı"},
          {label: "Reddedildi", value: "Reddedildi"}
        ]}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        optionType="button"
        buttonStyle="solid"
      />
      <Table
        pagination={{
          pageSize: take,
          total: total,
          showTotal: (total) => `Toplam: ${total} haber`,
          onChange: (page) => setIndex(page - 1),
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: true,
          onShowSizeChange: (current, size) => {
            setTake(size);
            setIndex(0);
          }
        }}
        dataSource={data}
        columns={Columns}
        rowKey={(record) => record._id}
        loading={loading}
        scroll={{ x: 400 }}
        size="small"
      />
    </Flex>
  )
}

export default Columns