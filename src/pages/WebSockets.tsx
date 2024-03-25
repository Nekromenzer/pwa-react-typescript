import { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};

// const fetchPost = async (id: number | string) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
//   return res.json();
// };

// note 👌
// The purpose of websockets is to get live notifications of events happening on the server.
// The purpose of react-query is to manage async state in React. Queries and subscriptions are not the same, but they go well together.
// You can of course manage your subscriptions outside of React Query, but you'll likely be overpushing data,
// depending on your subscription model. You can also turn websockets on and off and the queries will still continue to
// work if the data lives in react-query.

const WebSockets = () => {
  const queryClient = useQueryClient();

  const { data: posts, isFetching } = useQuery({
    queryKey: ["posts", "list"],
    queryFn: fetchPosts,
  });

  // const usePost = (id: number | string) =>
  //   useQuery({
  //     queryKey: ["posts", "detail", id],
  //     queryFn: () => fetchPost(id),
  //   });

  const useReactQuerySubscription = () => {
    useEffect(() => {
      const websocket = new WebSocket("wss://echo.websocket.org/");
      websocket.onopen = () => {
        console.log("web socket connected ✔️✔️✔️✔️✔️");
      };
      websocket.onmessage = (event) => {
        console.log(event.data);
        const data = event.data;
        queryClient.setQueriesData(data.entity, (oldData: any) => {
          const update = (entity: any) =>
            entity.id === data.id ? { ...entity, ...data.payload } : entity;
          return Array.isArray(oldData) ? oldData.map(update) : update(oldData);
        });
      };
      return () => {
        websocket.close();
      };
    }, []);
  };

  //call root od the folder index query provider
  useReactQuerySubscription();

  return (
    <Wrapper header="Websocket with react query">
      <br />
      <div>
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          <div>
            {posts?.map((post: any) => (
              <div key={post.id}>
                <h5>{post.title}</h5>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default WebSockets;
