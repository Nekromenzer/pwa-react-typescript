import { useMutation } from "@tanstack/react-query";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import { useId } from "react";

const Mutations = () => {
  // post request to create a new todo
  const mutation = useMutation({
    mutationFn: (newTodo): any => {
      return axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(newTodo),
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
    },
  });

  const id = useId();

  const customPayload: any = {
    id: id,
    title: "Do Laundry",
    body: "Some testing body",
    userId: 1,
  };
  return (
    <Wrapper header="Mutations">
      {mutation.isPending ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate(customPayload);
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </Wrapper>
  );
};

export default Mutations;
