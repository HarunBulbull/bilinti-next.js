"use client";
import { Input, message, Button, Spin, Form } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { PersonFill, EnvelopeOpenFill, ClockFill, BoxArrowRight } from "react-bootstrap-icons";
import moment from "moment";


function Info({ member }) {
    const [messageApi, contextHolder] = message.useMessage();
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiURL}/api/members/${member}`, { method: 'GET', });
            const data = await response.json();
            if (response.ok) { setData(data.data); }
            else { messageApi.error(data.message || "Bir hata oluştu!"); }
        } catch (error) {
            messageApi.error("İşlem sırasında bir hata oluştu!");
            console.error(error);
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchData() }, [member]);

    const handleLogout = () => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem("member");
            }
            messageApi.success("Başarıyla çıkış yapıldı!");
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
        catch (error) {
            messageApi.error("İşlem sırasında bir hata oluştu!");
            console.error(error);
        }
    }

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiURL}/api/members/change/${member}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (response.ok) {
                messageApi.success("Şifre başarıyla değiştirildi.");
                form.resetFields();
            }
            else {
                messageApi.error(data.message || "Bir hata oluştu!");
                if(data.message == "Kullanıcı bulunamadı!"){
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem("member");
                    }
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                }
            }
        }
        catch (error) {
            messageApi.error("İşlem sırasında bir hata oluştu!");
            console.error(error);
        }
        finally {setLoading(false);}
    };


    return (
        <Spin spinning={loading} tip="Yükleniyor..." indicator={<LoadingOutlined spin />} size="large">

            <div className="flex items-center justify-center py-24">
                {contextHolder}
                <style>
                    {`
                    .ant-message {
                        z-index: 10000 !important;
                    }
                `}
                </style>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="bg-white shadow-xl rounded-xl flex flex-col p-4 relative overflow-hidden">
                                <b className="clamp-p">İsim Soyisim</b>
                                <p className="clamp-p">{data?.fullName}</p>
                                <PersonFill className="h-[50px] w-[50px] absolute right-0 bottom-0 opacity-30 transform-[translate(.5rem,.5rem)]" />
                            </div>

                            <div className="bg-white shadow-xl rounded-xl flex flex-col p-4 relative overflow-hidden">
                                <b className="clamp-p">E-Posta</b>
                                <p className="clamp-p">{data?.email}</p>
                                <EnvelopeOpenFill className="h-[50px] w-[50px] absolute right-0 bottom-0 opacity-30 transform-[translate(.5rem,.5rem)]" />
                            </div>

                            <div className="bg-white shadow-xl rounded-xl flex flex-col p-4 relative overflow-hidden">
                                <b className="clamp-p">Kayıt Tarihi</b>
                                <p className="clamp-p">{moment(data?.createdAt).format("DD/MM/YYYY HH:mm")}</p>
                                <ClockFill className="h-[50px] w-[50px] absolute right-0 bottom-0 opacity-30 transform-[translate(.5rem,.5rem)]" />
                            </div>

                            <button className="bg-red-100 shadow-xl rounded-xl flex gap-4 justify-center items-center p-4 relative overflow-hidden cursor-pointer transition duration-400 hover:bg-red-200" onClick={() => handleLogout()}>
                                <b className="text-red-900 clamp-p">Çıkış Yap</b>
                                <BoxArrowRight className="text-red-900 h-[20px] w-[20px]" />
                            </button>
                        </div>

                        <div className="bg-white shadow-xl rounded-xl flex flex-col p-4 relative overflow-hidden">
                            <h5 className="clamp-h5">Şifreni Değiştir</h5>
                            <Form
                                form={form}
                                name="authForm"
                                onFinish={handleSubmit}
                                layout="vertical"
                                className="w-full"
                                validateTrigger={["onBlur", "onChange"]}
                            >
                                <Form.Item
                                    name="password"
                                    label="Şifreniz"
                                    className="w-full"
                                    rules={[
                                        { required: true, message: "Lütfen şifrenizi giriniz!" },
                                        { min: 6, message: "Şifre en az 6 karakter olmalıdır!" }
                                    ]}
                                >
                                    <Input.Password className="clamp-p w-full" placeholder="*******" />
                                </Form.Item>
                                <Form.Item
                                    name="newPassword"
                                    label="Yeni Şifreniz"
                                    className="w-full"
                                    rules={[
                                        { required: true, message: "Lütfen yeni şifrenizi giriniz!" },
                                        { min: 6, message: "Şifre en az 6 karakter olmalıdır!" }
                                    ]}
                                >
                                    <Input.Password className="clamp-p w-full" placeholder="*******" />
                                </Form.Item>
                                <Form.Item
                                    name="confirmPassword"
                                    label="Tekrar Yeni Şifreniz"
                                    className="w-full"
                                    dependencies={['newPassword']}
                                    rules={[
                                        { required: true, message: "Lütfen yeni şifrenizi tekrar giriniz!" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Şifreler eşleşmiyor!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password className="clamp-p" placeholder="*******" />
                                </Form.Item>
                                <Form.Item className="w-full margin-0">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="w-full"
                                        loading={loading}
                                    >
                                        Şifreyi Değiştir
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        </Spin>

    );
}

export default Info;