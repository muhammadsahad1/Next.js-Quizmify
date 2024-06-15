import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#00BFFF" size={150} />
    </div>
  );
}
