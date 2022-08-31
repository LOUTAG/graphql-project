import { useState } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate= useNavigate();

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const graphqlQuery = {
      query: `
        mutation {
          createUser(userInput: {
            email:"${email}",
            name:"${name}",
            password:"${password}"
          })
          {_id email}
        }
      `,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post("/graphql", graphqlQuery, config);
      console.log(response);
      toast.success('Registered with success');
      navigate('/login');
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
            <h1 className="uppercase font-bold tracking-tight text-4xl text-white text-center mb-4">register</h1>
            <form
              className="bg-white p-4 rounded w-3/4 m-auto"
              onSubmit={(event) => onFormSubmit(event)}
            >
              <input
                className="block mb-2 p-2 rounded shadow border border-gray-200 w-full"
                type="text"
                placeholder="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <input
                className="block mb-2 p-2 rounded shadow border border-gray-200 w-full"
                type="email"
                placeholder="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className="block mb-2 p-2 rounded shadow border border-gray-200 w-full"
                type="password"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button className="text-xl w-full bg-gray-200 hover:bg-violet-400 hover:text-white rounded shadow text-black tracking-tight font-semibold capitalize py-2" type="submit">Register</button>
              <div className="text-violet-400 font-semibold text-center mt-1 hover:text-violet-500"><Link to="/login">Already have an account ? Sign in</Link></div>
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center w-full sm:w-1/2 p-4 h-screen">
          <lottie-player
            src="https://assets1.lottiefiles.com/packages/lf20_hy4txm7l.json"
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
export default Register;
