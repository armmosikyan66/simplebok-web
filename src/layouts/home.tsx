import {FC, SVGProps} from 'react';
import {JSX} from "react/jsx-runtime";
import {Link} from "react-router-dom";
import {useAppSelector} from "@/hooks/redux.ts";


function BookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
        </svg>
    )
}


function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    )
}


function LibraryIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="m16 6 4 14" />
            <path d="M12 6v14" />
            <path d="M8 8v12" />
            <path d="M4 4v16" />
        </svg>
    )
}


type Props = {
    children: JSX.Element;
};


const HomeLayout: FC<Props> = ({children}) => {
    const {me} = useAppSelector(state => state.user);

    return (
        <div className="flex h-screen w-full">
            <div className="flex h-full w-64 flex-col border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
                    <Link to={"/"} className="flex items-center gap-2">
                        <BookIcon className="h-6 w-6 text-primary"/>
                        <span className="text-lg font-semibold">Simplebook</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto">
                    <nav className="space-y-1 px-2 py-4 flex flex-col h-full">
                        <div className="flex-1">
                            <Link
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
                                to="#"
                            >
                                <SearchIcon className="h-5 w-5"/>
                                Search
                            </Link>
                            <Link
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
                                to="/library"
                            >
                                <LibraryIcon className="h-5 w-5"/>
                                Library
                            </Link>
                        </div>
                        <div className="border-t px-2 pt-4 dark:border-gray-800">
                            <Link
                                className="text-xs flex items-center gap-2 rounded-md px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
                                to="/profile"
                            >
                                <UserIcon className="h-5 w-5"/>
                                {me.username || me.email}
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="flex-1 overflow-auto p-6">
                {children}
            </div>
        </div>
    );
};

export default HomeLayout;
