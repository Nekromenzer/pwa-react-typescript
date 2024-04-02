import React, { useEffect, useTransition } from "react";
import Wrapper from "../components/Wrapper";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useIsAppOnline } from "../hooks/useIsAppOnline";

// mutation for form submission when offline and cancel the request
// https://github.com/TanStack/query/discussions/1551#discussioncomment-7074992
// https://github.com/TanStack/query/discussions/1551#discussioncomment-8726803

const Forms = () => {
  const isOnline = useIsAppOnline();
  const [isPending, startTransition] = useTransition();
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
    retry: (failureCount, error: any) => {
      //  check if the error is 503, then stop retrying
      if (error?.response?.status === 503) {
        console.log("503 error");
        localStorage.setItem("submitFormData", JSON.stringify(data));
        return false;
      }
      //  retry 3 times
      return failureCount < 3;
    },
    retryDelay: 1000,
    // 10 min cache time for gc
    gcTime: 600000,
    // https://tanstack.com/query/v5/docs/framework/react/guides/network-mode
    networkMode: "offlineFirst",
    onSuccess: () => {
      alert("Form submitted successfully");
      // offlineSubmitSave();
    },
    onMutate: async () => {
      await formsQueryClient.cancelQueries({ queryKey: ["submitFormData"] });
      // offlineSubmitSave();
    },
  });

  // error boundary - https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5#the-useerrorboundary-option-has-been-renamed-to-throwonerror
  const handleSubmit = () => {
    // check any fields are empty
    if (!data.name || !data.email || !data.message) {
      alert("All fields are required");
      return;
    }
    handleSubmitApiCall.mutate({});
  };

  useEffect(() => {
    const localCache = localStorage.getItem("submitFormData");
    if (localCache !== null && !handleSubmitApiCall.isPending) {
      setData(JSON.parse(localCache));

      // muatate call using local data
      if (data.name !== "" && data.email !== "" && data.message !== "") {
        handleSubmitApiCall.mutate({});
      }

      startTransition(() => {
        localStorage.removeItem("submitFormData");
      });
    } else {
      localStorage.removeItem("submitFormData");
    }
  }, []);

  return (
    <Wrapper header="Here we demonstrate form action with tanstack online/offline">
      <br />
      {isPending ? "cleaning local storage after offline data submit" : null}
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
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={data.name}
          />
          <br />
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={data.email}
          />
          <br />
          <label htmlFor="message">Message:</label>
          <br />
          <input
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={data.message}
          />
          <br />
          <br />
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default Forms;
