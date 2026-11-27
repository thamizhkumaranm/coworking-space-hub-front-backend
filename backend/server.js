const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (request, response) => {
  response.json({
    status: "ok",
    message: "Coworking Space API is running",
  });
});
const spaces = [
  {
    id: 1,
    name: "Work Central",
    city: "py",
    type: "Private Office",
    pricePerDay: 600,
    rating: 4.5,
    amenities: ["Wi-Fi", "Coffee", "Meeting Room"],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    name: "Hub Central",
    city: "Tirunelveli",
    type: "Hot Desk",
    pricePerDay: 650,
    rating: 4.1,
    amenities: ["Wi-Fi", "Snacks", "Coffee", "Meeting Room"],
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    name: "PY Central",
    city: "Auroville",
    type: "Dedicated Desk",
    pricePerDay: 850,
    rating: 4.0,
    amenities: ["Wi-Fi", "Tea", "Meeting Room"],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    name: "WorkHub Central",
    city: "Pondicherry",
    type: "Premium Private Office",
    pricePerDay: 5650,
    rating: 4.9,
    amenities: ["Wi-Fi", "Food", "Coffee", "Meeting Room"],
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85",
  },
];
const inquiries = [];
function findSpaceById(spaceId) {
  return spaces.find((space) => space.id === spaceId);
}
const spacesRouter = express.Router();


spacesRouter.get("/", (request, response) => {
  response.json(spaces);
});

spacesRouter.get("/:id", (request, response) => {
  const spaceId = Number(request.params.id);

  const space = findSpaceById(spaceId);

  if (!space) {
    return response.status(404).json({
      message: "Space not found",
    });
  }

  response.json(space);
});
app.use("/api/spaces", spacesRouter);

const inquiriesRouter = express.Router();

inquiriesRouter.get("/", (request, response) => {
  response.json(inquiries);
});

inquiriesRouter.post("/", (request, response) => {
  const { spaceId, name, email, phone, visitDate, teamSize, message } =
    request.body;

  if (!spaceId || !name || !email || !visitDate || !teamSize) {
    return response.status(400).json({
      message: "Please provide all required fields.",
    });
  }

  if (!email.includes("@")) {
    return response.status(400).json({
      message: "Please provide a valid email address.",
    });
  }

  const newInquiry = {
    id: inquiries.length + 1,
    spaceId: Number(spaceId),
    name: name.trim(),
    email,
    phone: phone || "",
    visitDate,
    teamSize: Number(teamSize),
    message: message || "",
  };

  inquiries.push(newInquiry);

  response.status(201).json({
    message: "Inquiry created successfully.",
    inquiry: newInquiry,
  });
});
app.use("/api/inquiries", inquiriesRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

