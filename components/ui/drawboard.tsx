"use client";

import dynamic from "next/dynamic";
import "tldraw/tldraw.css";
import { useMemo } from "react";
import { useSync } from "@tldraw/sync";
import { TLAssetStore, defaultShapeUtils, defaultBindingUtils } from "tldraw";
import { useEffect } from "react";

const Tldraw = dynamic(() => import("tldraw").then((m) => m.Tldraw), {
  ssr: false,
});

const fileToDataUrl = (file: File) =>
  new Promise<string>((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

const inlineAssetStore: TLAssetStore = {
  async upload(_, file) {
    const src = await fileToDataUrl(file);
    return { src };
  },
  resolve(asset) {
    return asset.props.src;
  },
};

export default function Drawboard() {
  const store = useSync({
    uri: `${process.env.NEXT_PUBLIC_SYNC_SERVER}/public-board`,
    assets: inlineAssetStore,
    shapeUtils: useMemo(() => [...defaultShapeUtils], []),
    bindingUtils: useMemo(() => [...defaultBindingUtils], []),
  });

  useEffect(() => {
    if (store.status !== "synced-remote") return;

    console.log("🧠 store connected with status:", store.connectionStatus);

    const unsubscribe = store.store.listen(() => {
      console.log("💡 store updated, connection:", store.connectionStatus);
    });

    return unsubscribe;
  }, [store]);
  return <Tldraw store={store} />;
}
