import { createContext, useReducer, ReactNode } from "react";

export interface Database {
  name: string;
  sizeOnDisk: number;
  empty: boolean;
}

interface AppState {
  connectionUri: string;
  connectionName?: string;
  connected: boolean;
  databases: Database[];
  selectedDb: string | null;
}

type AppAction =
  | {
      type: "SET_CONNECTED";
      payload: {
        uri: string;
        name?: string;
        connected: boolean;
        databases: Database[];
      };
    }
  | { type: "SET_SELECTED_DB"; payload: string | null };

const initialState: AppState = {
  connectionUri: "localhost:27017",
  connectionName: "",
  connected: false,
  databases: [],
  selectedDb: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_CONNECTED":
      return {
        ...state,
        connectionUri: action.payload.uri,
        connectionName: action.payload.name || action.payload.uri,
        connected: action.payload.connected,
        databases: action.payload.databases,
      };
    case "SET_SELECTED_DB":
      return {
        ...state,
        selectedDb: action.payload,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
}

export const AppContext = createContext<
  { state: AppState; dispatch: React.Dispatch<AppAction> } | undefined
>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
