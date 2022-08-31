import { useState } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

    const resetState=()=>{
        setTitle('');
        setImageUrl('');
        setContent('');
    }

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const graphqlQuery = {
      query: `
      mutation{
        createPost(postInput:{
          title:"${title}",
          imageUrl:"${imageUrl}",
          content:"${content}",
            creator:"630cac2275b987fa3ebcc0a2"
        }){title}
      }
      `,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/graphql", graphqlQuery, config);
      console.log(response);
      resetState();
      toast.success("Post created with success");
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.errors) {
        toast.error(error.response.data.errors[0].message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <Layout>
      <div className="sm:flex sm:items-center w-full">
        <div className="flex items-center justify-center w-full sm:w-1/2  p-4 bg-black h-screen">
          <div className="w-full">
            <h1 className="uppercase font-bold tracking-tight text-4xl text-white text-center mb-4">
              AddPost
            </h1>
            <form
              className="bg-white p-4 rounded w-3/4 m-auto"
              onSubmit={(event) => onFormSubmit(event)}
            >
              <input
                className="block mb-2 p-2 rounded shadow border border-gray-200 w-full"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <input
                className="block mb-2 p-2 rounded shadow border border-gray-200 w-full"
                type="text"
                placeholder="image url"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
              />
              <textarea
                className="block resize-none min-h-[130px] mb-2 p-2 rounded shadow border border-gray-200 w-full"
                placeholder="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
              <button
                className="text-xl w-full bg-gray-200 hover:bg-violet-400 hover:text-white rounded shadow text-black tracking-tight font-semibold capitalize py-2"
                type="submit"
              >
                Create
              </button>
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center w-full sm:w-1/2 p-4 h-screen">
          <lottie-player
            src="https://assets7.lottiefiles.com/private_files/lf30_gqwdpikn.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </Layout>
  );
};
export default AddPost;
