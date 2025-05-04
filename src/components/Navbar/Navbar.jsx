"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { Person } from "react-bootstrap-icons";

function Navbar() {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [menu, setMenu] = useState(false);
    const burger = useRef(null);
    const span1 = useRef(null);
    const span2 = useRef(null);
    const span3 = useRef(null);
    const nav = useRouter();

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const list = [
        { path: '/son-dakika', name: 'Son Dakika' },
        { path: '/kategori/gundem', name: 'Gündem' },
        { path: '/kategori/spor', name: 'Spor' },
        { path: '/kategori/ekonomi', name: 'Ekonomi' },
        { path: '/kategori/magazin', name: 'Magazin' },
        { path: '/kategori/siyaset', name: 'Siyaset' },
        { path: '/kategori/teknoloji', name: 'Teknoloji' },
        { path: '/kategori/saglik', name: 'Sağlık' },
        { path: '/kategori/bilim', name: 'Bilim' },
        { path: '/kategori/sanat', name: 'Sanat' }
    ];

    const handleMenu = () => {
        if (!loading) {
            try {
                setLoading(true);
                setMenu(!menu);
                if (!menu) {
                    span1.current.style.width = span3.current.style.width = "35px";
                    setTimeout(() => {
                        span1.current.style.transform = "translateY(1px)";
                        span2.current.style.width = "0";
                        span2.current.style.transform = "translateX(1rem)";
                        span3.current.style.transform = "translateY(-1px)";
                        burger.current.style.gap = "0";
                        setTimeout(() => {
                            span1.current.style.rotate = "45deg"
                            span3.current.style.rotate = "-45deg"
                        }, 300);
                    }, 300);
                }
                else {
                    span1.current.style.rotate = "0deg"
                    span3.current.style.rotate = "0deg"
                    setTimeout(() => {
                        span1.current.style.transform = "translateY(0)";
                        span2.current.style.width = "35px";
                        span2.current.style.transform = "translateX(0)";
                        span3.current.style.transform = "translateY(0)";
                        burger.current.style.gap = ".5rem";
                        setTimeout(() => {
                            span1.current.style.width = "15px"
                            span3.current.style.width = "20px";

                        }, 300);
                    }, 300);
                }
            }
            catch (err) { console.error(err); }
            finally { setLoading(false); }
        }
    }

    return (
        <>
            <div className="w-full h-full bg-black opacity-80 fixed top-0 left-0 z-9998 transition duration-1000" style={{ transform: menu ? "translateX(0)" : "translateX(100%)" }} />
            <div className={`flex justify-center items-center bg-white shadow-xl w-full ${scrolled ? "h-[70px]" : "h-[100px]"} fixed top-0 left-0 z-9999 transition-all duration-500`}>
                <div className="container">
                    <div className="flex gap-8 w-full items-center">
                        <div className="flex gap-8 items-center w-full">
                            <Link href='/' className={scrolled ? "min-w-[50px] md:min-w-[94px]" : "min-w-[80px] md:min-w-[140px]"} style={{transition: "ease .5s"}}>
                                <img src="/bilinti-5.png" alt="bilinti-logo" className={scrolled ? "md:h-[60px] h-[32px] transition-all duration-500" : "md:h-[90px] h-[52px] transition-all duration-500"} />
                            </Link>
                            <input type="text" className="outline-none border-b-1 w-full" placeholder="Haber Ara" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && nav.push('/ara/' + search)} />
                        </div>
                        <ul className={`flex gap-4 transition-all duration-500
                        xl:items-center xl:relative xl:flex-row xl:w-full xl:top-0 xl:bg-transparent xl:h-auto xl:p-0 xl:transform-none
                        absolute right-0 flex-col ${scrolled ? "top-[70px]" : "top-[100px]"} w-[300px] bg-white h-[100vh] p-6 items-end ${menu ? "transform-[translateX(0)]" : "transform-[translateX(300px)]"}
                    `}>
                            {menu &&
                                <li>
                                    <h4 className="clamp-h4 font-bold">Kategoriler</h4>
                                </li>
                            }
                            {list.map((e, k) => (
                                <li key={k}>
                                    <Link
                                        href={e.path}
                                        className="clamp-p
                                    text-black duration-300 transition whitespace-nowrap
                                    hover:text-(--primary)
                                "
                                    >
                                        {e.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="xl:w-[30px] w-auto rounded-md px-4 xl:px-0 h-[30px] xl:rounded-[50%] bg-(--secondary) text-white">
                                <Link href='/profil' className="w-full h-full flex justify-center items-center xl:before:content-[''] before:content-['Profil']"><Person/></Link>
                            </li>
                        </ul>
                        <div ref={burger} className="xl:hidden flex flex-col h-[50px] itemss-center justify-center cursor-pointer transition-all duration-300" style={{ gap: ".5rem" }} onClick={() => handleMenu()}>
                            <span ref={span1} className="block w-[15px] h-[1px] bg-black transition-all duration-300" />
                            <span ref={span2} className="block w-[35px] h-[1px] bg-black transition-all duration-300" />
                            <span ref={span3} className="block w-[20px] h-[1px] bg-black self-end transition-all duration-300" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
