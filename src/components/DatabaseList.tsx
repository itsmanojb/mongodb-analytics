import { Database } from "../AppContext";
import { classNames } from "../utils/helper";
import { DBStats } from "./Dashboard";

type Props = {
  databases: Database[];
  selectedDb: string;
  stats: DBStats;
  onDBChange: (db: string) => void;
};

export default function DatabaseList({
  databases,
  selectedDb,
  stats,
  onDBChange,
}: Props) {
  return (
    <div>
      <details>
        <summary className="bg-gray-50 dark:bg-neutral-700 flex items-center gap-x-3 py-2 px-3.5 text-sm/6 w-full focus-visible:outline-green-700 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
            className={classNames("text-green-700", "size-4 shrink-0")}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
            />
          </svg>
          All Databases
        </summary>
        <div role="list" className="space-y-1 p-2">
          {databases.map((db, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => onDBChange(db.name)}
                className={classNames(
                  db.name === selectedDb
                    ? "bg-gray-50 dark:bg-neutral-700 rounded-t-md"
                    : "hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-md cursor-pointer",
                  "group flex items-center gap-x-3 p-1.5 text-sm/6 w-full focus-visible:outline-green-700"
                )}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                  className={classNames(
                    db.name === selectedDb
                      ? "text-green-700"
                      : "text-gray-400 group-hover:text-green-700",
                    "size-4 shrink-0"
                  )}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
                {db.name}
              </button>

              {db.name === selectedDb && (
                <div
                  role="list"
                  className="space-y-1 p-2 bg-gray-50 dark:bg-neutral-700 rounded-b-md border-t border-gray-100 dark:border-neutral-600">
                  {stats.collections.map((coll, k) => (
                    <div key={k}>
                      <div
                        className={classNames(
                          "group flex items-center gap-x-3 p-1 text-sm/6 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                        )}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          aria-hidden="true"
                          className="size-4 shrink-0">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                          />
                        </svg>

                        {coll.name}
                        <span
                          aria-hidden="true"
                          className="ml-auto w-8 min-w-max rounded-full px-1 py-0.5 text-center text-xs font-medium whitespace-nowrap ring-1 ring-gray-200/30 ring-inset">
                          {coll.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
