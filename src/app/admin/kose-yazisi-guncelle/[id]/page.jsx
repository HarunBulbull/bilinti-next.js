"use client"
import { Button, Spin, Form, message, Input, Badge } from "antd";
import { token } from "../../GetUserData";
import { LoadingOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import AdminLayout from "../../page";
import 'react-quill-new/dist/quill.snow.css';

import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });


function UpdateColumn({params}) {
    const [messageApi, contextHolder] = message.useMessage();
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const navigate = useRouter();
    const [form] = Form.useForm();


    const id = params.id;

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/api/column/admin/${id}`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                setData(data.data);
                form.setFieldValue("columnTitle", data.data.columnTitle);
                form.setFieldValue("columnLink", data.data.columnLink);
                form.setFieldValue("columnContent", data.data.columnContent);
            }
            else { messageApi.error(data.message); }
        }
        catch (error) {
            console.log(error);
            messageApi.error("Bir hata oluştu: " + error)
        }
        finally { setLoading(false); }
    }

    useEffect(() => { fetchData(); }, [])



    const onFinish = async (values) => {
        try {
            const formData = {
                ...values,
                columnStatus: "Onay bekliyor", 
            }
            setLoading(true);
            const response = await fetch(`${apiURL}/api/column/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                messageApi.success(data.message);
                navigate.push('/admin/kose-yazilarim'); 
            }
            else { messageApi.error(data.message); }
        }
        catch (error) {
            console.log(error);
            messageApi.error("Bir hata oluştu: " + error)
        }
        finally { setLoading(false); }
    };

    return (
        <AdminLayout>
        <Spin spinning={loading} tip="Yükleniyor..." indicator={<LoadingOutlined spin />} size="large">
            {contextHolder}
            <Form
                form={form}
                name="basic"
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
            >
                <div className="flex justify-between item-center w-full bg-white p-4 mb-6 rounded-md shadow-md">
                    <div className="flex flex-col">
                        <b>Yazar:</b>
                        <p>{data?.columnAuthor?.fullName}</p>
                        <p>{data?.columnAuthor?.email}</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <b>Durum:</b>
                        <Badge
                            status={data?.columnStatus === "Onay bekliyor" ? "warning" : (data?.columnStatus === "Yayınlandı" ? "success" : "error")}
                            text={data?.columnStatus}
                        />
                        <p>{moment(data?.createdAt).format("DD.MM.YYYY H:mm")}</p>
                    </div>
                </div>
                <div className="flex flex-col sm:gap-4">

                    <Form.Item
                        label="Başlık"
                        name="columnTitle"
                        rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                        style={{ width: "100%" }}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Link"
                        name="columnLink"
                        rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                        style={{ width: "100%" }}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="İçerik"
                        name="columnContent"
                        rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                        style={{ width: "100%" }}
                    >
                        <ReactQuill style={{
                            backgroundColor: "white"
                        }} />
                    </Form.Item>


                    <Button className="w-full" type="primary" htmlType="submit" style={{ width: "100%" }}>Kaydet</Button>

                </div>
            </Form>
        </Spin>
        </AdminLayout>
    )
}

export default UpdateColumn