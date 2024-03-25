import Wrapper from "../components/Wrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fakeApi, IExercise, UpdateExercisePayload } from "../api/fakeApi";

const Offline = () => {
  const queryClient = useQueryClient();

  // for more info - https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  const { data: fetchedExercises } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => fakeApi.getTodos(),
    staleTime: Infinity,
    // gcTime is set to Infinity to prevent the query from being garbage collected when the user goes offline.
    // default is 5 min
    gcTime: Infinity,
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
