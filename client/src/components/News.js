import { v4 as uuidv4 } from "uuid";
const News = ({posts}) => {
  const renderNews = () => {
    return posts.map((item, index) => {
      if (index > 0) {
        return (
          <li
            key={uuidv4()}
            className="flex items-center justify-between mb-4"
          >
            <h3 className="text-white text-sm font-semibold sm:text-base pr-4 sm:pr-0 sm:pl-4 sm:order-2 w-[55%] line-clamp-3 ">{item.title}</h3>
            <img src={item.imageUrl} alt={item.title} className="sm:order-1 w-[45%]" />
          </li>
        );
      }
    });
  };
  return (
    <>
      {posts.length>0 && (<div className="sm:grid sm:grid-cols-2 sm:gap-x-12">
      <div className="mb-8 sm:m-0">
        <img className="mb-2" src={posts[0].imageUrl} alt={posts[0].title} />
        <h2 className="text-white font-semibold mb-2 sm:text-lg">
          {posts[0].title}
        </h2>
        <p className="text-gray-400 line-clamp-3">{posts[0].content}</p>
      </div>
      <div>
        <ul>{renderNews()}</ul>
      </div>
    </div>)  }
    </>
  );
};
export default News;
