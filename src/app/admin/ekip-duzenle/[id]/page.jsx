"use client";
import { Button, Spin, Form, message, Input, InputNumber } from "antd";
import { token, user } from "../../GetUserData";
import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import 'react-quill-new/dist/quill.snow.css';
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import AdminLayout from "../../page";
import { Image } from "../../Image/Image";

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });


function UpdateTeam({ params }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [openImage, setOpenImage] = useState(false);
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState("");
    const navigate = useRouter();
    const [form] = Form.useForm();
    const id = params.id;

    useEffect(() => {
        if (user.role != "admin") {
            navigate.push("/admin");
        }
    }, [user]);


    const handleImageSelection = (images) => {
        setImages(images);
        setOpenImage(false)
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/api/team/${id}`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                form.setFieldValue("fullName", data.data.fullName);
                form.setFieldValue("job", data.data.job);
                form.setFieldValue("order", data.data.order);
                form.setFieldValue("biography", data.data.biography);
                form.setFieldValue("link", data.data.link);
                setImages(data.data.image);
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
            setLoading(true);
            const response = await fetch(`${apiURL}/api/team/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...values, image: images }),
            });
            const data = await response.json();
            if (response.ok) {
                messageApi.success(data.message);
                navigate.push('/admin/ekip');
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
                {openImage && <Image onClose={() => setOpenImage(false)} onImagesSelected={handleImageSelection} images={images} maxImages={1} />}

                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <div className="flex flex-col sm:gap-4">

                        <div className="flex sm:flex-row flex-col gap-4">
                            <Form.Item
                                label="Ad Soyad"
                                name="fullName"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="İş Tanımı"
                                name="job"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <Input />
                            </Form.Item>
                        </div>

                        <div className="flex sm:flex-row flex-col gap-4">
                            <Form.Item
                                label="Link"
                                name="link"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                                                <Input />

                            </Form.Item>
                            <Form.Item
                                label="Sıra"
                                name="order"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="Biyografi"
                            name="biography"
                            rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                            style={{ width: "100%" }}
                        >
                            <ReactQuill style={{
                                backgroundColor: "white"
                            }} />
                        </Form.Item>



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

export default UpdateTeam