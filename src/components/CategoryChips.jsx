export default function CategoryChips({ categories = [], selected, onSelect }) {
  if (!categories.length) return null;
  return (
    <div className="chips">
      {categories.slice(0, 10).map((c) => {
        const name = c.strCategory;
        const active = selected === name;
        return (
          <button
            key={name}
            className={`chip ${active ? "chip--active" : ""}`}
            onClick={() => onSelect(name)}
            type="button"
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
