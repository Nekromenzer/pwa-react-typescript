import Wrapper from "../components/Wrapper";
import addNotification from "react-push-notification";

const Test = () => {
  const buttonClick = () => {
    addNotification({
      title: "Warning",
      subtitle: "This is a subtitle",
      message: "This is a very long message",
      theme: "darkblue",
      native: true, // when using native, your OS will handle theming.
    });
  };
  return (
    <Wrapper header="Test for api call">
      <h2>test cases</h2>
      <h5>Refer src/pages/Test</h5>
      <a href="https://tanstack.com/query/latest/docs/framework/react/guides/testing">
        😒✌️ Tansack official testing documentation
      </a>
      <br /> <br />
      <button onClick={() => buttonClick()} className="button">
        Hello world.
      </button>
    </Wrapper>
  );
};

export default Test;
