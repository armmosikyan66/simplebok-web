import BookCard from "@/components/BookCard.tsx";
import {Fragment, SVGProps, useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/redux.ts";
import {library, reaction} from "@/services/book.ts";
import {JSX} from "react/jsx-runtime";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import BookInfo from "@/components/BookInfo.tsx";
import {IBook} from "@/types/IBook.ts";
import {changeSelectedInLibrary} from "@/store/slices/book.ts";

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
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
    )
}

const Library = () => {
    const dispatch = useAppDispatch();
    const {items, loading, total_pages, selected} = useAppSelector(state => state.book.library);
    const [page, setPage] = useState<number>(1);

    const pages = useMemo<number[]>(() => {
        const pagesToShow = 5;
        let startPage = 1;
        let endPage = total_pages;

        if (total_pages > pagesToShow) {
            if (page <= Math.ceil(pagesToShow / 2)) {
                startPage = 1;
                endPage = pagesToShow;
            } else if (page + Math.floor(pagesToShow / 2) >= total_pages) {
                startPage = total_pages - pagesToShow + 1;
                endPage = total_pages;
            } else {
                startPage = page - Math.floor(pagesToShow / 2);
                endPage = page + Math.floor(pagesToShow / 2);
            }
        }

        return [...Array(endPage - startPage + 1).keys()].map((i) => startPage + i);
    }, [page, total_pages]);

    useEffect(() => {
        dispatch(library(`page=${page}&limit=12`))
    }, [dispatch, page]);

    const onReact = (bookId: number) => {
        dispatch(reaction(bookId))
    }

    const onSelect = (data: IBook) => {
        dispatch(changeSelectedInLibrary(data))
    }

    return (
        <>
            <BookInfo onReaction={onReact} onClose={() => dispatch(changeSelectedInLibrary({} as IBook))} {...selected} open={!!Object.keys(selected).length}/>
            <main className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 h-full">
                <div className="space-y-8 h-full">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">Library</h3>
                    </div>
                    {!loading ? items.length ? (
                            <div className="relative">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                                    {items.map((item) => (
                                        <Fragment key={item.id}>
                                            <BookCard onSelect={onSelect} showLikes onReaction={onReact} item={item}/>
                                        </Fragment>
                                    ))}
                                </div>
                                <Pagination className="pb-10">
                                    <PaginationContent>
                                        <PaginationItem>
                                            {page > 1 ? <PaginationPrevious onClick={(e) => {
                                                e.preventDefault()
                                                setPage((prev) => prev - 1)
                                            }} href="#"/> : null}
                                        </PaginationItem>
                                        <PaginationItem>
                                            {pages.map((el: number) => (
                                                <PaginationLink onClick={(e) => {
                                                    e.preventDefault()
                                                    setPage(el)
                                                }} isActive={el === page} href="#" key={el}>
                                                    {el}
                                                </PaginationLink>
                                            ))}
                                        </PaginationItem>
                                        {total_pages > pages[pages.length - 1] ? <PaginationItem>
                                            <PaginationEllipsis/>
                                        </PaginationItem> : null}
                                        <PaginationItem>
                                            {total_pages > page ? <PaginationNext onClick={(e) => {
                                                e.preventDefault()
                                                setPage((prev) => prev + 1)
                                            }} href="#"/> : null}
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        ) : (
                            <div
                                className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
                                <BookOpenIcon className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4"/>
                                <h4 className="text-lg font-bold mb-2">No Current Reading</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-center">
                                    You don't have any books you're currently reading. Start reading to see your
                                    progress here.
                                </p>
                            </div>
                        )
                        :
                        <div className="flex items-center justify-center h-full">
                            <div
                                className="h-8 w-8 animate-spin rounded-full border-4 border-gray-500 border-t-transparent dark:border-gray-400"/>
                        </div>}
                </div>
            </main>
        </>
    );
};

export default Library;
