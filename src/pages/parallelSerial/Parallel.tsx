import { useSuspenseQueries } from "@tanstack/react-query";
import axios from "axios";

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

const Parallel = () => {
  // The following queries will execute in serial, causing separate roundtrips to the server:
  const [usersPQ, teamsPQ] = useSuspenseQueries({
    queries: [
      { queryKey: ["usersParallel"], queryFn: fetchUsers, gcTime: 0 },
      {
        queryKey: ["teamsParallel"],
        queryFn: fetchTeams,
        gcTime: 0,
      },
      {
        queryKey: ["teamsParallel1"],
        queryFn: fetchTeams,
        gcTime: 0,
      },
      {
        queryKey: ["teamsParallel2"],
        queryFn: fetchTeams,
        gcTime: 0,
      },
      {
        queryKey: ["teamsParallel3"],
        queryFn: fetchTeams,
        gcTime: 0,
      },
    ],
  });
  // Note that since the queries above suspend rendering, no data
  // gets rendered until all of the queries finished
  return (
    <div>
      <h2>Parallel Data fetching</h2>
      <div>
        <h2>Users</h2>
        {usersPQ.isPending || usersPQ.isLoading || usersPQ.isFetching ? (
          <div>Loading...</div>
        ) : (
          usersPQ.data?.data.map((user: any) => (
            <div key={user.id}>{user.name}</div>
          ))
        )}
      </div>
      <div>
        <h2>Posts</h2>
        {teamsPQ.isPending || teamsPQ.isLoading || teamsPQ.isFetching ? (
          <div>Loading...</div>
        ) : (
          teamsPQ.data?.data.map((post: any) => (
            <div key={post.id}>{post.title}</div>
          ))
        )}
      </div>
    </div>
  );
};

export default Parallel;
