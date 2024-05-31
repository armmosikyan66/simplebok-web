// import BookCard from "@/components/BookCard.tsx";
import {JSX} from "react/jsx-runtime";
import {SVGProps, useEffect} from "react";
import {useAppDispatch} from "@/hooks/redux.ts";
import {lastReadBook, recentlyView} from "@/services/book.ts";
// import {useSelector} from "react-redux";
// import {RootState} from "@/store/store.ts";

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

const Home = () => {
    const dispatch = useAppDispatch();
    // const {currentReading, recentlyViewed} = useSelector((state: RootState) => state.book)

    useEffect(() => {
        dispatch(lastReadBook())
        dispatch(recentlyView())
    }, [dispatch])

    return (
        <main className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="space-y-8">
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">Continue</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/*<BookCard/>*/}
                    </div>
                </section>
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">Recently Opened</h3>
                        <a className="text-primary hover:underline" href="#">
                            See all
                        </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/*<BookCard/>*/}
                        {/*<BookCard/>*/}
                        {/*<BookCard/>*/}
                        {/*<BookCard/>*/}
                    </div>
                </section>
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">Top Books</h3>
                        <a className="text-primary hover:underline" href="#">
                            See all
                        </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/*<BookCard/>*/}
                        {/*<BookCard/>*/}
                        {/*<BookCard/>*/}
                        {/*<BookCard/>*/}
                    </div>
                </section>
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">Recently Opened</h3>
                        <a className="text-primary hover:underline" href="#">
                            See all
                        </a>
                    </div>
                    <div
                        className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
                        <BookOpenIcon className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4"/>
                        <h4 className="text-lg font-bold mb-2">No Recently Opened Books</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            You haven't opened any books recently. Start reading to see your progress here.
                        </p>
                    </div>
                </section>
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold">Current Reading</h3>
                        <a className="text-primary hover:underline" href="#">
                            See all
                        </a>
                    </div>
                    <div
                        className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
                        <BookOpenIcon className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4"/>
                        <h4 className="text-lg font-bold mb-2">No Current Reading</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            You don't have any books you're currently reading. Start reading to see your progress here.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Home;
