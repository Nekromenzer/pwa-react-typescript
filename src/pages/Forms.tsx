import React from "react";
import Wrapper from "../components/Wrapper";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useIsAppOnline } from "../hooks/useIsAppOnline";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

// mutation for form submission when offline and cancel the request
// https://github.com/TanStack/query/discussions/1551#discussioncomment-7074992
// https://github.com/TanStack/query/discussions/1551#discussioncomment-8726803

const Forms = () => {
  const isOnline = useIsAppOnline();
  const [data, setData] = React.useState({ name: "", email: "", message: "" });

  const formsQueryClient = new QueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitFormData = new FormData();
  submitFormData.append("access_key", "b77ea485-743c-4529-adf7-0feb79856a83");
  submitFormData.append("name", data.name);
  submitFormData.append("email", data.email);
  submitFormData.append("message", data.message);

  // https://tanstack.com/query/v4/docs/framework/react/reference/useMutation
  const handleSubmitApiCall: any = useMutation({
    mutationKey: ["submitFormData"],
    mutationFn: (): any => {
      return axios.post("https://api.web3forms.com/submit", submitFormData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
    },
    // failed mutations will retry infinitely.
    retry: true,
    retryDelay: 1000,
    // 10 min cache time for gc
    gcTime: 600000,
    // https://tanstack.com/query/v5/docs/framework/react/guides/network-mode
    networkMode: "offlineFirst",
    onSuccess: () => {
      alert("Form submitted successfully");
      offlineSubmitSave();
    },
    onMutate: async () => {
      await formsQueryClient.cancelQueries({ queryKey: ["submitFormData"] });
      offlineSubmitSave();
    },
  });

  const offlineSubmitSave = () => {
    formsQueryClient.setMutationDefaults(["submitFormData"], {
      onMutate: async () => {
        const previousValue = formsQueryClient.getQueryData(["submitFormData"]);
        formsQueryClient.setQueryData(["submitFormData"], (old: any) => {
          return {
            ...old,
            data: { message: "Form submitted successfully" },
          };
        });
        return previousValue;
      },
      onError: (error, variables, context) => {
        formsQueryClient.setQueryData(["submitFormData"], context);
      },
    });
  };

  // error boundary - https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5#the-useerrorboundary-option-has-been-renamed-to-throwonerror
  const handleSubmit = () => {
    handleSubmitApiCall.mutate();
  };

  // Create the persister - use local storage
  const persisterForm = createAsyncStoragePersister({
    storage: window.localStorage,
    // throttleTime: 3000,
  });

  return (
    <PersistQueryClientProvider
      persistOptions={{ persister: persisterForm }}
      onSuccess={() =>
        formsQueryClient
          .resumePausedMutations()
          .then(() => formsQueryClient.invalidateQueries())
      }
      client={formsQueryClient}
    >
      <Wrapper header="Here we demonstrate form action with tanstack online/offline">
        <br />
        {/* If the form submission is successful, the following message will be displayed */}
        {handleSubmitApiCall.isError ? (
          <div
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            An error occurred: {handleSubmitApiCall.error.message}
          </div>
        ) : null}

        {/* If the form submission is successful, the following message will be displayed */}
        {handleSubmitApiCall.isSuccess ? (
          <div
            style={{
              color: "green",
              fontWeight: "bold",
            }}
          >
            {handleSubmitApiCall?.data?.data?.message} <br />
          </div>
        ) : null}

        {handleSubmitApiCall.isPending ? (
          <div>
            {isOnline
              ? "Submitting..."
              : "Offline , submitting will complete after network active!"}
          </div>
        ) : (
          <div>
            <label htmlFor="name">Name:</label>
            <br />
            <input type="text" id="name" name="name" onChange={handleChange} />
            <br />
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="message">Message:</label>
            <br />
            <input
              type="text"
              id="message"
              name="message"
              onChange={handleChange}
            />
            <br />
            <br />
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </Wrapper>
    </PersistQueryClientProvider>
  );
};

export default Forms;
