"use client";
import Info from '@/components/Profile/Info.jsx';
import Login from '@/components/Profile/Login.jsx';
import { useState, useEffect } from 'react';

function ClientPage() {
    const [member, setMember] = useState(null);

    useEffect(() => {
        const storedMember = window?.localStorage?.getItem("member");
        if (storedMember) {
            setMember(storedMember);
        }
    }, []);

    return member ?
        <Info member={member} />
        :
        <Login />;
}

export default ClientPage;