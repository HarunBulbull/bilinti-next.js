import { Button, Spin, Form, message, Input, Select } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useState } from "react";
import Cookies from 'js-cookie';


function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/api/users/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (response.ok) {
                Cookies.set('user', JSON.stringify(data.data), { expires: 1 / 24 });
                Cookies.set('token', JSON.stringify(data.token), { expires: 1 / 24 });
                messageApi.success(data.message);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
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
        <Spin spinning={loading} tip="Yükleniyor..." indicator={<LoadingOutlined spin />} size="large">
            <div className="w-full h-[100vh] flex justify-center items-center">
                <div className="bg-white w-[90%] max-w-[600px] p-6 shadow-xl flex flex-col items-center rounded-xl gap-4">
                    <img src="/bilinti-5.png" className="max-w-[100px]"/>
                    {contextHolder}
                    <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        autoComplete="off"
                        onFinish={onFinish}
                        style={{ width: "100%" }}
                    >
                        <Form.Item
                            label="E-posta Adresi"
                            name="email"
                            rules={[
                                { required: true, message: 'Lütfen bu alanı doldurun.' },
                                { type: 'email', message: 'Geçerli bir e-posta adresi girin.' }
                            ]}
                            style={{ width: "100%" }}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Şifre"
                            name="password"
                            rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                            style={{ width: "100%" }}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Button className="adminPanelButton" type="primary" htmlType="submit" style={{ width: "100%" }}>Giriş Yap</Button>

                    </Form>
                </div>
            </div>
        </Spin>
    )
}

export default Login