import { Link, useParams } from "react-router-dom";


function SpaceDetails({ spaces, isLoading, error, savedIds, onToggleSaved }) {
  const { spaceId } = useParams();
  if (isLoading) {
    return (
      <main>
        <p>Loading space details...</p>
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
  const space = spaces.find((item) => item.id === Number(spaceId));

  if (!space) {
    return (
      <main className="empty-state">
        <h1>Space not found</h1>
        <p>This workspace may have been removed or the link is incorrect.</p>
        <Link className="primary-link" to="/">
          Return to browse
        </Link>
      </main>
    ); 
  }

  const isSaved = savedIds.includes(space.id);

  return (
    <main className="space-details">
      <Link className="back-link" to="/">
        <span aria-hidden="true">&larr;</span> Back to browse
      </Link>

      <section className="detail-layout">
        <div className="detail-media">
          <img
            className="detail-image"
            src={space.image}
            alt={`${space.name} coworking space in ${space.city}`}
            width="1200"
            height="900"
          />
        </div>

        <div className="detail-panel">
          <p className="eyebrow">{space.city}</p>
          <h1>{space.name}</h1>
          <p className="detail-type">{space.type}</p>

          <div className="detail-stats">
            <div>
              <span>Member rating</span>
              <strong>{space.rating} / 5</strong>
            </div>
            <div>
              <span>Day pass from</span>
              <strong>Rs. {space.pricePerDay.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <p className="detail-copy">
            A comfortable, ready-to-work space with the essentials covered so
            you can focus from the moment you arrive.
          </p>

          <div className="detail-actions">
            <Link className="primary-link" to={`/inquiry/${space.id}`}>
              Send an inquiry
            </Link>
            <button
              className="detail-save-button"
              type="button"
              aria-pressed={isSaved}
              onClick={() => onToggleSaved(space.id)}
            >
              {isSaved ? "Saved" : "Save space"}
            </button>
          </div>
        </div>
      </section>

      <section className="amenities-section" aria-labelledby="amenities-title">
        <div>
          <p className="eyebrow">Included with your booking</p>
          <h2 id="amenities-title">Everything you need for a productive day.</h2>
        </div>

        <ul className="detail-amenities">
          {space.amenities.map((amenity) => (
            <li key={amenity}>
              <span aria-hidden="true">&#10003;</span>
              {amenity}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default SpaceDetails;
