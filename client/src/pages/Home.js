import { useState ,useEffect } from "react";
import Layout from "../components/Layout";
import News from "../components/News";
import Posts from "../components/Posts";
import axios from "axios";

const Home = () => {
  const [posts, setPosts]=useState([]);
  const [news, setNews]=useState([]);
  const [postsFilter, setPostsFilter]=useState([]);

  useEffect(()=>{
    setNews(posts.filter((item, index)=>index<4 ? item : false));
    setPostsFilter(posts.filter((item, index)=>index>3 ? item : false))
  },[posts]);

  useEffect(()=>{
    const fetchPosts=async()=>{
      const graphqlQuery={
        query:`
        query{
          posts{
            posts {
               title
              content
              imageUrl
              createdAt
            }
            totalPosts
          }
        }
        `
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try{
        const response = await axios.post("/graphql", graphqlQuery, config);
        setPosts(response.data.data.posts.posts)
      }catch(error){
        console.log(error);
      }
    }
    fetchPosts();
    
  },[])
  return (
    <Layout>
      <div className="bg-black px-3 sm:px-8 w-full self-start mb-8 pb-4">
        <h1 className="text-6xl sm:text-8xl uppercase font-bold text-white pt-2 pb-8 text-center whitespace-nowrap tracking-tight">the blog</h1>
        <News posts={news} />
      </div>
      <div className="grid grid-cols-2 justify-center items-start sm:grid-cols-4 gap-4 sm:gap-8 px-3 sm:px-8 w-full mb-8" >
        <Posts posts={postsFilter} />
      </div>
    </Layout>
  );
};
export default Home;
