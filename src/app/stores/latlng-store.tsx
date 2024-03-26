import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

export type LatLngState = {
  lat: number;
  lng: number;
};

export type LatLngActions = {
  setLatlng: (props: LatLngState) => void;
};

export type OptionMapState = {};

export type LatLngStore = LatLngState & LatLngActions & OptionMapState;

const createLatLngStore = createStore<LatLngStore>((set) => ({
  lat: 0,
  lng: 0,
  setLatlng: (props) => set((state) => ({ lat: props.lat, lng: props.lng })),
}));

const LatLngContext = createContext<typeof createLatLngStore | null>(null);

export const LatlngContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const store = useRef(createLatLngStore);

  return (
    <LatLngContext.Provider value={store.current}>
      {children}
    </LatLngContext.Provider>
  );
};

export const useLatLngStore = <T,>(selector: (store: LatLngStore) => T): T => {
  const storeContext = useContext(LatLngContext);

  if (!storeContext) {
    throw new Error(`useLatLngStore must be use within LatlngContextProvider`);
  }

  return useStore(storeContext, selector);
};

export default createLatLngStore;
