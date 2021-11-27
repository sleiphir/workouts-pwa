import { useEffect, useState } from "react";
import Store from "../store/store";

export function useStore(): Store {
  const [store, setStore]: any = useState(null);
  
  useEffect(() => {
    const store = new Store(window.localStorage);
    setStore(store);
  }, []);

  return store;
}

export default useStore;