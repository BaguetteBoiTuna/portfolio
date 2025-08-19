"use client";

import dynamic from "next/dynamic";
import "tldraw/tldraw.css";
import { useEffect, useMemo } from "react";
import { useSync } from "@tldraw/sync";
import { TLAssetStore, defaultShapeUtils, defaultBindingUtils } from "tldraw";

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
  const shapeUtils = useMemo(() => defaultShapeUtils, []);
  const bindingUtils = useMemo(() => defaultBindingUtils, []);

  const store = useSync({
    uri: `${process.env.NEXT_PUBLIC_SYNC_ENDPOINT}/api/connect/public-board`,
    assets: inlineAssetStore,
    shapeUtils,
    bindingUtils,
  });

  useEffect(() => {
    if (store.status !== "synced-remote" || !store.store) return;

    console.log("🧠 store connected with status:", store.connectionStatus);
    const unsub = store.store.listen(() => {
      console.log("💡 store updated, connection:", store.connectionStatus);
    });
    return unsub;
  }, [store]);

  return <Tldraw store={store} />;
}
