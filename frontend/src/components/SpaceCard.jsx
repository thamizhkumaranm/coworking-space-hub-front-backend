import { Link } from "react-router-dom";

function SpaceCard({ space, isSaved, onToggleSaved }) {
  return (
    <article className="space-card">
      <div className="space-card-media">
        <img
          src={space.image}
          alt={`${space.name} coworking space in ${space.city}`}
          width="1200"
          height="750"
          loading="lazy"
        />
        <span className="space-type">{space.type}</span>
      </div>

      <div className="space-card-content">
        <div className="space-card-meta">
          <span>{space.city}</span>
          <span>Rating {space.rating}</span>
        </div>
        <h2>{space.name}</h2>
        <p className="space-price">
          <strong>Rs. {space.pricePerDay.toLocaleString("en-IN")}</strong>
          <span> / day</span>
        </p>
        <ul className="amenity-list" aria-label="Top amenities">
          {space.amenities.slice(0, 2).map((amenity) => (
            <li key={amenity}>{amenity}</li>
          ))}
        </ul>
        <div className="space-card-actions">
          <Link className="details-link" to={`/spaces/${space.id}`}>
            View details
          </Link>
          <button
            className="save-button"
            type="button"
            aria-pressed={isSaved}
            onClick={() => onToggleSaved(space.id)}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default SpaceCard;
