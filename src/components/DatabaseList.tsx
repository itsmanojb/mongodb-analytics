import { formatSize } from "../utils/helper";
import { Database } from "./ConnectForm";

interface DatabaseListProps {
  items: Database[];
  onItemClick: (item: string) => void;
}

const DatabaseList: React.FC<DatabaseListProps> = ({
  items,
  onItemClick,
}: DatabaseListProps) => {
  return (
    <div className="space-y-2">
      <p className="block text-sm/6 font-medium text-gray-800">
        Select Database
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <button
            type="button"
            key={index}
            onClick={() => onItemClick(item.name)}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1 cursor-pointer outline-0">
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
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-500">
                {formatSize(item.sizeOnDisk)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DatabaseList;
