import { useQuery, useQueryClient } from "@tanstack/react-query";
import Wrapper from "../components/Wrapper";
import { fetchCatData, fetchData, fetchDogData } from "../api/api";
import Section from "../components/Section";

const Home = () => {
  const queryClient = useQueryClient();

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
    // this query will be executed only if the first query is successful
    enabled: !!FBCDData?.bpi?.USD?.rate,
  });

  // fetch random data about dogs
  const { data: dogData, isPending: isDogPending } = useQuery({
    queryKey: ["fetchDogData"],
    queryFn: fetchDogData,
  });

  // cancel query
  // doc - https://tanstack.com/query/v3/docs/framework/react/guides/query-cancellation

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

        <h2>Cancel req - fetch random images</h2>
        {/* which will cancel the query and revert it back to its previous state. */}
        <button
          onClick={(e) => {
            e.preventDefault();
            queryClient.cancelQueries({
              queryKey: ["fetchDogData"],
            });
          }}
        >
          Cancel
        </button>
        <div>
          {isDogPending ? (
            "Loading..."
          ) : (
            <img src={dogData?.message || ""} alt="dog" />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
