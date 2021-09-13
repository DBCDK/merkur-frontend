export default function FileFilter({ agencies }) {
  const filtered = agencies.filter((x) => x !== undefined);

  return (
    <div>
      <select name="agency_select" id="agency_select">
        <option value="all" key="all">
          Alle
        </option>
        {filtered.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
