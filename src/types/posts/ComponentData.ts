import type { PostList } from '@/types/posts/PostList';

export interface MyComponentData {
    posts: PostList[];
    counter: number;
    message: string | null;
}