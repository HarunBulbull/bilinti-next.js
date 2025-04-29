import { TrashFill, ArrowClockwise } from "react-bootstrap-icons";
import { Button, Table, Space, Popconfirm, message } from "antd";
import { token, user } from "../../layouts/GetUserData";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function UserList() {
    const [messageApi, contextHolder] = message.useMessage();
    const apiURL = import.meta.env.VITE_API_BASE_URL;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(user.role != "admin"){
            navigate("/admin");
        }
    }, [user]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/api/users`, { 
                method: "GET",
                headers: {'Authorization': `Bearer ${token}`}
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
            title: 'İsim',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <p>{text}</p>
        },
        {
            title: 'E-posta',
            dataIndex: 'mail',
            key: 'mail',
            render: (text) => <p>{text}</p>
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
            render: (text) => <p>{text}</p>
        },
        {
            title: 'Eylemler',
            dataIndex: 'actions',
            key: 'actions',
            width: 1,
            render: (_, record, index) => (
                <Space>
                    <Popconfirm
                        title="Kullanıcıyı Sil"
                        description="Kullanıcıyı silmek istediğinize emin misiniz?"
                        okText="Sil"
                        cancelText="İptal"
                        onConfirm={() => deleteUser(record._id)}
                    >
                        <Button type="primary" danger><TrashFill /></Button>
                    </Popconfirm>
                    <Button type="primary" onClick={() => navigate(`/admin/kullanici-duzenle/${record._id}`)}><ArrowClockwise /></Button>
                </Space>

            )
        },
    ];

    const deleteUser = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/api/users/${id}`, {
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
            <Table dataSource={data} columns={Columns} rowKey={(record) => record._id} loading={loading} scroll={{ x: 400 }} size="small" />
        </>
    )
}

export default UserList