"use client";
import { Button, Spin, Form, message, Input, InputNumber } from "antd";
import { token, user } from "../GetUserData";
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminLayout from "../page";

import dynamic from 'next/dynamic';

const Image = dynamic(() => import('../Image/Image'), { ssr: false });


function AddCuff() {
    const [messageApi, contextHolder] = message.useMessage();
    const [openImage, setOpenImage] = useState(false);
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState("");
    const navigate = useRouter();
    const [form] = Form.useForm();

    useEffect(() => {
        if (user.role != "admin" && user.role != "baseditor") {
          navigate.push("/admin");
        }
      }, [user]);


    const handleImageSelection = (images) => {
        setImages(images);
        setOpenImage(false)
    };


    const onFinish = async (values) => {
        if(images != ""){
            const formData = {
                ...values,
                cuffImage: images
            }
            try {
                setLoading(true);
                const response = await fetch(`${apiURL}/api/cuff`, {
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
                    navigate.push('/admin/mansetler');
                }
                else { messageApi.error(data.message); }
            }
            catch (error) {
                console.log(error);
                messageApi.error("Bir hata oluştu: " + error)
            }
            finally { setLoading(false); }
        }
        else{
            messageApi.error("Lütfen bir resim seçin.");
        }
    };

    return (
        <AdminLayout>
        <Spin spinning={loading} tip="Yükleniyor..." indicator={<LoadingOutlined spin />} size="large">
            {contextHolder}
            {openImage && <Image onClose={() => setOpenImage(false)} onImagesSelected={handleImageSelection} images={images} maxImages={1} />}
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
                            label="Yönlendirilecek Link"
                            name="cuffPath"
                            rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Sıra"
                            name="cuffOrder"
                            rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                            style={{ width: "100%" }}
                        >
                            <InputNumber style={{ width: "100%" }}/>
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-4 w-full">
                            <Button className="w-full" type="primary" onClick={() => setOpenImage(true)} style={{ width: "100%" }}>Resim Seç</Button>
                            {images != "" ?
                                <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
                                    {images.split("\n").map((img, key) => (
                                        img && <img src={apiURL + '/api/image/' + img} key={key} style={{ width: "100%" }} />
                                    ))}
                                </div>
                                :
                                <h4>Resim seçilmemiş.</h4>
                            }
                        </div>
                        <Button className="w-full" type="primary" htmlType="submit" style={{ width: "100%" }}>Kaydet</Button>
                    </div>
                </div>
            </Form>
        </Spin>
        </AdminLayout>
    )
}

export default AddCuff