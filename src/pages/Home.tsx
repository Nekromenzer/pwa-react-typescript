import { useQuery } from "@tanstack/react-query";
import Wrapper from "../components/Wrapper";
import { fetchData } from "../api/api";
import Section from "../components/Section";

const Home = () => {
  const {
    isPending: FBCDIsPending,
    isError,
    data: FBCDData,
    error: FBCDError,
  } = useQuery({
    queryKey: ["fetchBitCoinData"],
    queryFn: fetchData,
  });

  return (
    <Wrapper header="Fetch data list">
      <div>
        <Section
          loading={FBCDIsPending}
          header="fetch data"
          error={FBCDError}
          data={FBCDData?.bpi?.USD?.rate}
        />
      </div>
    </Wrapper>
  );
};

export default Home;
