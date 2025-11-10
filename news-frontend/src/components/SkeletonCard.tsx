export default function SkeletonCard() {
  return (
    <div className="skel">
      <div className="skel__thumb" />
      <div style={{ flex: 1 }}>
        <div className="skel__line" style={{ width: "70%", marginBottom: 8 }} />
        <div className="skel__line" style={{ width: "52%", marginBottom: 8 }} />
        <div className="skel__line" style={{ width: "90%" }} />
      </div>
    </div>
  );
}