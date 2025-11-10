export default function SearchBar({value, onChange, onRefresh}: any) {
  return (
    <div style={{display:"flex", gap:"8px", marginBottom:"10px"}}>
      <input
        placeholder="Search…"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button onClick={onRefresh}>Refresh</button>
    </div>
  )
}