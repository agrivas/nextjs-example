import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
}

export const usePostStore = create<PostState>(
  devtools((set) => ({
    posts: [],
    loading: false,
    error: null,
    fetchPosts: async () => {
      set({ loading: true, error: null });
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts.');
        }
        const data: Post[] = await response.json();
        set({ posts: data, loading: false });
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ error: error.message, loading: false });
        } else {
          set({ error: 'An unknown error occurred.', loading: false });
        }
      }
    },
  }), "PostStore")
);