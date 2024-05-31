export interface IBook {
    id: number;
    user_id: number;
    title: string;
    author: string;
    genre?: string;
    creator?: string;
    creation_date: Date;
    modification_date: Date;
    lang?: string;
    directory: string;
    pages: number;
    likes: number;
    was_liked?: boolean;
}

export interface ILibrary {
    items: IBook[]
    total_count: number
    total_pages: number
    page: number
    limit: number
}
