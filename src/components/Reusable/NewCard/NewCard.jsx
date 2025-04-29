import { EyeFill } from "react-bootstrap-icons";
import Link from 'next/link'
import moment from "moment/moment";

function NewCard({ data }) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;;

    
    return (
        <Link
            href={'/haber/' + data.newLink}
            style={{ backgroundColor: "white" }}
            className="bg-white relative select-none w-full shadow-md flex flex-col gap-4 cursor-pointer text-black hover:text-[var(--secondary)] group overflow-hidden rounded-md hover:shadow-lg transition duration-300"
        >
            <img
                src={apiURL + '/api/image/' + data.newImage}
                alt="new_image"
                className="transition-transform duration-300 group-hover:scale-105 shadow-md aspect-16/9 object-cover"
            />
            <p className="absolute top-2 right-2 bg-gray-800 py-2 px-4 rounded-3xl text-white text-sm opacity-60">
                {data.newCategory}
            </p>
            <div className="px-4 pb-4 flex flex-col gap-2">
                <b className="clamp-p transition duration-300 text-black group-hover:text-[var(--secondary)]">
                    {data.newTitle}
                </b>
                <div className="flex justify-between items-center">
                    <p className="flex gap-1 items-center text-black opacity-50 text-sm">
                        <EyeFill />
                        {data.newViews}
                    </p>
                    <p className="flex gap-1 items-center text-black opacity-50 text-sm">
                        {moment(data.createdAt).format("DD.MM.YYYY H:mm")}
                    </p>
                </div>

            </div>
        </Link>
    )
}

export default NewCard