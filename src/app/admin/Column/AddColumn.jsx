import { Button, Spin, Form, message, Input } from "antd";
import { token, user } from "../../layouts/GetUserData";
import { LoadingOutlined } from '@ant-design/icons';
import { useState } from "react";

function AddColumn() {
    const [messageApi, contextHolder] = message.useMessage();
    const apiURL = import.meta.env.VITE_API_BASE_URL;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();


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
                        label="İçerik"
                        name="columnContent"
                        rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                        style={{ width: "100%" }}
                    >
                        <Input.TextArea />
                    </Form.Item>


                    <Button className="w-full" type="primary" htmlType="submit" style={{ width: "100%" }}>Kaydet</Button>
                </div>
            </Form>
        </Spin>
    )
}

export default AddColumn