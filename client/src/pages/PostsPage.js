import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";
import axios from "axios";

const PostsPage = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const graphqlQuery = {
        query: `query{
                    allPosts(page:${page}){
                        posts {
                            title
                            content
                            imageUrl
                            createdAt
                        }
                        totalPosts
                        pages
                    } 
                }`,
      };
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await axios.post("/graphql", graphqlQuery, config);
        setPosts(response.data.data.allPosts.posts);
        setPages(response.data.data.allPosts.pages);
      } catch (error) {
        throw error;
      }
    };
    fetchPosts();
  }, [page]);
  return (
    <Layout>
      <h1 className="text-2xl sm:text-4xl uppercase font-bold pt-2 pb-8 text-center whitespace-nowrap tracking-tight">
        all posts
      </h1>

      <div className="grid grid-cols-2 justify-center items-start sm:grid-cols-4 gap-4 sm:gap-8 px-3 sm:px-8 w-full mb-8">
        <Posts posts={posts} />
      </div>
      <Pagination page={page} pages={pages} setPage={setPage} />
    </Layout>
  );
};
export default PostsPage;
