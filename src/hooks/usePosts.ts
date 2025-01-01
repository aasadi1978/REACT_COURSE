import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const usePosts = (query: PostQuery) => {
  return useInfiniteQuery<Post[], Error>({
    // The queryKey will be setup as an array with the first element being the key of the query and the second element being the query object.
    // This will allow us to invalidate the query when the query object changes., i.e., when the page or pageSize changes, the query will be refetched.
    queryKey: ["posts", query],
    queryFn: ({ pageParam }) =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 10 * 1000, // ten seconds
    keepPreviousData: true, // keep previous data when fetching new data to avoid flickering when paginating posts
    getNextPageParam: (lastPage, allPages) => {
      // When we call getNextPageParam, we receive the last page of data and all the pages of data fetched so far.
      // The React sends the page number to queryFn as an object which has a proprty called 'pageParam'.
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default usePosts;
