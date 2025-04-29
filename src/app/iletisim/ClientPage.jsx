"use client";
import { Button, Spin, Form, message, Input } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useState } from "react";


function ClientPage() {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();


    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (response.ok) {
                messageApi.success(data.message);
                form.resetFields();
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
        <Spin spinning={loading} tip="Gönderiliyor..." indicator={<LoadingOutlined spin />} size="large">
            {contextHolder}
            <style>
                {`
                    .ant-message {
                        z-index: 10000 !important;
                    }
                `}
            </style>
            <div className="w-full flex justify-center items-center h-[100vh] bg-[url(/map.png)] bg-no-repeat bg-center bg-cover">
                <div className="bg-white shadow-xl p-8 w-[80%] max-w-[1000px] rounded-md">

                    <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        autoComplete="off"
                        onFinish={onFinish}
                    >
                        <div className="flex flex-col sm:gap-4">
                            <h4 className="clamp-h4">Bize Ulaşın</h4>

                            <div className="flex sm:flex-row flex-col sm:gap-4">
                                <Form.Item
                                    label="Adınız"
                                    name="name"
                                    rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                    style={{ width: "100%" }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="E-posta Adresiniz"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Lütfen bu alanı doldurun.' },
                                        { type: 'email', message: 'Geçerli bir e-posta adresi girin.' }
                                    ]}
                                    style={{ width: "100%" }}
                                >
                                    <Input />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="Mesajınız"
                                name="message"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>
                            <Button className="w-full" type="primary" htmlType="submit" style={{ width: "100%" }}>Gönder</Button>
                        </div>
                    </Form>
                </div>
            </div>

        </Spin>
    );
}

export default ClientPage;