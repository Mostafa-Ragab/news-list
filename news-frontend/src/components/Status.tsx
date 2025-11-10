export function ErrorText({ text }: { text: string }) {
  if (!text) return null;
  return (
    <p role="alert" style={{ color: "crimson", marginTop: 0 }}>
      {text}
    </p>
  );
}

export function EmptyState({ show, text = "No results." }: { show: boolean; text?: string }) {
  if (!show) return null;
  return <p>{text}</p>;
}