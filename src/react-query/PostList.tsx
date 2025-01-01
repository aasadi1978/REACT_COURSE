import React from "react";
import usePosts from "../hooks/usePosts";

const PostList = () => {
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } = usePosts({ pageSize: 10 });

  if (error) return <p>{error.message}</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {/* Please note that the data object returned from infinite query is no longer an array of posts but is an isntance of
      infinite data. The data object ha a couple of properties like pages, pageParams, fetchNextPage, etc. The pages
      property is an array of arrays of posts. The outer array represents the pages of posts and the inner array
      represents the posts */}
      <ul className="list-group">
        {data.pages.map((page, index) => (
          // To avoind rendering div as a parent element, we can use React.Fragment to wrap the list of posts
          <React.Fragment key={index}>
            {/* Each page is an array of posts */}
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button
        type="button"
        className="btn btn-primary my-3 ms-1"
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? "Loading more..." : "Load more"}
      </button>
    </>
  );
};

export default PostList;
