"use client";
import { useEffect, useState } from "react";
import Column from "./Column/Column"
import Hero from "./Hero/Hero"
import Likeds from "./Likeds/Likeds"
import Latest from "./Latest/Latest";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function HomeContent() {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/api/news/homePage`, { method: "GET", });
            const data = await response.json();
            if (response.ok) { setData(data.data); }
        }
        catch (error) { console.log(error); }
        finally { setLoading(false); }
    }

    useEffect(() => { fetchData(); }, [])

    return (
        <>
            <Hero />
            <div className="flex flex-col justify-center items-center w-full pt-4 pb-8 mt-4">
                <div className="bg-gray-100 w-full flex justify-center items-center py-4 mb-6">
                    <div className="container">
                        <Latest data={data.latest} loading={loading} />
                    </div>
                </div>
                <div className="container">
                    <div className="grid lg:grid-cols-[3fr_1fr] grid-cols-1 gap-8 items-start">
                        <Likeds data={data.tops} loading={loading} />
                        <Column />
                    </div>
                </div>
            </div>
        </>
    )
} 