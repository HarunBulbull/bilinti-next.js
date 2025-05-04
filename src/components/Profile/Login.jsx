"use client";
import { Input, message, Button, Checkbox, Form } from "antd";
import Link from "next/link";
import { useState } from "react";


function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(false);
    const [section, setSection] = useState("Giriş Yap");
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const endpoint = section === "Giriş Yap"
                ? `${apiURL}/api/members/login`
                : `${apiURL}/api/members/register`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok) {
                messageApi.success(section === "Giriş Yap"
                    ? "Başarıyla giriş yapıldı!"
                    : "Kayıt işlemi başarıyla tamamlandı!"
                );
                if(section === "Giriş Yap"){
                    if (typeof window !== 'undefined') {
                        localStorage.setItem("member", data.data._id);
                    }
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                }
                else{
                    form.resetFields();
                    setSection("Giriş Yap");
                }
            } else {
                messageApi.error(data.message || "Bir hata oluştu!");
            }
        } catch (error) {
            messageApi.error("İşlem sırasında bir hata oluştu!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSectionChange = (newSection) => {
        form.resetFields();
        setSection(newSection);
    };

    return (
            <div className="flex items-center justify-center py-24">
                {contextHolder}
                <style>
                    {`
                    .ant-message {
                        z-index: 10000 !important;
                    }
                `}
                </style>
                <div className="bg-white w-[80%] max-w-[500px] shadow-xl flex flex-col gap-4 items-center">
                    <div className="flex w-full">
                        <button
                            className={`w-full h-[50px] cursor-pointer ${section !== "Giriş Yap" && "bg-gray-200 rounded-br-xl inset-shadow-sm text-gray-400"}`}
                            onClick={() => handleSectionChange("Giriş Yap")}
                        >
                            Giriş Yap
                        </button>
                        <button
                            className={`w-full h-[50px] cursor-pointer ${section !== "Kayıt Ol" && "bg-gray-200 rounded-bl-xl inset-shadow-sm text-gray-400"}`}
                            onClick={() => handleSectionChange("Kayıt Ol")}
                        >
                            Kayıt Ol
                        </button>
                    </div>
                    <h5 className="clamp-h5 font-bold">{section}</h5>

                    <Form
                        form={form}
                        name="authForm"
                        onFinish={handleSubmit}
                        layout="vertical"
                        className="w-[80%] max-w-[500px] flex flex-col gap-4 items-center pb-6"
                        validateTrigger={["onBlur", "onChange"]}
                    >
                        {section === "Kayıt Ol" && (
                            <Form.Item
                                name="fullName"
                                label="Adınız Soyadınız"
                                className="w-full"
                                rules={[
                                    { required: true, message: "Lütfen adınızı ve soyadınızı giriniz!" },
                                ]}
                            >
                                <Input className="clamp-p" placeholder="Ad Soyad" />
                            </Form.Item>
                        )}

                        <Form.Item
                            name="email"
                            label="E-posta Adresiniz"
                            className="w-full"
                            rules={[
                                { required: true, message: "Lütfen e-posta adresinizi giriniz!" },
                                { type: "email", message: "Lütfen geçerli bir e-posta adresi giriniz!" }
                            ]}
                        >
                            <Input className="clamp-p" placeholder="email@mail.com" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Şifreniz"
                            className="w-full"
                            rules={[
                                { required: true, message: "Lütfen şifrenizi giriniz!" },
                                { min: 6, message: "Şifre en az 6 karakter olmalıdır!" }
                            ]}
                        >
                            <Input.Password className="clamp-p" placeholder="*******" />
                        </Form.Item>

                        {section === "Kayıt Ol" && (
                            <>
                                <Form.Item
                                    name="confirmPassword"
                                    label="Tekrar Şifreniz"
                                    className="w-full"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: "Lütfen şifrenizi tekrar giriniz!" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Şifreler eşleşmiyor!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password className="clamp-p" placeholder="*******" />
                                </Form.Item>

                                <Form.Item
                                    name="termsAgreed"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value ? Promise.resolve() : Promise.reject(new Error('Kullanım şartlarını kabul etmelisiniz!'))
                                        }
                                    ]}
                                    style={{ alignSelf: "start", marginBottom: "8px" }}
                                >
                                    <Checkbox>
                                        <Link href="/kullanim-sartlari" target="_blank">Kullanım Şartlarını</Link>,{" "}
                                        <Link href="/gizlilik-politikasi" target="_blank">Gizlilik Politikasını</Link> ve{" "}
                                        <Link href="/cerez-politikasi" target="_blank">Çerez Politikasını</Link> okudum ve kabul ediyorum.
                                    </Checkbox>
                                </Form.Item>

                                <Form.Item
                                    name="kvkkAgreed"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value ? Promise.resolve() : Promise.reject(new Error('KVKK metnini kabul etmelisiniz!'))
                                        }
                                    ]}
                                    style={{ alignSelf: "start" }}
                                >
                                    <Checkbox>
                                        <Link href="/kvkk" target="_blank">KVKK metnini</Link> okudum ve kabul ediyorum.
                                    </Checkbox>
                                </Form.Item>
                            </>
                        )}

                        <Form.Item className="w-full margin-0">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                                loading={loading}
                            >
                                {section}
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
    );
}

export default Login;