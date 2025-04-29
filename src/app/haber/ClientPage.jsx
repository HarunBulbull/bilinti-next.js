"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { HomeOutlined } from '@ant-design/icons';
import { useParams } from "next/navigation";
import { Breadcrumb, Spin, Input, Button, message } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { EyeFill } from "react-bootstrap-icons";
import Link from 'next/link';
import moment from "moment";

function ClientPage({ initialData }) {
  const [member, setMember] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [comments, setComments] = useState(initialData?.comments || []);
  const [total, setTotal] = useState(initialData?.total || 0);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(initialData?.data || {});
  const replyInputRefs = useRef({});

  useEffect(() => {
    const storedMember = localStorage.getItem("member");
    setMember(storedMember);
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiURL}/api/comments/${data._id}/${index}/${index + 3}`, { method: "GET", });
      const data1 = await response.json();
      if (response.ok) {
        setComments([...comments, data1.comments].flat());
        setTotal(data1.total);
      }
    }
    catch (error) { console.log(error); }
    finally { setLoading(false); }
  }

  useEffect(() => { 
    if (index > 0) { 
      fetchComments() 
    } 
  }, [index]);

  const handleComment = async () => {
    try {
      setSending(true);
      const response = await fetch(`${apiURL}/api/comments`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commentNew: data._id,
          commentMember: member,
          commentContent
        })
      });
      const data1 = await response.json();
      if (response.ok) {
        messageApi.success("Yorum gönderildi!");
        setCommentContent("");

        const newCommentsResponse = await fetch(`${apiURL}/api/comments/${data._id}/0/3`, { method: "GET", });
        const newCommentsData = await newCommentsResponse.json();
        if (newCommentsResponse.ok) {
          setComments(newCommentsData.comments);
          setTotal(newCommentsData.total);
        }
      }
      else { messageApi.error(data1.message) }
    }
    catch (error) { console.log(error); }
    finally { setSending(false); }
  }

  const handleSub = async (id) => {
    try {
      const value = replyInputRefs.current[id]?.resizableTextArea?.textArea?.value || "";
      if (!value.trim()) {
        messageApi.error("Lütfen yanıt içeriği giriniz!");
        return;
      }

      setSending(true);
      const response = await fetch(`${apiURL}/api/comments/sub/${id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          member,
          value
        })
      });
      const data1 = await response.json();
      if (response.ok) {
        messageApi.success("Yanıt gönderildi!");
        if (replyInputRefs.current[id]) {
          replyInputRefs.current[id].resizableTextArea.textArea.value = "";
        }
        const newCommentsResponse = await fetch(`${apiURL}/api/comments/${data._id}/0/3`, { method: "GET", });
        const newCommentsData = await newCommentsResponse.json();
        if (newCommentsResponse.ok) {
          setComments(newCommentsData.comments);
          setTotal(newCommentsData.total);
        }
      }
      else { messageApi.error(data1.message) }
    }
    catch (error) { console.log(error); }
    finally { setSending(false); }
  }

  return (
    <Spin spinning={loading} tip="Yükleniyor..." indicator={<LoadingOutlined spin />} size="large">
      {contextHolder}
      <style>
        {`
          .ant-message {
            z-index: 10000 !important;
          }
        `}
      </style>
      <div className="flex flex-col w-full justify-center items-center">
        <div className='sm:w-[80%] max-w-[1400px] sm:mt-8 w-full mt-0'>
          <img src={apiURL + "/api/image/" + data.newImage} alt="new_image" className="w-full sm:rounded-xl shadow-xl mb-6" />
        </div>
        <div className="container pb-6">
          <div className="flex w-full flex-col sm:gap-6 gap-3">

            <Breadcrumb
              items={[
                {
                  href: '/',
                  title: <HomeOutlined />,
                },
                {
                  href: `/kategori/${data.newCategory}`,
                  title: data.newCategory
                },
                {
                  title: data.newTitle
                }
              ]}
            />

            <h1 className="clamp-h1 font-bold">{data.newTitle}</h1>
            <span className="block w-full h-[2px] bg-linear-to-r from-(--primary) to-(--secondary)"></span>

            <div className="newDetailHtml flex flex-col sm:gap-4 sm:my-4" dangerouslySetInnerHTML={{ __html: data.newContent }}></div>
            <span className="block w-full h-[2px] bg-linear-to-r from-(--secondary) to-(--primary)"></span>

            <div className="flex sm:flex-row flex-col justify-between items-center mt-4">
              <p className="clamp-p"><b className="text-medium">Yazar: </b>{data?.newAuthor?.fullName}</p>
              <div className="flex gap-4">
                <p className="clamp-p">{moment(data.createdAt).format("DD.MM.YYYY H:mm")}</p>
                <span className="w-[1px] h-[20px] bg-black block"></span>
                <p className="clamp-p flex items-center gap-2"><EyeFill /> {data.newViews}</p>
              </div>
            </div>
            <span className="block w-full h-[2px] bg-linear-to-r from-(--secondary) to-(--primary) mt-2"></span>
            <h4 className="clamp-h4 font-bold">Yorumlar</h4>
            {member ?
              <div className="flex flex-col gap-2 mb-8">
                <b>Yorum yap</b>
                <Input.TextArea
                  rows={2}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Yorumunuzu buraya yazınız..."
                />
                <Button
                  loading={sending}
                  onClick={handleComment}
                  type='primary'
                  className='self-end'
                  disabled={!commentContent.trim()}
                >
                  Yorum yap
                </Button>
              </div>
              :
              <b>Yorum yapmak için <Link href='/profil'>giriş yap</Link>.</b>
            }
            {comments.map((c, k) => (
              <div className="flex flex-col g-2 py-6 border-b-1" key={k}>
                <div className="flex justify-between items-center">
                  <b className='clamp-p'>{c?.commentMember?.fullName}:</b>
                  <i className='clamp-p'>{moment(c.createdAt).format("DD/MM/YYYY HH:mm")}</i>
                </div>
                <p className='clamp-p'>{c.commentContent}</p>
                {
                  c.commentSubs && c.commentSubs.length > 0 &&
                  <div className="pl-4 flex flex-col py-4 gap-4">
                    {c.commentSubs.map((s, i) => (
                      <div key={i} className="flex flex-col border-l-1 pl-4">
                        <div className="flex justify-between items-center">
                          <b className='clamp-p'>{s?.member?.name}:</b>
                          <i className='clamp-p'>{moment(s.date).format("DD/MM/YYYY HH:mm")}</i>
                        </div>
                        <p className='clamp-p'>{s.comment}</p>
                      </div>
                    ))}
                  </div>
                }
                {member ?
                  <div className="flex flex-col gap-2 pt-4">
                    <b>Yanıtla</b>
                    <Input.TextArea
                      rows={1}
                      placeholder="Yanıtınızı buraya yazınız..."
                      ref={el => replyInputRefs.current[c._id] = el}
                    />
                    <Button
                      loading={sending}
                      onClick={() => handleSub(c._id)}
                      type='primary'
                      className='self-end'
                    >
                      Yanıtla
                    </Button>
                  </div>
                  :
                  <p>Yanıt vermek için <Link href='/profil'>giriş yap</Link>.</p>
                }
              </div>
            ))}
            {index < total &&
              <Button onClick={() => setIndex(index + 3)}>Daha fazla</Button>
            }
          </div>
        </div>
        <style>
          {`
          .newDetailHtml h1 {font-size: clamp(1.75rem, 1.0536rem + 2.4762vw, 3.375rem);}
          .newDetailHtml h2 {font-size: clamp(1.5625rem, 0.9464rem + 2.1905vw, 3rem);}
          .newDetailHtml h3 {font-size: clamp(1.375rem, 0.8929rem + 1.7143vw, 2.5rem);}
          .newDetailHtml h4 {font-size: clamp(1.1875rem, 0.7857rem + 1.4286vw, 2.125rem);}
          .newDetailHtml h5 {font-size: clamp(1rem, 0.7321rem + 0.9524vw, 1.625rem);}
          .newDetailHtml p, b, li, i{font-size: clamp(0.8125rem, 0.6786rem + 0.4762vw, 1.125rem);}
          .newDetailHtml b{font-weight: bold;}
          .newDetailHtml ol{list-style: inside}
          `}
        </style>
      </div>
    </Spin>
  )
}

export default ClientPage;