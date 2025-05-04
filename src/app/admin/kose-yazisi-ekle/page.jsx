"use client";
import { Button, Spin, Form, message, Input } from "antd";
import { token, user } from "../GetUserData";
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminLayout from "../page";
import 'react-quill-new/dist/quill.snow.css';

import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });


function AddColumn() {
    const [messageApi, contextHolder] = message.useMessage();
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useRouter();


    const onFinish = async (values) => {
        try {
            const formData = {
                ...values,
                columnAuthor: user._id
            }
            setLoading(true);
            const response = await fetch(`${apiURL}/api/column`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                messageApi.success(data.message);
                form.resetFields();
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

export default AddColumn