"use client";
import Info from '@/components/Profile/Info.jsx';
import Login from '@/components/Profile/Login.jsx';


function ClientPage() {
    const member = localStorage.getItem("member") ? localStorage.getItem("member") : null;

    return member ?
        <Info member={member} />
        :
        <Login />;
}

export default ClientPage;