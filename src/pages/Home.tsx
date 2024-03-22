import { useQuery } from "@tanstack/react-query";
import Wrapper from "../components/Wrapper";

const Home = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => {},
  });
  return <Wrapper header="Fetch data list">asdasd</Wrapper>;
};

export default Home;
