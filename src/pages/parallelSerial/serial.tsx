import axios from "axios";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

const fetchUsers = async () => {
  const res: any = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return res;
};

const fetchTeams = async () => {
  // different api
  const res: any = axios.get(
    "https://jsonplaceholder.typicode.com/users/1/posts"
  );
  return res;
};

const Serial = () => {
  // The following queries will execute in serial, causing separate roundtrips to the server:
  const { data: usersQuery, isPending } = useSuspenseQuery({
    queryKey: ["usersSeries", "test"],
    queryFn: fetchUsers,
    gcTime: 0,
  });

  const { data: postsQuery, isPending: isPendingPosts } = useSuspenseQuery({
    queryKey: ["teamsSeries", "test2"],
    queryFn: fetchTeams,
    gcTime: 0,
  });

  const { data: postsQuery2, isPending: isPendingPosts2 } = useSuspenseQuery({
    queryKey: ["teamsSeries2", "test221"],
    queryFn: fetchTeams,
    gcTime: 0,
  });

  const { data: postsQuery3, isPending: isPendingPosts3 } = useSuspenseQuery({
    queryKey: ["teamsSeries3", "test3"],
    queryFn: fetchTeams,
    gcTime: 0,
  });

  const { data: usersQueryqwe, isPending: isPendingasd2 } = useSuspenseQuery({
    queryKey: ["usersSeries2w1", "test2w1"],
    queryFn: fetchUsers,
    gcTime: 0,
  });

  const { data: usersQueryqwe23, isPending: isPendingasd2342 } =
    useSuspenseQuery({
      queryKey: ["usersSeries2w", "test2w"],
      queryFn: fetchUsers,
      gcTime: 0,
    });

  // Note that since the queries above suspend rendering, no data
  // gets rendered until all of the queries finished
  if (isPending || isPendingPosts) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Serial Data fetching</h2>
      <div>
        <h2>Users</h2>
        {usersQuery.data?.map((user: any) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
      <div>
        <h2>Posts</h2>
        {postsQuery.data?.map((post: any) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Serial;
