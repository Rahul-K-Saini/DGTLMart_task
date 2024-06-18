import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Loading() {
  return (
    <div>
      <Skeleton  height={100} width={100} count={100} inline={true}  />
    </div>
  );
}

export default Loading;
