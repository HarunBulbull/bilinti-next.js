"use client";
import { Button, Form, message, Badge, Spin, Input, Select } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import 'react-quill-new/dist/quill.snow.css';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { token } from "../../GetUserData";
import AdminLayout from "../../page";
import moment from "moment/moment";

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
const Image = dynamic(() => import('../../Image/Image'), { ssr: false });


function Page({ params }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [openImage, setOpenImage] = useState(false);
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState("");
    const [data, setData] = useState(null);
    const navigate = useRouter();
    const [form] = Form.useForm();
    const id = params.id;


    const handleImageSelection = (images) => {
        setImages(images);
        setOpenImage(false)
    };

    const onFinish = async (values) => {
        if (images != "") {
            const formData = {
                newTitle: values.newTitle,
                newImage: images,
                newCategory: values.newCategory,
                newContent: values.newContent,
                newLink: values.newLink,
                newStatus: "Onay bekliyor",
                newSEO: {
                    title: values.metaTitle,
                    description: values.metaDescription,
                    keywords: values.metaKeywords,
                }
            }

            try {
                setLoading(true);
                const response = await fetch(`${apiURL}/api/news/${id}`, {
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
                    navigate.push('/admin/haberlerim');
                }
                else { messageApi.error(data.message); }
            }
            catch (error) {
                console.log(error);
                messageApi.error("Bir hata oluştu: " + error)
            }
            finally { setLoading(false); }
        }
        else {
            messageApi.error("Lütfen bir resim seçin.");
        }
    };


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/api/news/admin/${id}`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                setData(data.data);
                form.setFieldValue("newTitle", data.data.newTitle);
                form.setFieldValue("newCategory", data.data.newCategory);
                form.setFieldValue("newContent", data.data.newContent);
                form.setFieldValue("metaTitle", data.data.newSEO.title);
                form.setFieldValue("metaDescription", data.data.newSEO.description);
                form.setFieldValue("metaKeywords", data.data.newSEO.keywords);
                form.setFieldValue("newLink", data.data.newLink);
                setImages(data.data.newImage);
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
                    <div className="flex justify-between item-center w-full bg-white p-4 mb-6 rounded-md shadow-md">
                        <div className="flex flex-col">
                            <b>Yazar:</b>
                            <p>{data?.newAuthor?.fullName}</p>
                            <p>{data?.newAuthor?.email}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <b>Durum:</b>
                            <Badge
                                status={data?.newStatus === "Onay bekliyor" ? "warning" : (data?.newStatus === "Yayınlandı" ? "success" : "error")}
                                text={data?.newStatus}
                            />
                            <p>{moment(data?.createdAt).format("DD.MM.YYYY H:mm")}</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:gap-4">

                        <div className="flex sm:flex-row flex-col sm:gap-4">
                            <Form.Item
                                label="Başlık"
                                name="newTitle"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Kategori"
                                name="newCategory"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <Select
                                    options={[
                                        { value: "Gündem", label: "Gündem" },
                                        { value: "Spor", label: "Spor" },
                                        { value: "Ekonomi", label: "Ekonomi" },
                                        { value: "Magazin", label: "Magazin" },
                                        { value: "Siyaset", label: "Siyaset" },
                                        { value: "Teknoloji", label: "Teknoloji" },
                                        { value: "Sağlık", label: "Sağlık" },
                                        { value: "Bilim", label: "Bilim" },
                                        { value: "Sanat", label: "Sanat" }
                                    ]}
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="İçerik"
                            name="newContent"
                            rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                            style={{ width: "100%" }}
                        >
                            <ReactQuill style={{
                                backgroundColor: "white"
                            }} />
                        </Form.Item>

                        <div className="flex sm:flex-row flex-col sm:gap-4">
                            <Form.Item
                                label="Meta Başlığı"
                                name="metaTitle"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Meta Açıklaması"
                                name="metaDescription"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <Input />
                            </Form.Item>
                        </div>

                        <div className="flex sm:flex-row flex-col sm:gap-4">
                            <Form.Item
                                label="Etiketler (Virgül ile ayırınız.)"
                                name="metaKeywords"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Haber Bağlantısı"
                                name="newLink"
                                rules={[{ required: true, message: 'Lütfen bu alanı doldurun.' }]}
                                style={{ width: "100%" }}
                            >
                                <Input />
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

export default Page 