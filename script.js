document.addEventListener("DOMContentLoaded", function () {
  // Initialize map container safely
  const mapElement = document.getElementById("sri-lanka-map");
  if (!mapElement) return;

  const map = L.map("sri-lanka-map", {
    scrollWheelZoom: false // Prevents accidental scrolling on mobile
  }).setView([7.5, 80.5], 8);

  // Clean English-Only Map (Esri World Street Map)
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom'
  }).addTo(map);

  // Accurate Route Pins with Specific Single Hotels
  const routeStops = [
    {
      day: "Days 1 – 3",
      title: "Habarana & Sigiriya",
      stay: "Wewa Addara Hotel (3 Nights, Half Board)",
      coords: [8.0339, 80.7533],
      desc: "Airport transfer, Sigiriya Rock Fortress, Village Tour & Ayurveda Massage."
    },
    {
      day: "Day 4",
      title: "Kandy",
      stay: "Topaz Hotel (1 Night, Half Board)",
      coords: [7.2906, 80.6337],
      desc: "Dambulla Cave Temple, Spice Garden, Temple of the Tooth & Kandyan Cultural Show."
    },
    {
      day: "Day 5",
      title: "Nuwara Eliya",
      stay: "Araliya Red Hotel (1 Night, Half Board)",
      coords: [6.9497, 80.7891],
      desc: "Gem Museum, Tea Plantation & Factory tour, Ramboda Falls."
    },
    {
      day: "Day 6",
      title: "Ella",
      stay: "Hillcrest Ella (1 Night, Half Board)",
      coords: [6.8667, 81.0466],
      desc: "Scenic mountain Train Ride through highlands and tea country to Ella."
    },
    {
      day: "Day 7",
      title: "Tissamaharama / Yala",
      stay: "Hotel Tamarind Tree (1 Night, Half Board)",
      coords: [6.2842, 81.2882],
      desc: "4x4 Wildlife Jeep Safari in Yala National Park."
    },
    {
      day: "Day 8",
      title: "Down South (Bentota / Induruwa)",
      stay: "Pandanus Beach Resort & Spa (1 Night, Half Board)",
      coords: [6.3861, 80.0039],
      desc: "UNESCO Galle Fort, Madu River / Koggala Lagoon & Sea Turtle Hatchery."
    },
    {
      day: "Day 9",
      title: "Departure",
      stay: "Departure Transfer",
      coords: [7.2083, 79.8358], // Katunayake Airport / Negombo
      desc: "Private transfer to Bandaranaike International Airport for departure flight."
    }
  ];

  const routeCoords = [];

  // Custom Numbered Markers & Popups
  routeStops.forEach((stop, index) => {
    routeCoords.push(stop.coords);

    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<span>${index + 1}</span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const popupContent = `
      <div style="font-family: 'Jost', sans-serif; padding: 4px; max-width: 220px;">
        <span style="background:#0284c7; color:white; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px;">${stop.day}</span>
        <h6 style="margin: 6px 0 2px 0; font-weight:800; color:#0f172a; font-size: 14px;">${stop.title}</h6>
        <p style="font-size:12px; margin:0; color:#334155;"><strong>Stay:</strong> ${stop.stay}</p>
        <p style="font-size:12px; margin-top:4px; color:#1e293b; line-height: 1.4;">${stop.desc}</p>
      </div>
    `;

    L.marker(stop.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  // Dashed Route Line Connecting Destination Coordinates
  const polyline = L.polyline(routeCoords, {
    color: '#a8843f',
    weight: 4,
    opacity: 0.9,
    dashArray: '6, 8'
  }).addTo(map);

  // Auto Fit Map View to show all Pins cleanly
  const fitMapBounds = () => {
    const isMobile = window.innerWidth < 768;
    const paddingVal = isMobile ? [15, 15] : [35, 35];
    map.fitBounds(polyline.getBounds(), { padding: paddingVal });
  };

  fitMapBounds();

  // Recalculate view on screen resize or orientation change
  window.addEventListener('resize', () => {
    map.invalidateSize();
    fitMapBounds();
  });
});