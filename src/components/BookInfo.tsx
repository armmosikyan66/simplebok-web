import {JSX} from "react/jsx-runtime";
import {FC, SVGProps, useEffect, useState} from "react";
import {Dialog, DialogContent} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {IBook} from "@/types/IBook.ts";
import {getFile} from "@/services/book.ts";

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
            <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
    )
}

function BookOpenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    )
}

interface BookInfoProps extends IBook {
    open: boolean;
    onClose: () => void;
    onReaction: (bookId: number) => void;
}

const BookInfo: FC<BookInfoProps> = ({ id, onReaction, was_liked, onClose, directory, open, title, author, lang, genre, creation_date, pages, creator, likes }) => {
    const [pdfBlob, setPdfBlob] = useState<string | null>(null);

    useEffect(() => {
        if (directory) {
            getFile(directory).then((blob) => setPdfBlob(blob))
        }
    }, [directory])

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[600px]">
                    <div className="grid grid-cols-[1fr_2fr] gap-6 p-6">
                        <div className="flex flex-col items-start gap-4">
                            <img
                                alt="Book Cover"
                                className="rounded-lg shadow-lg"
                                height={300}
                                src={pdfBlob || "/placeholder.svg"}
                                style={{
                                    aspectRatio: "200/300",
                                    objectFit: "cover",
                                }}
                                width={200}
                            />
                            <Button className="w-full flex items-center justify-center gap-2" size="lg">
                                <BookOpenIcon className="w-5 h-5"/>
                                Start Reading
                            </Button>
                            <Button onClick={() => onReaction(id)} className={`w-full flex items-center justify-center gap-2 ${was_liked ? "bg-red-400 border-red-500 text-white hover:bg-red-300 hover:text-white" : ''}`} size="lg" variant="outline">
                                <HeartIcon className="w-5 h-5" />
                                Like
                            </Button>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-1">
                                <h2 className="text-2xl font-bold">{title}</h2>
                                <p className="text-gray-500 dark:text-gray-400">by {author}</p>
                            </div>
                            <div className="grid gap-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span>Genre:</span>
                                    <span className="font-medium">{genre || "Unknown"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Created:</span>
                                    <span className="font-medium">{new Date(creation_date).toLocaleDateString("en-US", {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Language:</span>
                                    <span className="font-medium">{lang?.toLocaleUpperCase() || "Unknown"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Pages:</span>
                                    <span className="font-medium">{pages}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Creator:</span>
                                    <span className="font-medium">{creator || "Unknown"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Likes:</span>
                                    <span className="font-medium">{likes}</span>
                                </div>
                            </div>
                            <div className="prose dark:prose-invert">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores deserunt dolorem excepturi expedita impedit molestias non optio possimus praesentium. Aperiam enim esse labore, laborum maiores minima natus nobis odit.
                                </p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BookInfo;
