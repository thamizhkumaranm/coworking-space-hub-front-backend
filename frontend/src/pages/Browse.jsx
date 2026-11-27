import { useState } from "react";
import SpaceCard from "../components/SpaceCard";

function Browse({ spaces, isLoading, error, savedIds, onToggleSaved }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  
 const filteredSpaces = spaces.filter((space) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      space.name.toLowerCase().includes(search) ||
      space.city.toLowerCase().includes(search);
    const matchesType = typeFilter === "All" || space.type === typeFilter;
    const matchesPrice =
      maxPrice === "" || space.pricePerDay <= Number(maxPrice);

    return matchesSearch && matchesType && matchesPrice;
  });

  function clearFilters() {
    setSearchTerm("");
    setTypeFilter("All");
    setMaxPrice("");
  }
  if (isLoading) {
    return (
      <main>
        <p>Loading coworking spaces...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>
      </main>
    );
  }
  return (
    <main className="browse-page">
      <section className="browse-hero">
        <p className="eyebrow">Flexible workspaces, thoughtfully selected</p>
        <h1>Find a workspace that fits your day.</h1>
        <p className="hero-copy">
          Compare inspiring coworking spaces across Tamil Nadu and Puducherry.
        </p>
      </section>

      <section className="filter-panel" aria-label="Filter coworking spaces">
        <div className="filter-grid">
          <div className="search-control">
            <label htmlFor="space-search">Search</label>
            <input
              id="space-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Name or city"
            />
          </div>
          <div className="filter-control">
            <label htmlFor="type-filter">Workspace type</label>
            <select
              id="type-filter"
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
            >
              <option value="All">All types</option>
              <option value="Hot Desk">Hot Desk</option>
              <option value="Dedicated Desk">Dedicated Desk</option>
              <option value="Private Office">Private Office</option>
              <option value="Premium Private Office">
                Premium Private Office
              </option>
            </select>
          </div>
          <div className="filter-control">
            <label htmlFor="max-price">Maximum daily price</label>
            <input
              id="max-price"
              type="number"
              min="0"
              step="50"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="No maximum"
            />
          </div>
        </div>

        <div className="filter-footer">
          <p aria-live="polite">
            <strong>{filteredSpaces.length}</strong>{" "}
            {filteredSpaces.length === 1 ? "space" : "spaces"} found
          </p>
          <button className="clear-button" type="button" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      </section>

      {filteredSpaces.length > 0 ? (
        <section className="spaces-grid" aria-label="Coworking spaces">
          {filteredSpaces.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              isSaved={savedIds.includes(space.id)}
              onToggleSaved={onToggleSaved}
            />
          ))}
        </section>
      ) : (
        <div className="empty-state">
          <h2>No spaces found</h2>
          <p>Try a different city, workspace type, or maximum price.</p>
        </div>
      )}
    </main>
  );
}

export default Browse;
