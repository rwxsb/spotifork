"use client";
import { createStore } from "./store";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = createStore();
  return <Provider store={store}>{children}</Provider>;
}
