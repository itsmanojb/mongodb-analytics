import ConnectForm from "./components/ConnectForm";
import Dashboard from "./components/Dashboard";
import DatabaseSelector from "./components/DatabaseSelector";
import { useAppContext } from "./hooks/appContext";

export default function App() {
  const {
    state: { connected, selectedDb },
  } = useAppContext();

  return (
    <div className="h-screen overflow-x-clip">
      {!connected ? (
        <ConnectForm />
      ) : (
        <>{!selectedDb ? <DatabaseSelector /> : <Dashboard />}</>
      )}
    </div>
  );
}
