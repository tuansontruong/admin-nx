import { ColorRing } from "react-loader-spinner";

export const LoadingSpinner = () => {
  return (
    <div className="w-full h-[100vh] top-0 left-0 flex justify-center items-center">
      <ColorRing
        visible={true}
        height="160"
        width="160"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};
