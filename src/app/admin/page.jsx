"use client";
import { useRouter } from 'next/navigation'
import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Person,
  List,
  BoxArrowLeft,
  FileEarmark,
  Newspaper,
  BlockquoteLeft,
  People,
  Telephone
} from 'react-bootstrap-icons';
import Cookies from 'js-cookie';
import Login from "./Login/Login";
import { user } from './GetUserData'


const { Sider, Header, Content } = Layout;


function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(typeof window !== 'undefined' ? (window.innerWidth > 768 ? false : true) : true);
  const navigate = useRouter();

  const adminItems = [
    {
      key: "1",
      icon: <Person />,
      label: "Kullanıcılar",
      path: "/",
      children: [
        {
          key: "2",
          label: "Kullanıcı Listesi",
          path: "/admin/kullanicilar",
          onClick: () => {
            navigate.push(`/admin/kullanicilar`);
          },
        },
        {
          key: "3",
          label: "Kullanıcı Ekle",
          path: "/admin/kullanici-ekle",
          onClick: () => {
            navigate.push("/admin/kullanici-ekle");
          },
        },
      ],
    },
    {
      key: "4",
      icon: <FileEarmark />,
      label: "Haberler",
      path: "/",
      children: [
        {
          key: "5",
          label: "Haber Listesi",
          path: "/admin/haberler",
          onClick: () => {
            navigate.push(`/admin/haberler`);
          },
        },
        {
          key: "6",
          label: "Haberlerim",
          path: "/admin/haberlerim",
          onClick: () => {
            navigate.push(`/admin/haberlerim`);
          },
        },
        {
          key: "7",
          label: "Haber Ekle",
          path: "/admin/haber-ekle",
          onClick: () => {
            navigate.push("/admin/haber-ekle");
          },
        },
      ],
    },
    {
      key: "8",
      icon: <Newspaper />,
      label: "Manşetler",
      path: "/",
      children: [
        {
          key: "9",
          label: "Manşetler",
          path: "/admin/mansetler",
          onClick: () => {
            navigate.push(`/admin/mansetler`);
          },
        },
        {
          key: "10",
          label: "Manşet Ekle",
          path: "/admin/manset-ekle",
          onClick: () => {
            navigate.push("/admin/manset-ekle");
          },
        },
      ],
    },
    {
      key: "11",
      icon: <BlockquoteLeft />,
      label: "Köşe Yazıları",
      path: "/",
      children: [
        {
          key: "12",
          label: "Köşe Yazıları",
          path: "/admin/kose-yazilari",
          onClick: () => {
            navigate.push(`/admin/kose-yazilari`);
          },
        },
        {
          key: "13",
          label: "Köşe Yazılarım",
          path: "/admin/kose-yazilarim",
          onClick: () => {
            navigate.push(`/admin/kose-yazilarim`);
          },
        },
        {
          key: "14",
          label: "Köşe Yazısı Ekle",
          path: "/admin/kose-yazisi-ekle",
          onClick: () => {
            navigate.push("/admin/kose-yazisi-ekle");
          },
        },
      ],
    },
    {
      key: "14",
      icon: <People />,
      label: "Ekip",
      path: "/",
      children: [
        {
          key: "15",
          label: "Ekip Üyeleri",
          path: "/admin/ekip",
          onClick: () => {
            navigate.push(`/admin/ekip`);
          },
        },
        {
          key: "16",
          label: "Ekip Üyesi Ekle",
          path: "/admin/ekip-ekle",
          onClick: () => {
            navigate.push(`/admin/ekip-ekle`);
          },
        },
      ],
    },
    {
      key: "17",
      icon: <Telephone />,
      label: "İletişim Formları",
      path: "/admin/iletisim",
      onClick: () => {
        navigate.push(`/admin/iletisim`);
      },
    },
    {
      key: "99",
      icon: <BoxArrowLeft />,
      label: "Çıkış Yap",
      path: "/admin",
      onClick: () => {
        Cookies.remove('user');
        window.location.reload();
      },
    },
  ];

  const headItems = [
    {
      key: "4",
      icon: <FileEarmark />,
      label: "Haberler",
      path: "/",
      children: [
        {
          key: "5",
          label: "Haber Listesi",
          path: "/admin/haberler",
          onClick: () => {
            navigate.push(`/admin/haberler`);
          },
        },
        {
          key: "6",
          label: "Haberlerim",
          path: "/admin/haberlerim",
          onClick: () => {
            navigate.push(`/admin/haberlerim`);
          },
        },
        {
          key: "7",
          label: "Haber Ekle",
          path: "/admin/haber-ekle",
          onClick: () => {
            navigate.push("/admin/haber-ekle");
          },
        },
      ],
    },
    {
      key: "8",
      icon: <Newspaper />,
      label: "Manşetler",
      path: "/",
      children: [
        {
          key: "9",
          label: "Manşetler",
          path: "/admin/mansetler",
          onClick: () => {
            navigate.push(`/admin/mansetler`);
          },
        },
        {
          key: "10",
          label: "Manşet Ekle",
          path: "/admin/manset-ekle",
          onClick: () => {
            navigate.push("/admin/manset-ekle");
          },
        },
      ],
    },
    {
      key: "11",
      icon: <BlockquoteLeft />,
      label: "Köşe Yazıları",
      path: "/",
      children: [
        {
          key: "12",
          label: "Köşe Yazıları",
          path: "/admin/kose-yazilari",
          onClick: () => {
            navigate.push(`/admin/kose-yazilari`);
          },
        },
        {
          key: "13",
          label: "Köşe Yazılarım",
          path: "/admin/kose-yazilarim",
          onClick: () => {
            navigate.push(`/admin/kose-yazilarim`);
          },
        },
        {
          key: "14",
          label: "Köşe Yazısı Ekle",
          path: "/admin/kose-yazisi-ekle",
          onClick: () => {
            navigate.push("/admin/kose-yazisi-ekle");
          },
        },
      ],
    },
    {
      key: "99",
      icon: <BoxArrowLeft />,
      label: "Çıkış Yap",
      path: "/admin",
      onClick: () => {
        Cookies.remove('user');
        window.location.reload();
      },
    },
  ]

  const authorItems = [
    {
      key: "4",
      icon: <FileEarmark />,
      label: "Haberler",
      path: "/",
      children: [
        {
          key: "6",
          label: "Haberlerim",
          path: "/admin/haberlerim",
          onClick: () => {
            navigate.push(`/admin/haberlerim`);
          },
        },
        {
          key: "7",
          label: "Haber Ekle",
          path: "/admin/haber-ekle",
          onClick: () => {
            navigate.push("/admin/haber-ekle");
          },
        },
      ],
    },
    {
      key: "11",
      icon: <BlockquoteLeft />,
      label: "Köşe Yazıları",
      path: "/",
      children: [
        {
          key: "13",
          label: "Köşe Yazılarım",
          path: "/admin/kose-yazilarim",
          onClick: () => {
            navigate.push(`/admin/kose-yazilarim`);
          },
        },
        {
          key: "14",
          label: "Köşe Yazısı Ekle",
          path: "/admin/kose-yazisi-ekle",
          onClick: () => {
            navigate.push("/admin/kose-yazisi-ekle");
          },
        },
      ],
    },
    {
      key: "99",
      icon: <BoxArrowLeft />,
      label: "Çıkış Yap",
      path: "/admin",
      onClick: () => {
        Cookies.remove('user');
        window.location.reload();
      },
    },
  ]

  const getActiveKey = () => {
    for (const item of user.role === "admin" ? adminItems : (user.role === "baseditor" ? headItems : authorItems)) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.key;
          }
        }
      }
      else {
        if (item.path === window.location.pathname) {
          return item.key;
        }
      }
    }
  };

  const getPageTitle = () => {
    for (const item of user.role === "admin" ? adminItems : (user.role === "baseditor" ? headItems : authorItems)) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === window.location.pathname) {
            return child.label;
          }
        }
      } else {
        if (item.path === window.location.pathname) {
          return item.label;
        }
      }
    }
  };

  return (
    user ?
      <div className="admin-layout">
        <Helmet>
          <title>Admin Panel</title>
        </Helmet>
        <Layout>
          <Sider width={"300px"} trigger={null} theme="light " collapsible collapsed={collapsed}>
            <img src="/bilinti-5.png" style={{ width: collapsed ? "50%" : "25%", position: "relative", left: "50%", transform: "translateX(-50%)", padding: "1rem 0", transition: "ease .3s" }} />
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[getActiveKey()]}
              items={user.role === "admin" ? adminItems : (user.role === "baseditor" ? headItems : authorItems)}
            />
          </Sider>
          <Layout>
            <Header style={{
              padding: 0, backgroundColor: "white", display: "flex",
              justifyContent: "space-start",
            }}>
              {window.innerWidth > 768 &&
                <Button
                  type="text"
                  icon={<List />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                  }}
                />
              }

              <b>Admin Panel | {getPageTitle()}</b>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: window.innerWidth > 768 ? 24 : 10,
                minHeight: "100vh"
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </div>
      :
      <Login />
  )
}

export default AdminLayout