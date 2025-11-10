import React, { type ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
  loading?: boolean;
};

export default function SearchBar({ value, onChange, onRefresh, loading }: Props) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <input
        value={value}
        onChange={onChange}
        placeholder="Search titles…"
        aria-label="Search articles by title"
        style={{ flex: 1, padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6 }}
      />
      <button
        onClick={onRefresh}
        type="button"
        aria-label="Refresh news list"
        disabled={loading}
        style={{
          padding: "8px 10px",
          border: "1px solid #ddd",
          borderRadius: 6,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Loading…" : "Refresh"}
      </button>
    </div>
  );
}