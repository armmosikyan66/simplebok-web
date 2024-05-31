import {FC, SVGProps, useEffect, useState} from "react";
import {IBook} from "@/types/IBook.ts";
import {getFile} from "@/services/book.ts";
import {Button} from "@/components/ui/button.tsx";
import {JSX} from "react/jsx-runtime";
import {Link} from "react-router-dom";

function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}

interface BookCardProps {
    onReaction: (bookId: number) => void;
    onSelect: (book: IBook) => void;
    showLikes?: boolean;
    item: IBook
}

const BookCard: FC<BookCardProps> = ({ item, onReaction, onSelect, showLikes  }) => {
    const {id, directory, author, title, was_liked, likes} = item;

    const [pdfBlob, setPdfBlob] = useState<string | null>(null);

    useEffect(() => {
        getFile(directory).then((blob) => setPdfBlob(blob))
    }, [directory])

    return (
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
                <img
                    alt="Book Cover"
                    className="spect-[2/3] w-full h-full object-cover"
                    src={pdfBlob ? pdfBlob : "/placeholder.svg"}
                    style={{
                        aspectRatio: "300/450",
                        objectFit: "cover",
                    }}
                    height="300"
                    width="200"
                />
                {showLikes ? <Button
                    className={`absolute top-2 right-2 rounded-full text-white ${was_liked ? "bg-red-400" : "bg-gray-900/50"} hover:bg-red-300 hover:text-white`}
                    size="icon"
                    variant="ghost"
                    onClick={() => onReaction(id)}
                >
                    <HeartIcon className="h-5 w-5"/>
                    <span className="sr-only">Like</span>
                </Button> : null}
            </div>
            <div className="p-4 space-y-2">
                {showLikes ? <div className="flex items-center gap-2">
                    <HeartIcon className="h-5 w-5 transition-colors duration-300 [&.liked]:fill-red-500"/>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{likes}</span>
                </div> : null}
                <Link to="#" onClick={(e) => {
                    e.preventDefault();
                    onSelect(item);
                }} className="text-lg font-bold">{title}</Link>
                <p className="text-gray-500 dark:text-gray-400">{author}</p>
            </div>
        </div>
    );
};

export default BookCard;
