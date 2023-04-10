
export interface Topic {
    seq: number;
    name: string;
    short: string;
    id: string;
}

export interface Post {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    author: Author;
    content: HTMLContent;
    topic: Topic | null;
    tags: string[];
    coverImage: CoverImage;
}

export interface HTMLContent {
    html: string;
}

export interface CoverImage {
    url: string;
    mimeType: string;
}

export interface Author {
    id: string;
    name: string;
    title: string;
    biography: string;
}