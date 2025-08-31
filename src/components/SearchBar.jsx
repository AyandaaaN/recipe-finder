export default function SearchBar({ value, onChange, onSearch }) {
  const handleKey = (e) => { if (e.key === "Enter") onSearch(); };

  return (
    <div className="searchbar">
      <label htmlFor="ing">Enter ingredient(s), comma-separated</label>
      <input
        id="ing"
        placeholder="e.g., chicken, garlic"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
      />
      <button className="btn btn-primary" onClick={onSearch}>Search</button>
    </div>
  );
}
