"use client";
import { Button, Spin, Form, message, Input, Select } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { token, user } from "../GetUserData";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import AdminLayout from "../page";


function AddUser() {
    const [messageApi, contextHolder] = message.useMessage();
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useRouter();

    useEffect(() => {
        if (user.role != "admin") {
            navigate.push("/admin");
        }
    }, [user]);

    const onFinish = async (values) => {
        if (values.password != values.passwordAgain) { return messageApi.error("Şifreler uyuşmuyor."); }
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (response.ok) {
                messageApi.success(data.message);
                navigate.push('/admin/kullanicilar');
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

                        <div className="flex sm:flex-row flex-col sm:gap-4">
                            <Form.Item
                                label="Ad Soyad"
                                name="fullName"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="E-posta Adresi"
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

                        <div className="flex sm:flex-row flex-col gap-4">
                            <Form.Item
                                label="Şifre"
                                name="password"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="Şifre Tekrar"
                                name="passwordAgain"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <Input.Password />
                            </Form.Item>
                        </div>

                        <div className="flex sm:flex-row flex-col gap-4 items-center">
                            <Form.Item
                                label="Rol"
                                name="role"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <Select
                                    options={[
                                        { value: "admin", label: "Admin" },
                                        { value: "baseditor", label: "Baş Editör" },
                                        { value: "Yazar", label: "Yazar" }
                                    ]}
                                />
                            </Form.Item>
                            <Button className="adminPanelButton" type="primary" htmlType="submit" style={{ width: "100%" }}>Kaydet</Button>
                        </div>
                    </div>
                </Form>
            </Spin>
        </AdminLayout>
    )
}

export default AddUser