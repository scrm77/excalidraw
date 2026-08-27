import React, { useState } from "react";

import { Dialog } from "@excalidraw/excalidraw/components/Dialog";
import { Island } from "@excalidraw/excalidraw/components/Island";
import { FilledButton } from "@excalidraw/excalidraw/components/FilledButton";

import { useAtom } from "../app-jotai";
import { storageConfigAtom } from "../app-jotai";

export type StorageType = "default" | "indexed-db";

const StorageSettingsDialog = ({ onClose }: { onClose: () => void }) => {
  const [config, setConfig] = useAtom(storageConfigAtom);
  const [storageType, setStorageType] = useState<StorageType>(config.type);

  const handleSave = () => {
    setConfig({ type: storageType });
    onClose();
  };

  const renderForm = () => {
    switch (storageType) {
      case "indexed-db":
        return (
          <p>
            Your canvases are stored securely in your browser's local database.
            They are not synced online.
          </p>
        );
      case "default":
      default:
        return (
          <p>
            Your data is stored on the default backend of this Excalidraw
            instance. This requires you to be logged in.
          </p>
        );
    }
  };

  return (
    <Dialog
      onCloseRequest={onClose}
      title={"Data Source Settings"}
      className="storage-settings-dialog"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <p>Choose where this browser should keep your editable canvases.</p>

        <select
          value={storageType}
          onChange={(e) => setStorageType(e.target.value as StorageType)}
          style={{
            padding: "0.5rem",
            borderRadius: "var(--border-radius-lg)",
            border: "1px solid var(--color-border-outline)",
          }}
        >
          <option value="indexed-db">This browser only</option>
          <option value="default">My server (online)</option>
        </select>

        <Island style={{ padding: "1rem" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {renderForm()}
          </div>
        </Island>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
        >
          <FilledButton color="primary" label={"Save"} onClick={handleSave} />
        </div>
      </div>
    </Dialog>
  );
};

export default StorageSettingsDialog;
