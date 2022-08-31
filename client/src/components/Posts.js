import { v4 as uuidv4 } from "uuid";
const Posts = ({ posts }) => {
  console.log(posts);
  const renderPosts = () => {
    return posts.map((item) => {
      return (
        <div key={uuidv4()}>
            <img src={item.imageUrl} alt={item.title} />
            <h3 className="line-clamp-3 font-bold tracking-tight mb-2">{item.title}</h3>
            <p className="text-gray-400 line-clamp-3 text-sm">{item.content}</p>
        </div>
      )
    });
  };
  return <>{renderPosts()}</>;
};
export default Posts;
