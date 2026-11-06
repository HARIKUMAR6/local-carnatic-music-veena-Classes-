/**
 * Academy contact details: the ONLY place they are defined.
 * Header/footer, the Contact page and any future page read from here.
 *
 * PROVISIONAL SAMPLE CONTENT. No verified academy details have been supplied.
 *  - The address is invented (it is not a real building) and must not be used with maps or directions.
 *  - The phone number ends in 00000 so it cannot belong to a real subscriber.
 *  - The email uses the reserved ".example" domain, which can never receive mail.
 * Replace every value below with the academy's verified details, then set `provisional` to false
 * (that hides the "sample details" notices shown on the Contact page).
 */
export const contact = {
  provisional: true,
  academyName: "NadaVeena Academy of Carnatic Music",
  address: {
    building: "Nada Illam, 12/4 Sundaram Street",
    locality: "Mylapore",
    city: "Chennai",
    state: "Tamil Nadu",
    pin: "600004",
    country: "India",
  },
  email: "hello@nadaveena.example",
  phone: { display: "+91 98765 00000", tel: "+919876500000" },
  // Timings are enquiry-based on purpose: no schedule has been confirmed.
  hoursNote: "Class timings and batches are shared when you enquire.",
};

/** Address as ordered display lines. */
export const addressLines = (a = contact.address) => [a.building, `${a.locality}, ${a.city}`, `${a.state} ${a.pin}`, a.country];

/** Single address string used for display, the map embed and Get Directions, so all three always agree. */
export const addressQuery = () => addressLines().join(", ");
/** Keyless Google Maps embed + directions links (no API key or backend). Both resolve the same address text. */
export const mapEmbedUrl = () => `https://maps.google.com/maps?q=${encodeURIComponent(addressQuery())}&z=16&output=embed`;
export const directionsUrl = () => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressQuery())}`;
