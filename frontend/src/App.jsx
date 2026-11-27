import { Link, NavLink, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browse";
import Saved from "./pages/Saved";
import "./App.css";
import { useEffect, useState } from "react";
import Inquiry from "./pages/Inquiry";
import SpaceDetails from "./pages/SpaceDetails";

function App() {
  const [spaces, setSpaces] = useState([]);
  const [spacesLoading, setSpacesLoading] = useState(true);
  const [spacesError, setSpacesError] = useState("");
  
  useEffect(() => {
    async function loadSpaces() {
      try {
        const response = await fetch("http://localhost:3000/api/spaces");

        if (!response.ok) {
          throw new Error("Could not load spaces.");
        }

        const data = await response.json();
        setSpaces(data);
      } catch {
        setSpacesError("Could not load coworking spaces.");
      } finally {
        setSpacesLoading(false);
      }
    }

    loadSpaces();
  }, []);

  const [savedIds, setSavedIds] = useState(() => {
    const storedIds = localStorage.getItem("cowork-saved-ids");

    if (!storedIds) {
      return [];
    }

    try {
      const parsedIds = JSON.parse(storedIds);
      return Array.isArray(parsedIds) ? parsedIds : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cowork-saved-ids", JSON.stringify(savedIds));
  }, [savedIds]);

  function toggleSaved(spaceId) {
    setSavedIds((currentIds) =>
      currentIds.includes(spaceId)
        ? currentIds.filter((id) => id !== spaceId)
        : [...currentIds, spaceId],
    );
  }

  return (
    <>
      <header className="app-header">
        <nav className="navbar" aria-label="Main navigation">
          <Link className="brand" to="/">
            Cowork
          </Link>

          <div className="nav-links">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/"
              end
            >
              Browse
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/saved"
            >
              Saved
            </NavLink>
          </div>
        </nav>
      </header>

      <div className="page-container">
        <Routes>
          <Route
            path="/"
            element={
              <Browse
                spaces={spaces}
                isLoading={spacesLoading}
                error={spacesError}
                savedIds={savedIds}
                onToggleSaved={toggleSaved}
              />
            }
          />

          <Route
            path="/saved"
            element={
              <Saved
                spaces={spaces}
                isLoading={spacesLoading}
                error={spacesError}
                savedIds={savedIds}
                onToggleSaved={toggleSaved}
              />
            }
          />

          <Route
            path="/spaces/:spaceId"
            element={
              <SpaceDetails
                spaces={spaces}
                isLoading={spacesLoading}
                error={spacesError}
                savedIds={savedIds}
                onToggleSaved={toggleSaved}
              />
            }
          />
          <Route
            path="/inquiry/:spaceId"
            element={
              <Inquiry
                spaces={spaces}
                isLoading={spacesLoading}
                error={spacesError}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
