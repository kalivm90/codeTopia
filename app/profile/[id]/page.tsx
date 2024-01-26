'use client'
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Import types
import { IPrompt } from "@models/prompt";
// Component
import Profile from "@components/Profile";

const UsersPage = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [prompts, setPrompts] = useState<IPrompt[]>([]);
  const [username, setUsername] = useState<string>("");

  // Extract user ID from the pathname
  const userId = pathname.split("/").pop() || "";

  useEffect(() => {
    const getPrompts = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/posts`);
        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    };

    const getUsername = () => {
      const username = searchParams.get("name");
      if (username) {
        setUsername(`${username}'s`);
      }
    };

    // Only fetch if authed and session?.user.id is defined
    if (session?.user?.id) {
      // Fetch prompts and username when the component mounts
      getPrompts();
      getUsername();
    } else {
      router.push("/");
    }

  }, [userId, searchParams, router, session?.user?.id]);

  return <Profile name={username} desc="Very nice" data={prompts} />;
};

export default UsersPage;
