import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Wrapper from "../components/Wrapper";

function InfiniteQueries() {
  const fetchProjects = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch(
      `https://api.example.com/projects?cursor=${pageParam}`
    );
    return response.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    // for more info regarding the options, check the docs
    // pagination , max count stc
    // https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries
  });

  console.log(data);

  return (
    <Wrapper header="Infinite Queries">
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <p>Error: {error.message}</p>
      ) : (
        // data?.pages.map((group, i) => (
        //   <React.Fragment key={i}>
        //     {group?.data?.map((project: any) => (
        //       <p key={project.id}>{project.name}</p>
        //     ))}
        //   </React.Fragment>
        // ))
        <div></div>
      )}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </Wrapper>
  );
}

export default InfiniteQueries;
