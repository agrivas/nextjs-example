"use client";

import { useEffect } from "react";
import { useThemeStore, useUserStore, usePostStore } from "@/app/store";
import { Button } from "@/components/ui/button"; // Adjust the import path based on your project structure

export default function Home() {
  const { theme, toggleTheme } = useThemeStore();
  const { user, setUser } = useUserStore();
  const { posts, loading, error, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div
      className={`theme-${theme} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>Theme: {theme}</p>
        <Button onClick={toggleTheme}>Toggle Theme</Button>
        {user ? (
          <p>Welcome, {user.name}</p>
        ) : (
          <p>No user yet</p>
        )}
        <Button
          onClick={() =>
            setUser({ name: "John Doe", email: "john@example.com" })
          }
        >
          Set User
        </Button>

        <section className="w-full mt-8">
          <h2 className="text-xl font-bold mb-4">Posts</h2>
          {loading && <p>Loading posts...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="border p-4 rounded">
                  <h3 className="font-semibold">{post.title}</h3>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      {/* Footer */}
    </div>
  );
}