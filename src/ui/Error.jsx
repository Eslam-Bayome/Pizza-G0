import { useRouteError } from "react-router-dom";
import LinkBtn from "./LinkBtn";

function Error() {
  const error = useRouteError();
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.message || error.error.message || error.data}</p>
      <LinkBtn to={"-1"}>&larr; Go back</LinkBtn>
    </div>
  );
}

export default Error;
