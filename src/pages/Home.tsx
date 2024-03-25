import { useQuery } from "@tanstack/react-query";
import Wrapper from "../components/Wrapper";
import { fetchCatData, fetchData } from "../api/api";
import Section from "../components/Section";

const Home = () => {
  //  Fetch data
  const {
    isPending: FBCDIsPending,
    data: FBCDData,
    error: FBCDError,
  } = useQuery({
    queryKey: ["fetchBitCoinData"],
    queryFn: fetchData,
  });

  // depended query - this query will be executed only if the first query is successful
  const {
    isPending: depenedIsPending,
    data: depenedData,
    error: depenedError,
  } = useQuery({
    queryKey: ["fetchCatFact"],
    queryFn: fetchCatData,
    enabled: !!FBCDData?.bpi?.USD?.rate,
  });

  return (
    <Wrapper header="Fetch data list">
      <div>
        <Section
          loading={FBCDIsPending}
          header="01. fetch data Bitcoin price"
          error={FBCDError}
          data={`${FBCDData?.bpi?.USD?.rate} USD`}
        />

        <Section
          loading={depenedIsPending}
          header="02. Depend data - fetch data after first query is successful"
          error={depenedError}
          data={depenedData?.fact}
        />
      </div>
    </Wrapper>
  );
};

export default Home;
