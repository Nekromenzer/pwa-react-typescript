import Wrapper from "../components/Wrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fakeApi, IExercise, UpdateExercisePayload } from "../api/fakeApi";

const Offline = () => {
  const queryClient = useQueryClient();

  // for more info - https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  // github code sample - https://github.com/whitespectre/rn_offline_first_with_react_query

  const {
    data: fetchedExercises,
    fetchStatus,
    isRefetching,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => fakeApi.getTodos(),
    // The time in milliseconds after data is considered stale
    staleTime: Infinity,
    // gcTime The time in milliseconds that unused/inactive cache data remains in memory.
    // default is 5 min
    gcTime: Infinity,
    // networkMode - offlineFirst, onlineOnly, cacheFirst, cacheOnly, noPrefetch
    // https://tanstack.com/query/latest/docs/framework/react/guides/network-mode
    networkMode: "offlineFirst",
  });

  // local mutation when user is offline
  const updateLocalExerciseList = (
    id: string,
    isDone: boolean,
    // we add isNotSynced to mark the exercise as not synced with the server
    isNotSynced?: boolean
  ) => {
    queryClient.setQueryData<IExercise[]>(["exercises"], (exercisesList) => {
      return exercisesList?.map((exercise) => {
        if (exercise.id === id) {
          return {
            ...exercise,
            isDone,
            isNotSynced,
          };
        }
        return exercise;
      });
    });
  };

  const updateExercise = useMutation({
    mutationKey: ["exercises"],
    mutationFn: async (payload: UpdateExercisePayload) =>
      fakeApi.updateExerciseStatus(payload.id, payload.isDone),
    onSuccess(data) {
      updateLocalExerciseList(data.id, data.isDone, false);
    },
    onMutate: async (payload: UpdateExercisePayload) => {
      await queryClient.cancelQueries({ queryKey: ["exercises"] });
      updateLocalExerciseList(payload.id, payload.isDone, true);
    },
  });

  return (
    // note - for all offline workarounds, refer APP.tsx for the offline banner and the onlineManager
    <Wrapper header="Offline Data Manipulations">
      <br />
      <h5>Req states</h5>
      <p>fetch state - {fetchStatus}</p>
      <p>isRefetching - {isRefetching ? "true ✔️" : "false ❌"}</p>
      <p>dataUpdatedAt - {dataUpdatedAt}</p>
      <br />

      {fetchedExercises?.map((exercise) => (
        <div key={exercise.id}>
          <input
            type="checkbox"
            checked={exercise.isDone}
            onChange={(e) => {
              updateExercise.mutate({
                id: exercise.id,
                isDone: e.target.checked,
              });
            }}
          />
          <span>{exercise.title}</span>
          {exercise.isNotSynced && <span> - Not synced</span>}
        </div>
      ))}
    </Wrapper>
  );
};

export default Offline;
