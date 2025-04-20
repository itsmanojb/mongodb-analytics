import { useAppContext } from "../hooks/appContext";
import { formatSize } from "../utils/helper";

export default function DatabaseSelector() {
  const {
    state: { databases },
    dispatch,
  } = useAppContext();

  return (
    <div className="grid h-full p-4 place-content-center mx-auto">
      <div className="space-y-2">
        <p className="block text-sm/6 font-medium ">Select Database</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {databases.map((item, index) => (
            <button
              type="button"
              key={index}
              onClick={() =>
                dispatch({ type: "SET_SELECTED_DB", payload: item.name })
              }
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-700 px-6 py-5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 cursor-pointer outline-0">
              <div className="shrink-0 text-green-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs mt-1 opacity-50">
                  {formatSize(item.sizeOnDisk)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
