'use client'
import React, { useState, useEffect, useRef } from "react"
import PromptCard from "./PromptCard"
import { IPrompt } from "@models/prompt"

const PromptCardList = ({data, handleTagClick} : {
  data: IPrompt[]
  handleTagClick: (e: any) => any
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<IPrompt[]>([]);
  // Keeps a copy of the posts for reset of the search bar
  const [postBuffer, setPostBuffer] = useState<IPrompt[]>([]);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchText(q);


    if (q.length > 0) {
      const encodedQ = encodeURIComponent(q);
      const response = await fetch(`/api/prompt/search/${encodedQ}`);
      const data = await response.json();
      setPosts(data);
    } else {
      setPosts(postBuffer);
    }
  }

  const handleTagClick = (e: React.MouseEvent<HTMLElement>) => {
    const tagText = e.toString();
    setSearchText(tagText);

    // mocks the function argument to trigger the handleSearchChange function 
    const mockEvent = {
      target: {
        value: tagText
      }
    }

    handleSearchChange(mockEvent as React.ChangeEvent<HTMLInputElement>);
  }


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setPostBuffer(data);
    }
    fetchPosts();

  }, [])


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {posts.length > 0 ? (
        <PromptCardList
          data={posts}
          handleTagClick={(e) => handleTagClick(e)}
      />
      ) : (
        <p className="mt-12 text-red-500">Nothing to see here.</p>
      )}
    </section>
  )
}

export default Feed
