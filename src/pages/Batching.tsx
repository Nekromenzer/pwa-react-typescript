import Wrapper from "../components/Wrapper";
import { notifyManager } from "@tanstack/query-core";
import { useQuery } from "@tanstack/react-query";
import { batch } from "solid-js";
//https://docs.solidjs.com/reference/reactive-utilities/batch
// This is a low level API that is used by Solid to batch updates.
// It holds executing downstream computations within the block until
// the end to prevent unnecessary recalculation. Solid Store's set method,
// Mutable Store's array methods, and Effects automatically wrap their code
// in a batch. This is useful for when you want to batch a set of computations
// that are not wrapped in a batch already.

const Batching = () => {
  // Set the batch function
  notifyManager.setBatchNotifyFunction(batch);

  // Mock API function that fetches data
  const fetchData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: "Mock Data" });
      }, 3000);
    });
  };

  const BatchingExample = () => {
    // Use useQuery hook to fetch data
    const { data, isLoading, isError }: any = useQuery({
      queryKey: ["batching"],
      queryFn: fetchData,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    return <div>Data: {data.data}</div>;
  };

  return (
    <Wrapper header="Batching">
      <BatchingExample />
    </Wrapper>
  );
};

export default Batching;
