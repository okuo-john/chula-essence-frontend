export const SERVICES = [
  { id: "installation", name: "Installation", price: 20000, exact: true },
  { id: "cluster-lashes", name: "Cluster Lashes", price: 12000, exact: true },
  { id: "nails", name: "Nails", price: 10000, exact: false },
  { id: "pedicure", name: "Pedicure", price: 8000, exact: false },
  { id: "wigging", name: "Wigging & Revamping", price: 15000, exact: false },
];

export const SHOP_LOCATION = {
  name: "Chula Essence Current Service Location",
  address: "Country home road,",
  cityState: "Benin City, Edo State.",
  landmark: "Opposite Agip Filling Station, Sapele Road.",
};

export const LOCATION_OPTIONS = [
  { id: "home", title: "Home Service", description: "We come to you." },
  { id: "shop", title: "Shop Service", description: "Visit our current service location." },
];

export const ADDRESS_FIELDS = [
  { id: "address", label: "Address", placeholder: "Enter your address" },
  { id: "city", label: "City", placeholder: "Enter city" },
  { id: "state", label: "State", placeholder: "Enter state" },
  { id: "landmark", label: "Landmark", placeholder: "Enter landmark" },
];

export const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const TIME_SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
export const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const EMPTY_ADDRESS_FORM = {
  address: "",
  city: "",
  state: "",
  landmark: "",
  instructions: "",
};