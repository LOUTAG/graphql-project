const Pagination = ({ page, pages, setPage }) => {
  return (
    <div className="flex justify-center items-center flex-wrap pb-4 font-semibold tracking-tight">
      <button
      disabled={page > 1 ? false : true}
        className={`${page > 1 ? "text-black" : "text-gray-200"} w-[110px] text-center`}
        onClick={()=>setPage(page - 1)}
      >
        Previous Page
      </button>
      <div className="px-4 w-[60px] text-center">
        {page}/{pages}
      </div>
      <button
      disabled={page < pages ? false : true}
        className={`${page < pages ? "text-black" : "text-gray-200"} w-[110px] text-center`}
        onClick={()=>setPage(page + 1)}
      >
        Next Page
      </button>
    </div>
  );
};
export default Pagination;
