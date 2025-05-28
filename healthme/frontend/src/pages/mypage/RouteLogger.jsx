import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function RouteLogger() {
  const loc = useLocation();
  useEffect(() => {
    console.trace("ROUTE ➜", loc.pathname + loc.search);
  }, [loc]);
  return null;
}
export default RouteLogger;
