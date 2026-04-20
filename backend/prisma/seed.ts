import { PrismaClient, BodyType, FuelType, Transmission } from "@prisma/client";

const prisma = new PrismaClient();

type VariantSeed = {
  name: string;
  priceInr: number;
  fuelType: FuelType;
  transmission: Transmission;
  mileageKmpl: number;
  seating: number;
  safetyRating: number;
  engineCc: number;
  powerBhp: number;
  features: string[];
};

type CarSeed = {
  make: string;
  model: string;
  bodyType: BodyType;
  segment: string;
  lengthMm: number;
  bootLitres: number;
  imageUrl?: string;
  reviews: { rating: number; summary: string; source: string }[];
  variants: VariantSeed[];
};

const F = {
  AC: "auto_ac",
  SUNROOF: "sunroof",
  ADAS: "adas",
  VENT: "ventilated_seats",
  CAM360: "360_cam",
  WCHARGE: "wireless_charging",
  CONN: "connected_car",
  CRUISE: "cruise_control",
  TOUCH: "touchscreen",
};

const cars: CarSeed[] = [
  // -------- Hatchbacks --------
  {
    make: "Maruti", model: "Swift", bodyType: BodyType.HATCH, segment: "Hatchback",
    lengthMm: 3860, bootLitres: 268,
    reviews: [
      { rating: 4.2, summary: "Lively city hatch with strong fuel economy and easy maintenance.", source: "editorial" },
    ],
    variants: [
      { name: "LXi", priceInr: 649000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 24.8, seating: 5, safetyRating: 3, engineCc: 1197, powerBhp: 81, features: [F.AC] },
      { name: "VXi AGS", priceInr: 799000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 25.7, seating: 5, safetyRating: 3, engineCc: 1197, powerBhp: 81, features: [F.AC, F.TOUCH] },
      { name: "ZXi+", priceInr: 919000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 24.8, seating: 5, safetyRating: 3, engineCc: 1197, powerBhp: 81, features: [F.AC, F.TOUCH, F.CONN] },
    ],
  },
  {
    make: "Hyundai", model: "i20", bodyType: BodyType.HATCH, segment: "Premium Hatchback",
    lengthMm: 3995, bootLitres: 311,
    reviews: [
      { rating: 4.3, summary: "Premium hatch feel with rich features and a refined cabin.", source: "editorial" },
    ],
    variants: [
      { name: "Magna", priceInr: 750000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.7, seating: 5, safetyRating: 3, engineCc: 1197, powerBhp: 82, features: [F.AC, F.TOUCH] },
      { name: "Sportz IVT", priceInr: 970000, fuelType: FuelType.PETROL, transmission: Transmission.CVT, mileageKmpl: 20.0, seating: 5, safetyRating: 3, engineCc: 1197, powerBhp: 82, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE] },
      { name: "Asta(O)", priceInr: 1110000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.7, seating: 5, safetyRating: 4, engineCc: 1197, powerBhp: 82, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF] },
    ],
  },
  {
    make: "Tata", model: "Altroz", bodyType: BodyType.HATCH, segment: "Premium Hatchback",
    lengthMm: 3990, bootLitres: 345,
    reviews: [
      { rating: 4.4, summary: "5-star Global NCAP safety with a planted ride.", source: "editorial" },
    ],
    variants: [
      { name: "XE", priceInr: 665000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.3, seating: 5, safetyRating: 5, engineCc: 1199, powerBhp: 86, features: [F.AC] },
      { name: "XZ+", priceInr: 920000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.3, seating: 5, safetyRating: 5, engineCc: 1199, powerBhp: 86, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE] },
      { name: "XZA+ DCA", priceInr: 1099000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 18.5, seating: 5, safetyRating: 5, engineCc: 1199, powerBhp: 86, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF] },
    ],
  },
  {
    make: "Maruti", model: "Baleno", bodyType: BodyType.HATCH, segment: "Premium Hatchback",
    lengthMm: 3990, bootLitres: 318,
    reviews: [
      { rating: 4.1, summary: "Spacious and frugal premium hatch with strong resale.", source: "editorial" },
    ],
    variants: [
      { name: "Sigma", priceInr: 665000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 22.3, seating: 5, safetyRating: 4, engineCc: 1197, powerBhp: 89, features: [F.AC] },
      { name: "Delta AGS", priceInr: 855000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 22.9, seating: 5, safetyRating: 4, engineCc: 1197, powerBhp: 89, features: [F.AC, F.TOUCH] },
      { name: "Alpha", priceInr: 985000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 22.3, seating: 5, safetyRating: 4, engineCc: 1197, powerBhp: 89, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.CAM360] },
    ],
  },

  // -------- Sedans --------
  {
    make: "Honda", model: "City", bodyType: BodyType.SEDAN, segment: "Mid-size Sedan",
    lengthMm: 4549, bootLitres: 506,
    reviews: [
      { rating: 4.5, summary: "Refined petrol sedan with excellent rear seat comfort.", source: "editorial" },
    ],
    variants: [
      { name: "V MT", priceInr: 1199000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 17.8, seating: 5, safetyRating: 5, engineCc: 1498, powerBhp: 119, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "VX CVT", priceInr: 1455000, fuelType: FuelType.PETROL, transmission: Transmission.CVT, mileageKmpl: 18.4, seating: 5, safetyRating: 5, engineCc: 1498, powerBhp: 119, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF] },
      { name: "ZX CVT", priceInr: 1614000, fuelType: FuelType.PETROL, transmission: Transmission.CVT, mileageKmpl: 18.4, seating: 5, safetyRating: 5, engineCc: 1498, powerBhp: 119, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Hyundai", model: "Verna", bodyType: BodyType.SEDAN, segment: "Mid-size Sedan",
    lengthMm: 4535, bootLitres: 528,
    reviews: [
      { rating: 4.4, summary: "Feature-loaded sedan with ADAS and ventilated seats.", source: "editorial" },
    ],
    variants: [
      { name: "EX", priceInr: 1115000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 18.6, seating: 5, safetyRating: 5, engineCc: 1497, powerBhp: 113, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "SX(O) IVT", priceInr: 1640000, fuelType: FuelType.PETROL, transmission: Transmission.CVT, mileageKmpl: 19.6, seating: 5, safetyRating: 5, engineCc: 1497, powerBhp: 113, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.ADAS, F.VENT, F.CAM360] },
      { name: "SX(O) Turbo DCT", priceInr: 1940000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 18.0, seating: 5, safetyRating: 5, engineCc: 1482, powerBhp: 158, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.ADAS, F.VENT, F.CAM360, F.CRUISE] },
    ],
  },
  {
    make: "Skoda", model: "Slavia", bodyType: BodyType.SEDAN, segment: "Mid-size Sedan",
    lengthMm: 4541, bootLitres: 521,
    reviews: [
      { rating: 4.6, summary: "Solid German build with peppy turbo petrol engines.", source: "editorial" },
    ],
    variants: [
      { name: "Active 1.0", priceInr: 1135000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.4, seating: 5, safetyRating: 5, engineCc: 999, powerBhp: 113, features: [F.AC, F.TOUCH] },
      { name: "Style 1.5 DSG", priceInr: 1899000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 19.4, seating: 5, safetyRating: 5, engineCc: 1498, powerBhp: 148, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.VENT, F.CRUISE] },
    ],
  },
  {
    make: "Maruti", model: "Dzire", bodyType: BodyType.SEDAN, segment: "Compact Sedan",
    lengthMm: 3995, bootLitres: 378,
    reviews: [
      { rating: 4.2, summary: "Frugal compact sedan, great for cab and city use.", source: "editorial" },
    ],
    variants: [
      { name: "LXi", priceInr: 670000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 24.8, seating: 5, safetyRating: 4, engineCc: 1197, powerBhp: 81, features: [F.AC] },
      { name: "VXi AGS", priceInr: 825000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 25.7, seating: 5, safetyRating: 4, engineCc: 1197, powerBhp: 81, features: [F.AC, F.TOUCH] },
      { name: "ZXi+ AGS", priceInr: 1024000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 25.7, seating: 5, safetyRating: 4, engineCc: 1197, powerBhp: 81, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF] },
    ],
  },

  // -------- Compact SUVs --------
  {
    make: "Hyundai", model: "Venue", bodyType: BodyType.SUV, segment: "Compact SUV",
    lengthMm: 3995, bootLitres: 350,
    reviews: [
      { rating: 4.2, summary: "Featured-packed sub-4m SUV with smooth engines.", source: "editorial" },
    ],
    variants: [
      { name: "E", priceInr: 799000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 17.5, seating: 5, safetyRating: 3, engineCc: 1197, powerBhp: 82, features: [F.AC] },
      { name: "SX Turbo DCT", priceInr: 1330000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 18.3, seating: 5, safetyRating: 3, engineCc: 998, powerBhp: 118, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360] },
    ],
  },
  {
    make: "Tata", model: "Nexon", bodyType: BodyType.SUV, segment: "Compact SUV",
    lengthMm: 3995, bootLitres: 382,
    reviews: [
      { rating: 4.5, summary: "5-star safety, bold styling, and a wide variant spread.", source: "editorial" },
    ],
    variants: [
      { name: "Smart", priceInr: 800000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 17.4, seating: 5, safetyRating: 5, engineCc: 1199, powerBhp: 118, features: [F.AC] },
      { name: "Creative+ S DCA", priceInr: 1430000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 17.0, seating: 5, safetyRating: 5, engineCc: 1199, powerBhp: 118, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT] },
      { name: "Fearless+ Diesel AT", priceInr: 1565000, fuelType: FuelType.DIESEL, transmission: Transmission.AT, mileageKmpl: 21.5, seating: 5, safetyRating: 5, engineCc: 1497, powerBhp: 113, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.CRUISE] },
    ],
  },
  {
    make: "Kia", model: "Sonet", bodyType: BodyType.SUV, segment: "Compact SUV",
    lengthMm: 3995, bootLitres: 392,
    reviews: [
      { rating: 4.3, summary: "Premium compact SUV with rich features and ADAS.", source: "editorial" },
    ],
    variants: [
      { name: "HTE", priceInr: 799000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 18.4, seating: 5, safetyRating: 4, engineCc: 1197, powerBhp: 82, features: [F.AC] },
      { name: "GTX+ DCT", priceInr: 1499000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 18.3, seating: 5, safetyRating: 4, engineCc: 998, powerBhp: 118, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
      { name: "X-Line Diesel AT", priceInr: 1599000, fuelType: FuelType.DIESEL, transmission: Transmission.AT, mileageKmpl: 19.8, seating: 5, safetyRating: 4, engineCc: 1493, powerBhp: 114, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Mahindra", model: "XUV300", bodyType: BodyType.SUV, segment: "Compact SUV",
    lengthMm: 3995, bootLitres: 257,
    reviews: [
      { rating: 4.3, summary: "Rugged compact SUV with confident handling.", source: "editorial" },
    ],
    variants: [
      { name: "W4", priceInr: 805000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 17.0, seating: 5, safetyRating: 5, engineCc: 1197, powerBhp: 109, features: [F.AC] },
      { name: "W8(O) Diesel", priceInr: 1379000, fuelType: FuelType.DIESEL, transmission: Transmission.MT, mileageKmpl: 20.0, seating: 5, safetyRating: 5, engineCc: 1497, powerBhp: 115, features: [F.AC, F.TOUCH, F.CONN, F.SUNROOF, F.CAM360] },
    ],
  },
  {
    make: "Maruti", model: "Brezza", bodyType: BodyType.SUV, segment: "Compact SUV",
    lengthMm: 3995, bootLitres: 328,
    reviews: [
      { rating: 4.0, summary: "Reliable and easy-to-drive compact SUV.", source: "editorial" },
    ],
    variants: [
      { name: "LXi", priceInr: 850000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 17.4, seating: 5, safetyRating: 4, engineCc: 1462, powerBhp: 102, features: [F.AC] },
      { name: "ZXi AT", priceInr: 1310000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 19.8, seating: 5, safetyRating: 4, engineCc: 1462, powerBhp: 102, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF] },
    ],
  },

  // -------- Mid SUVs --------
  {
    make: "Hyundai", model: "Creta", bodyType: BodyType.SUV, segment: "Mid SUV",
    lengthMm: 4330, bootLitres: 433,
    reviews: [
      { rating: 4.4, summary: "Best-selling mid SUV with strong feature set and resale.", source: "editorial" },
    ],
    variants: [
      { name: "E", priceInr: 1100000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 17.0, seating: 5, safetyRating: 4, engineCc: 1497, powerBhp: 113, features: [F.AC, F.TOUCH] },
      { name: "SX(O) IVT", priceInr: 1900000, fuelType: FuelType.PETROL, transmission: Transmission.CVT, mileageKmpl: 17.7, seating: 5, safetyRating: 4, engineCc: 1497, powerBhp: 113, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
      { name: "SX(O) Diesel AT", priceInr: 2100000, fuelType: FuelType.DIESEL, transmission: Transmission.AT, mileageKmpl: 18.0, seating: 5, safetyRating: 4, engineCc: 1493, powerBhp: 114, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Kia", model: "Seltos", bodyType: BodyType.SUV, segment: "Mid SUV",
    lengthMm: 4365, bootLitres: 433,
    reviews: [
      { rating: 4.3, summary: "Punchy turbo options and feature-rich top trims.", source: "editorial" },
    ],
    variants: [
      { name: "HTK", priceInr: 1170000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 17.0, seating: 5, safetyRating: 3, engineCc: 1497, powerBhp: 113, features: [F.AC, F.TOUCH] },
      { name: "X-Line DCT", priceInr: 2065000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 17.7, seating: 5, safetyRating: 3, engineCc: 1482, powerBhp: 158, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Skoda", model: "Kushaq", bodyType: BodyType.SUV, segment: "Mid SUV",
    lengthMm: 4225, bootLitres: 385,
    reviews: [
      { rating: 4.4, summary: "Solid build, engaging dynamics, and a 5-star NCAP rating.", source: "editorial" },
    ],
    variants: [
      { name: "Active 1.0", priceInr: 1189000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.7, seating: 5, safetyRating: 5, engineCc: 999, powerBhp: 113, features: [F.AC, F.TOUCH] },
      { name: "Style 1.5 DSG", priceInr: 1949000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 19.4, seating: 5, safetyRating: 5, engineCc: 1498, powerBhp: 148, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.VENT, F.CRUISE] },
    ],
  },
  {
    make: "Volkswagen", model: "Taigun", bodyType: BodyType.SUV, segment: "Mid SUV",
    lengthMm: 4221, bootLitres: 385,
    reviews: [
      { rating: 4.5, summary: "European build quality with strong safety credentials.", source: "editorial" },
    ],
    variants: [
      { name: "Comfortline 1.0", priceInr: 1188000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.2, seating: 5, safetyRating: 5, engineCc: 999, powerBhp: 113, features: [F.AC, F.TOUCH] },
      { name: "GT Plus DSG", priceInr: 1962000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 17.9, seating: 5, safetyRating: 5, engineCc: 1498, powerBhp: 148, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.VENT, F.CRUISE] },
    ],
  },
  {
    make: "Tata", model: "Harrier", bodyType: BodyType.SUV, segment: "Premium SUV",
    lengthMm: 4605, bootLitres: 445,
    reviews: [
      { rating: 4.3, summary: "Big road presence, plush ride, 5-star Bharat NCAP.", source: "editorial" },
    ],
    variants: [
      { name: "Smart Diesel", priceInr: 1499000, fuelType: FuelType.DIESEL, transmission: Transmission.MT, mileageKmpl: 16.8, seating: 5, safetyRating: 5, engineCc: 1956, powerBhp: 168, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "Fearless+ AT", priceInr: 2549000, fuelType: FuelType.DIESEL, transmission: Transmission.AT, mileageKmpl: 14.6, seating: 5, safetyRating: 5, engineCc: 1956, powerBhp: 168, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },

  // -------- 7-seaters / MUVs --------
  {
    make: "Mahindra", model: "XUV700", bodyType: BodyType.SUV, segment: "7-seat SUV",
    lengthMm: 4695, bootLitres: 240,
    reviews: [
      { rating: 4.6, summary: "Feature king with ADAS, 7 seats and powerful diesel.", source: "editorial" },
    ],
    variants: [
      { name: "MX 5-str Petrol", priceInr: 1419000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 13.0, seating: 5, safetyRating: 5, engineCc: 1999, powerBhp: 197, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "AX7 L Diesel AT 7-str", priceInr: 2599000, fuelType: FuelType.DIESEL, transmission: Transmission.AT, mileageKmpl: 15.0, seating: 7, safetyRating: 5, engineCc: 2184, powerBhp: 182, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Maruti", model: "Ertiga", bodyType: BodyType.MUV, segment: "MUV",
    lengthMm: 4395, bootLitres: 209,
    reviews: [
      { rating: 4.2, summary: "Frugal and practical 7-seater MUV; great running costs.", source: "editorial" },
    ],
    variants: [
      { name: "LXi", priceInr: 884000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 20.5, seating: 7, safetyRating: 3, engineCc: 1462, powerBhp: 102, features: [F.AC] },
      { name: "ZXi+ AT", priceInr: 1377000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 20.3, seating: 7, safetyRating: 3, engineCc: 1462, powerBhp: 102, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE] },
      { name: "ZXi+ CNG", priceInr: 1314000, fuelType: FuelType.CNG, transmission: Transmission.MT, mileageKmpl: 26.1, seating: 7, safetyRating: 3, engineCc: 1462, powerBhp: 87, features: [F.AC, F.TOUCH, F.CONN] },
    ],
  },
  {
    make: "Hyundai", model: "Alcazar", bodyType: BodyType.SUV, segment: "7-seat SUV",
    lengthMm: 4500, bootLitres: 180,
    reviews: [
      { rating: 4.2, summary: "Premium 6/7-seater SUV with comfortable middle row.", source: "editorial" },
    ],
    variants: [
      { name: "Prestige Petrol", priceInr: 1675000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 14.5, seating: 7, safetyRating: 4, engineCc: 1999, powerBhp: 157, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "Signature Diesel AT", priceInr: 2210000, fuelType: FuelType.DIESEL, transmission: Transmission.AT, mileageKmpl: 18.1, seating: 7, safetyRating: 4, engineCc: 1493, powerBhp: 114, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Tata", model: "Safari", bodyType: BodyType.SUV, segment: "7-seat SUV",
    lengthMm: 4668, bootLitres: 73,
    reviews: [
      { rating: 4.3, summary: "Imposing 7-seater with 5-star Bharat NCAP and ADAS.", source: "editorial" },
    ],
    variants: [
      { name: "Smart Diesel", priceInr: 1599000, fuelType: FuelType.DIESEL, transmission: Transmission.MT, mileageKmpl: 16.3, seating: 7, safetyRating: 5, engineCc: 1956, powerBhp: 168, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "Accomplished+ AT", priceInr: 2645000, fuelType: FuelType.DIESEL, transmission: Transmission.AT, mileageKmpl: 14.5, seating: 7, safetyRating: 5, engineCc: 1956, powerBhp: 168, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Toyota", model: "Innova Hycross", bodyType: BodyType.MUV, segment: "Premium MUV",
    lengthMm: 4755, bootLitres: 300,
    reviews: [
      { rating: 4.6, summary: "Strong hybrid efficiency in a roomy 7/8-seater.", source: "editorial" },
    ],
    variants: [
      { name: "GX Petrol", priceInr: 1900000, fuelType: FuelType.PETROL, transmission: Transmission.CVT, mileageKmpl: 16.1, seating: 8, safetyRating: 5, engineCc: 1987, powerBhp: 172, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "ZX(O) Hybrid", priceInr: 3055000, fuelType: FuelType.HYBRID, transmission: Transmission.CVT, mileageKmpl: 23.2, seating: 7, safetyRating: 5, engineCc: 1987, powerBhp: 184, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },

  // -------- EVs --------
  {
    make: "Tata", model: "Nexon EV", bodyType: BodyType.EV, segment: "Compact EV SUV",
    lengthMm: 3995, bootLitres: 350,
    reviews: [
      { rating: 4.2, summary: "Approachable EV with strong city range and value.", source: "editorial" },
    ],
    variants: [
      { name: "MR Long Range", priceInr: 1249000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 30.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 127, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "Empowered+ LR", priceInr: 1729000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 28.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 142, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT] },
    ],
  },
  {
    make: "MG", model: "ZS EV", bodyType: BodyType.EV, segment: "Mid EV SUV",
    lengthMm: 4323, bootLitres: 448,
    reviews: [
      { rating: 4.3, summary: "Long range EV with comfortable cabin and decent features.", source: "editorial" },
    ],
    variants: [
      { name: "Excite Pro", priceInr: 1898000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 24.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 174, features: [F.AC, F.TOUCH, F.CONN, F.SUNROOF] },
      { name: "Exclusive Plus", priceInr: 2738000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 22.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 174, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Mahindra", model: "XUV400 EV", bodyType: BodyType.EV, segment: "Compact EV SUV",
    lengthMm: 4200, bootLitres: 378,
    reviews: [
      { rating: 4.0, summary: "Punchy electric SUV with quick acceleration.", source: "editorial" },
    ],
    variants: [
      { name: "EC Pro 34.5", priceInr: 1549000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 26.0, seating: 5, safetyRating: 4, engineCc: 0, powerBhp: 148, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "EL Pro 39.4", priceInr: 1919000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 25.0, seating: 5, safetyRating: 4, engineCc: 0, powerBhp: 148, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT] },
    ],
  },

  // -------- Entry-level hatchbacks --------
  {
    make: "Maruti", model: "Alto K10", bodyType: BodyType.HATCH, segment: "Entry Hatchback",
    lengthMm: 3530, bootLitres: 214,
    reviews: [
      { rating: 4.0, summary: "Cheapest way into a new car; fantastic city economy.", source: "editorial" },
    ],
    variants: [
      { name: "STD", priceInr: 419000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 24.4, seating: 5, safetyRating: 2, engineCc: 998, powerBhp: 65, features: [F.AC] },
      { name: "VXi AGS", priceInr: 599000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 24.9, seating: 5, safetyRating: 2, engineCc: 998, powerBhp: 65, features: [F.AC, F.TOUCH] },
      { name: "VXi+ CNG", priceInr: 638000, fuelType: FuelType.CNG, transmission: Transmission.MT, mileageKmpl: 33.8, seating: 5, safetyRating: 2, engineCc: 998, powerBhp: 56, features: [F.AC, F.TOUCH] },
    ],
  },
  {
    make: "Maruti", model: "WagonR", bodyType: BodyType.HATCH, segment: "Tall Hatchback",
    lengthMm: 3655, bootLitres: 341,
    reviews: [
      { rating: 4.1, summary: "Tall, airy cabin with excellent visibility for city traffic.", source: "editorial" },
    ],
    variants: [
      { name: "LXi 1.0", priceInr: 565000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 24.4, seating: 5, safetyRating: 2, engineCc: 998, powerBhp: 65, features: [F.AC] },
      { name: "ZXi+ AGS 1.2", priceInr: 760000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 24.4, seating: 5, safetyRating: 2, engineCc: 1197, powerBhp: 88, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "VXi CNG", priceInr: 686000, fuelType: FuelType.CNG, transmission: Transmission.MT, mileageKmpl: 34.0, seating: 5, safetyRating: 2, engineCc: 998, powerBhp: 56, features: [F.AC] },
    ],
  },
  {
    make: "Hyundai", model: "Grand i10 Nios", bodyType: BodyType.HATCH, segment: "Entry Hatchback",
    lengthMm: 3805, bootLitres: 260,
    reviews: [
      { rating: 4.1, summary: "Premium feel for the segment with refined ride.", source: "editorial" },
    ],
    variants: [
      { name: "Era", priceInr: 580000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 20.7, seating: 5, safetyRating: 3, engineCc: 1197, powerBhp: 82, features: [F.AC] },
      { name: "Sportz AMT", priceInr: 800000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 20.7, seating: 5, safetyRating: 3, engineCc: 1197, powerBhp: 82, features: [F.AC, F.TOUCH, F.CONN] },
    ],
  },
  {
    make: "Tata", model: "Tiago", bodyType: BodyType.HATCH, segment: "Entry Hatchback",
    lengthMm: 3765, bootLitres: 242,
    reviews: [
      { rating: 4.2, summary: "4-star NCAP safety in a budget hatch — rare and welcome.", source: "editorial" },
    ],
    variants: [
      { name: "XE", priceInr: 500000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.8, seating: 5, safetyRating: 4, engineCc: 1199, powerBhp: 84, features: [F.AC] },
      { name: "XZ+ AMT", priceInr: 770000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 19.0, seating: 5, safetyRating: 4, engineCc: 1199, powerBhp: 84, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "XT CNG", priceInr: 670000, fuelType: FuelType.CNG, transmission: Transmission.MT, mileageKmpl: 26.5, seating: 5, safetyRating: 4, engineCc: 1199, powerBhp: 72, features: [F.AC, F.TOUCH] },
    ],
  },
  {
    make: "Renault", model: "Kwid", bodyType: BodyType.HATCH, segment: "Entry Hatchback",
    lengthMm: 3731, bootLitres: 279,
    reviews: [
      { rating: 3.9, summary: "Mini-SUV looks at hatchback prices.", source: "editorial" },
    ],
    variants: [
      { name: "RXE", priceInr: 470000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 22.3, seating: 5, safetyRating: 1, engineCc: 999, powerBhp: 67, features: [F.AC] },
      { name: "Climber AMT", priceInr: 620000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 22.0, seating: 5, safetyRating: 1, engineCc: 999, powerBhp: 67, features: [F.AC, F.TOUCH] },
    ],
  },

  // -------- More compact sedans --------
  {
    make: "Hyundai", model: "Aura", bodyType: BodyType.SEDAN, segment: "Compact Sedan",
    lengthMm: 3995, bootLitres: 402,
    reviews: [
      { rating: 4.1, summary: "Boot-rich compact sedan with refined Hyundai cabin.", source: "editorial" },
    ],
    variants: [
      { name: "E", priceInr: 644000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 20.5, seating: 5, safetyRating: 3, engineCc: 1197, powerBhp: 82, features: [F.AC] },
      { name: "SX(O) Turbo DCT", priceInr: 980000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 20.0, seating: 5, safetyRating: 3, engineCc: 998, powerBhp: 99, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE] },
      { name: "S CNG", priceInr: 837000, fuelType: FuelType.CNG, transmission: Transmission.MT, mileageKmpl: 27.1, seating: 5, safetyRating: 3, engineCc: 1197, powerBhp: 68, features: [F.AC, F.TOUCH] },
    ],
  },
  {
    make: "Tata", model: "Tigor", bodyType: BodyType.SEDAN, segment: "Compact Sedan",
    lengthMm: 3993, bootLitres: 419,
    reviews: [
      { rating: 4.2, summary: "4-star NCAP rated compact sedan with strong build.", source: "editorial" },
    ],
    variants: [
      { name: "XE", priceInr: 600000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.6, seating: 5, safetyRating: 4, engineCc: 1199, powerBhp: 84, features: [F.AC] },
      { name: "XZ+ AMT", priceInr: 870000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 19.3, seating: 5, safetyRating: 4, engineCc: 1199, powerBhp: 84, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "XZA+ EV LR", priceInr: 1300000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 26.0, seating: 5, safetyRating: 4, engineCc: 0, powerBhp: 73, features: [F.AC, F.TOUCH, F.CONN] },
    ],
  },
  {
    make: "Volkswagen", model: "Virtus", bodyType: BodyType.SEDAN, segment: "Mid-size Sedan",
    lengthMm: 4561, bootLitres: 521,
    reviews: [
      { rating: 4.5, summary: "Proper enthusiast sedan with German poise and 5-star NCAP.", source: "editorial" },
    ],
    variants: [
      { name: "Comfortline 1.0", priceInr: 1156000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.4, seating: 5, safetyRating: 5, engineCc: 999, powerBhp: 113, features: [F.AC, F.TOUCH] },
      { name: "GT Plus DSG 1.5", priceInr: 1990000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 18.7, seating: 5, safetyRating: 5, engineCc: 1498, powerBhp: 148, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.VENT, F.CRUISE] },
    ],
  },

  // -------- More compact SUVs --------
  {
    make: "Renault", model: "Kiger", bodyType: BodyType.SUV, segment: "Compact SUV",
    lengthMm: 3991, bootLitres: 405,
    reviews: [
      { rating: 4.0, summary: "Funky compact SUV with class-leading boot.", source: "editorial" },
    ],
    variants: [
      { name: "RXE", priceInr: 600000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 20.5, seating: 5, safetyRating: 3, engineCc: 999, powerBhp: 71, features: [F.AC] },
      { name: "RXZ Turbo CVT", priceInr: 1130000, fuelType: FuelType.PETROL, transmission: Transmission.CVT, mileageKmpl: 19.0, seating: 5, safetyRating: 3, engineCc: 999, powerBhp: 99, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE] },
    ],
  },
  {
    make: "Nissan", model: "Magnite", bodyType: BodyType.SUV, segment: "Compact SUV",
    lengthMm: 3994, bootLitres: 336,
    reviews: [
      { rating: 4.0, summary: "Aggressively priced compact SUV with frugal turbo.", source: "editorial" },
    ],
    variants: [
      { name: "XE", priceInr: 612000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 20.0, seating: 5, safetyRating: 4, engineCc: 999, powerBhp: 71, features: [F.AC] },
      { name: "XV Premium Turbo CVT", priceInr: 1130000, fuelType: FuelType.PETROL, transmission: Transmission.CVT, mileageKmpl: 17.7, seating: 5, safetyRating: 4, engineCc: 999, powerBhp: 99, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.CAM360] },
    ],
  },
  {
    make: "Citroen", model: "C3", bodyType: BodyType.SUV, segment: "Compact SUV",
    lengthMm: 3981, bootLitres: 315,
    reviews: [
      { rating: 3.8, summary: "Quirky styling with a comfy ride; light on features.", source: "editorial" },
    ],
    variants: [
      { name: "Live", priceInr: 615000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.4, seating: 5, safetyRating: 0, engineCc: 1199, powerBhp: 81, features: [F.AC] },
      { name: "Shine Turbo", priceInr: 870000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.8, seating: 5, safetyRating: 0, engineCc: 1199, powerBhp: 109, features: [F.AC, F.TOUCH] },
    ],
  },

  // -------- More mid SUVs --------
  {
    make: "Honda", model: "Elevate", bodyType: BodyType.SUV, segment: "Mid SUV",
    lengthMm: 4312, bootLitres: 458,
    reviews: [
      { rating: 4.3, summary: "5-star Global NCAP mid SUV with smooth petrol.", source: "editorial" },
    ],
    variants: [
      { name: "SV", priceInr: 1166000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 15.3, seating: 5, safetyRating: 5, engineCc: 1498, powerBhp: 119, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "ZX CVT", priceInr: 1666000, fuelType: FuelType.PETROL, transmission: Transmission.CVT, mileageKmpl: 16.9, seating: 5, safetyRating: 5, engineCc: 1498, powerBhp: 119, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Maruti", model: "Grand Vitara", bodyType: BodyType.SUV, segment: "Mid SUV",
    lengthMm: 4345, bootLitres: 373,
    reviews: [
      { rating: 4.2, summary: "Hybrid option delivers excellent fuel economy.", source: "editorial" },
    ],
    variants: [
      { name: "Sigma", priceInr: 1099000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 21.1, seating: 5, safetyRating: 4, engineCc: 1462, powerBhp: 102, features: [F.AC] },
      { name: "Alpha+ Hybrid", priceInr: 1990000, fuelType: FuelType.HYBRID, transmission: Transmission.CVT, mileageKmpl: 27.9, seating: 5, safetyRating: 4, engineCc: 1490, powerBhp: 115, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT] },
      { name: "Zeta+ CNG", priceInr: 1499000, fuelType: FuelType.CNG, transmission: Transmission.MT, mileageKmpl: 26.6, seating: 5, safetyRating: 4, engineCc: 1462, powerBhp: 87, features: [F.AC, F.TOUCH, F.CONN] },
    ],
  },
  {
    make: "Toyota", model: "Urban Cruiser Hyryder", bodyType: BodyType.SUV, segment: "Mid SUV",
    lengthMm: 4365, bootLitres: 373,
    reviews: [
      { rating: 4.3, summary: "Hybrid sips fuel; AWD available on the strong hybrid.", source: "editorial" },
    ],
    variants: [
      { name: "E MT", priceInr: 1129000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 21.1, seating: 5, safetyRating: 4, engineCc: 1462, powerBhp: 102, features: [F.AC] },
      { name: "V Hybrid", priceInr: 2008000, fuelType: FuelType.HYBRID, transmission: Transmission.CVT, mileageKmpl: 27.9, seating: 5, safetyRating: 4, engineCc: 1490, powerBhp: 115, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.CRUISE] },
    ],
  },
  {
    make: "MG", model: "Astor", bodyType: BodyType.SUV, segment: "Mid SUV",
    lengthMm: 4323, bootLitres: 488,
    reviews: [
      { rating: 4.2, summary: "ADAS at affordable money in a feature-rich cabin.", source: "editorial" },
    ],
    variants: [
      { name: "Style", priceInr: 1099000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 14.2, seating: 5, safetyRating: 5, engineCc: 1498, powerBhp: 110, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "Savvy Pro CVT", priceInr: 1840000, fuelType: FuelType.PETROL, transmission: Transmission.CVT, mileageKmpl: 14.0, seating: 5, safetyRating: 5, engineCc: 1349, powerBhp: 138, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Jeep", model: "Compass", bodyType: BodyType.SUV, segment: "Premium SUV",
    lengthMm: 4405, bootLitres: 438,
    reviews: [
      { rating: 4.4, summary: "Solid build, capable 4x4, premium cabin feel.", source: "editorial" },
    ],
    variants: [
      { name: "Sport Diesel", priceInr: 2074000, fuelType: FuelType.DIESEL, transmission: Transmission.MT, mileageKmpl: 17.1, seating: 5, safetyRating: 5, engineCc: 1956, powerBhp: 168, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "Model S 4x4 AT", priceInr: 3275000, fuelType: FuelType.DIESEL, transmission: Transmission.AT, mileageKmpl: 14.9, seating: 5, safetyRating: 5, engineCc: 1956, powerBhp: 168, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },

  // -------- More 7-seaters --------
  {
    make: "Mahindra", model: "Scorpio N", bodyType: BodyType.SUV, segment: "7-seat SUV",
    lengthMm: 4662, bootLitres: 257,
    reviews: [
      { rating: 4.5, summary: "Old-school body-on-frame SUV with modern manners.", source: "editorial" },
    ],
    variants: [
      { name: "Z2 Petrol 7-str", priceInr: 1399000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 12.5, seating: 7, safetyRating: 5, engineCc: 1997, powerBhp: 198, features: [F.AC, F.TOUCH] },
      { name: "Z8L Diesel AT 4WD", priceInr: 2549000, fuelType: FuelType.DIESEL, transmission: Transmission.AT, mileageKmpl: 14.0, seating: 7, safetyRating: 5, engineCc: 2184, powerBhp: 173, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.CRUISE] },
    ],
  },
  {
    make: "Toyota", model: "Innova Crysta", bodyType: BodyType.MUV, segment: "Premium MUV",
    lengthMm: 4735, bootLitres: 300,
    reviews: [
      { rating: 4.5, summary: "Bulletproof reliability and adult-friendly third row.", source: "editorial" },
    ],
    variants: [
      { name: "GX 7-str Diesel MT", priceInr: 1990000, fuelType: FuelType.DIESEL, transmission: Transmission.MT, mileageKmpl: 14.0, seating: 7, safetyRating: 5, engineCc: 2393, powerBhp: 148, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "ZX 7-str Diesel AT", priceInr: 2640000, fuelType: FuelType.DIESEL, transmission: Transmission.AT, mileageKmpl: 11.5, seating: 7, safetyRating: 5, engineCc: 2393, powerBhp: 148, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.CRUISE] },
    ],
  },
  {
    make: "Kia", model: "Carens", bodyType: BodyType.MUV, segment: "MUV",
    lengthMm: 4540, bootLitres: 216,
    reviews: [
      { rating: 4.3, summary: "Crossover-style 6/7 seater with rich cabin tech.", source: "editorial" },
    ],
    variants: [
      { name: "Premium 7-str", priceInr: 1100000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 16.5, seating: 7, safetyRating: 3, engineCc: 1497, powerBhp: 113, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "Luxury Plus 6-str DCT", priceInr: 1955000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 16.5, seating: 6, safetyRating: 3, engineCc: 1482, powerBhp: 158, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Mahindra", model: "Bolero Neo", bodyType: BodyType.SUV, segment: "Rugged SUV",
    lengthMm: 3995, bootLitres: 384,
    reviews: [
      { rating: 4.0, summary: "Workhorse rural SUV with proven mechanicals.", source: "editorial" },
    ],
    variants: [
      { name: "N4", priceInr: 989000, fuelType: FuelType.DIESEL, transmission: Transmission.MT, mileageKmpl: 16.0, seating: 7, safetyRating: 3, engineCc: 1493, powerBhp: 99, features: [F.AC] },
      { name: "N10(O)", priceInr: 1255000, fuelType: FuelType.DIESEL, transmission: Transmission.MT, mileageKmpl: 16.0, seating: 7, safetyRating: 3, engineCc: 1493, powerBhp: 99, features: [F.AC, F.TOUCH] },
    ],
  },

  // -------- More EVs --------
  {
    make: "Tata", model: "Tiago EV", bodyType: BodyType.EV, segment: "Entry EV",
    lengthMm: 3769, bootLitres: 240,
    reviews: [
      { rating: 4.0, summary: "Most affordable EV; perfect city runabout.", source: "editorial" },
    ],
    variants: [
      { name: "XE MR", priceInr: 800000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 28.0, seating: 5, safetyRating: 4, engineCc: 0, powerBhp: 60, features: [F.AC, F.TOUCH] },
      { name: "XZ+ Tech LR", priceInr: 1180000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 27.0, seating: 5, safetyRating: 4, engineCc: 0, powerBhp: 73, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE] },
    ],
  },
  {
    make: "Tata", model: "Punch EV", bodyType: BodyType.EV, segment: "Compact EV",
    lengthMm: 3857, bootLitres: 366,
    reviews: [
      { rating: 4.3, summary: "5-star NCAP small EV with confident ride.", source: "editorial" },
    ],
    variants: [
      { name: "Smart MR", priceInr: 999000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 26.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 80, features: [F.AC, F.TOUCH] },
      { name: "Empowered+ LR", priceInr: 1499000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 25.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 120, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT] },
    ],
  },
  {
    make: "Citroen", model: "eC3", bodyType: BodyType.EV, segment: "Compact EV",
    lengthMm: 3981, bootLitres: 315,
    reviews: [
      { rating: 3.9, summary: "Affordable EV with comfort-tuned ride.", source: "editorial" },
    ],
    variants: [
      { name: "Live", priceInr: 1273000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 25.0, seating: 5, safetyRating: 0, engineCc: 0, powerBhp: 56, features: [F.AC, F.TOUCH] },
      { name: "Shine", priceInr: 1376000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 25.0, seating: 5, safetyRating: 0, engineCc: 0, powerBhp: 56, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE] },
    ],
  },
  {
    make: "BYD", model: "Atto 3", bodyType: BodyType.EV, segment: "Premium EV SUV",
    lengthMm: 4455, bootLitres: 440,
    reviews: [
      { rating: 4.4, summary: "Long-range EV with serious feature load and 5-star safety.", source: "editorial" },
    ],
    variants: [
      { name: "Premium", priceInr: 2499000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 25.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 201, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
      { name: "Superior", priceInr: 3399000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 24.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 201, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },

  // -------- Premium / luxury entry --------
  {
    make: "Volvo", model: "XC40", bodyType: BodyType.SUV, segment: "Luxury SUV",
    lengthMm: 4425, bootLitres: 460,
    reviews: [
      { rating: 4.6, summary: "Safety-first luxury SUV with quiet, classy cabin.", source: "editorial" },
    ],
    variants: [
      { name: "Ultimate B4", priceInr: 4900000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 12.5, seating: 5, safetyRating: 5, engineCc: 1969, powerBhp: 194, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Mercedes-Benz", model: "GLA", bodyType: BodyType.SUV, segment: "Luxury SUV",
    lengthMm: 4410, bootLitres: 435,
    reviews: [
      { rating: 4.4, summary: "Entry to the three-pointed star with rich tech.", source: "editorial" },
    ],
    variants: [
      { name: "200 Progressive", priceInr: 5000000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 14.8, seating: 5, safetyRating: 5, engineCc: 1332, powerBhp: 161, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "BMW", model: "3 Series", bodyType: BodyType.SEDAN, segment: "Luxury Sedan",
    lengthMm: 4719, bootLitres: 480,
    reviews: [
      { rating: 4.7, summary: "Driver's sports sedan with premium tech.", source: "editorial" },
    ],
    variants: [
      { name: "330Li M Sport", priceInr: 6250000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 15.6, seating: 5, safetyRating: 5, engineCc: 1998, powerBhp: 254, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },

  // -------- More micro / city hatches --------
  {
    make: "Maruti", model: "Celerio", bodyType: BodyType.HATCH, segment: "Entry Hatchback",
    lengthMm: 3695, bootLitres: 313,
    reviews: [
      { rating: 4.0, summary: "Mileage king of small petrol hatches.", source: "editorial" },
    ],
    variants: [
      { name: "LXi", priceInr: 540000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 25.2, seating: 5, safetyRating: 2, engineCc: 998, powerBhp: 65, features: [F.AC] },
      { name: "ZXi+ AGS", priceInr: 720000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 26.7, seating: 5, safetyRating: 2, engineCc: 998, powerBhp: 65, features: [F.AC, F.TOUCH] },
      { name: "VXi CNG", priceInr: 700000, fuelType: FuelType.CNG, transmission: Transmission.MT, mileageKmpl: 34.4, seating: 5, safetyRating: 2, engineCc: 998, powerBhp: 56, features: [F.AC] },
    ],
  },
  {
    make: "Maruti", model: "Ignis", bodyType: BodyType.HATCH, segment: "Crossover Hatch",
    lengthMm: 3700, bootLitres: 260,
    reviews: [
      { rating: 3.9, summary: "Funky urban hatch with a distinctive face.", source: "editorial" },
    ],
    variants: [
      { name: "Sigma", priceInr: 580000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 20.9, seating: 5, safetyRating: 3, engineCc: 1197, powerBhp: 81, features: [F.AC] },
      { name: "Alpha AMT", priceInr: 800000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 20.9, seating: 5, safetyRating: 3, engineCc: 1197, powerBhp: 81, features: [F.AC, F.TOUCH, F.CONN] },
    ],
  },

  // -------- Micro SUVs --------
  {
    make: "Tata", model: "Punch", bodyType: BodyType.SUV, segment: "Micro SUV",
    lengthMm: 3827, bootLitres: 366,
    reviews: [
      { rating: 4.4, summary: "5-star NCAP micro SUV with surprisingly grown-up ride.", source: "editorial" },
    ],
    variants: [
      { name: "Pure", priceInr: 615000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 20.1, seating: 5, safetyRating: 5, engineCc: 1199, powerBhp: 87, features: [F.AC] },
      { name: "Creative+ AMT", priceInr: 970000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 18.8, seating: 5, safetyRating: 5, engineCc: 1199, powerBhp: 87, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF] },
      { name: "Accomplished CNG", priceInr: 950000, fuelType: FuelType.CNG, transmission: Transmission.MT, mileageKmpl: 26.9, seating: 5, safetyRating: 5, engineCc: 1199, powerBhp: 72, features: [F.AC, F.TOUCH, F.CONN] },
    ],
  },
  {
    make: "Hyundai", model: "Exter", bodyType: BodyType.SUV, segment: "Micro SUV",
    lengthMm: 3815, bootLitres: 391,
    reviews: [
      { rating: 4.2, summary: "Feature-loaded micro SUV with dashcam from factory.", source: "editorial" },
    ],
    variants: [
      { name: "EX", priceInr: 615000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.4, seating: 5, safetyRating: 4, engineCc: 1197, powerBhp: 82, features: [F.AC] },
      { name: "SX(O) AMT", priceInr: 1050000, fuelType: FuelType.PETROL, transmission: Transmission.AMT, mileageKmpl: 19.4, seating: 5, safetyRating: 4, engineCc: 1197, powerBhp: 82, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF] },
      { name: "S CNG", priceInr: 850000, fuelType: FuelType.CNG, transmission: Transmission.MT, mileageKmpl: 27.1, seating: 5, safetyRating: 4, engineCc: 1197, powerBhp: 68, features: [F.AC, F.TOUCH] },
    ],
  },
  {
    make: "Maruti", model: "Fronx", bodyType: BodyType.SUV, segment: "Crossover SUV",
    lengthMm: 3995, bootLitres: 308,
    reviews: [
      { rating: 4.2, summary: "Coupe-styled compact SUV with peppy turbo option.", source: "editorial" },
    ],
    variants: [
      { name: "Sigma", priceInr: 750000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 22.9, seating: 5, safetyRating: 4, engineCc: 1197, powerBhp: 89, features: [F.AC] },
      { name: "Alpha Turbo AT", priceInr: 1320000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 21.5, seating: 5, safetyRating: 4, engineCc: 998, powerBhp: 99, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.CAM360] },
    ],
  },

  // -------- More compact/premium sedans --------
  {
    make: "Honda", model: "Amaze", bodyType: BodyType.SEDAN, segment: "Compact Sedan",
    lengthMm: 3995, bootLitres: 416,
    reviews: [
      { rating: 4.2, summary: "Spacious cabin and comfortable rear seat for the segment.", source: "editorial" },
    ],
    variants: [
      { name: "E MT", priceInr: 800000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 18.6, seating: 5, safetyRating: 4, engineCc: 1199, powerBhp: 89, features: [F.AC] },
      { name: "VX CVT", priceInr: 1100000, fuelType: FuelType.PETROL, transmission: Transmission.CVT, mileageKmpl: 19.5, seating: 5, safetyRating: 4, engineCc: 1199, powerBhp: 89, features: [F.AC, F.TOUCH, F.CONN] },
    ],
  },
  {
    make: "Skoda", model: "Octavia", bodyType: BodyType.SEDAN, segment: "Premium Sedan",
    lengthMm: 4689, bootLitres: 600,
    reviews: [
      { rating: 4.5, summary: "Premium sedan with limo-like rear and 600L boot.", source: "editorial" },
    ],
    variants: [
      { name: "L&K 2.0 TSI", priceInr: 3079000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 15.8, seating: 5, safetyRating: 5, engineCc: 1984, powerBhp: 187, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Toyota", model: "Camry", bodyType: BodyType.SEDAN, segment: "Premium Hybrid Sedan",
    lengthMm: 4885, bootLitres: 587,
    reviews: [
      { rating: 4.5, summary: "Smooth hybrid sedan with chauffeur-grade rear comfort.", source: "editorial" },
    ],
    variants: [
      { name: "Hybrid", priceInr: 4824000, fuelType: FuelType.HYBRID, transmission: Transmission.CVT, mileageKmpl: 25.5, seating: 5, safetyRating: 5, engineCc: 2487, powerBhp: 215, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Mercedes-Benz", model: "C-Class", bodyType: BodyType.SEDAN, segment: "Luxury Sedan",
    lengthMm: 4751, bootLitres: 455,
    reviews: [
      { rating: 4.6, summary: "S-Class style in a smaller package; tech-laden.", source: "editorial" },
    ],
    variants: [
      { name: "C200", priceInr: 6225000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 16.5, seating: 5, safetyRating: 5, engineCc: 1496, powerBhp: 201, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },

  // -------- New compact/mid SUVs --------
  {
    make: "Skoda", model: "Kylaq", bodyType: BodyType.SUV, segment: "Compact SUV",
    lengthMm: 3995, bootLitres: 446,
    reviews: [
      { rating: 4.4, summary: "Skoda's first sub-4m SUV with grown-up European feel.", source: "editorial" },
    ],
    variants: [
      { name: "Classic", priceInr: 799000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 19.0, seating: 5, safetyRating: 5, engineCc: 999, powerBhp: 113, features: [F.AC, F.TOUCH] },
      { name: "Prestige AT", priceInr: 1379000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 18.0, seating: 5, safetyRating: 5, engineCc: 999, powerBhp: 113, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.CRUISE] },
    ],
  },
  {
    make: "Tata", model: "Curvv", bodyType: BodyType.SUV, segment: "SUV Coupe",
    lengthMm: 4308, bootLitres: 500,
    reviews: [
      { rating: 4.3, summary: "Coupe-styled SUV with bold design and rich tech.", source: "editorial" },
    ],
    variants: [
      { name: "Smart Petrol", priceInr: 1000000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 18.0, seating: 5, safetyRating: 5, engineCc: 1199, powerBhp: 118, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "Accomplished+ S DCA", priceInr: 1900000, fuelType: FuelType.PETROL, transmission: Transmission.DCT, mileageKmpl: 17.0, seating: 5, safetyRating: 5, engineCc: 1199, powerBhp: 118, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
      { name: "Accomplished+ Diesel AT", priceInr: 1999000, fuelType: FuelType.DIESEL, transmission: Transmission.AT, mileageKmpl: 20.0, seating: 5, safetyRating: 5, engineCc: 1497, powerBhp: 113, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Mahindra", model: "XUV 3XO", bodyType: BodyType.SUV, segment: "Compact SUV",
    lengthMm: 3990, bootLitres: 364,
    reviews: [
      { rating: 4.3, summary: "Heavily updated XUV300 with twin screens and ADAS.", source: "editorial" },
    ],
    variants: [
      { name: "MX1", priceInr: 799000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 18.9, seating: 5, safetyRating: 5, engineCc: 1197, powerBhp: 109, features: [F.AC] },
      { name: "AX7L Turbo AT", priceInr: 1599000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 17.9, seating: 5, safetyRating: 5, engineCc: 1197, powerBhp: 129, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Citroen", model: "Basalt", bodyType: BodyType.SUV, segment: "SUV Coupe",
    lengthMm: 4352, bootLitres: 470,
    reviews: [
      { rating: 4.0, summary: "Affordable coupe SUV with French quirkiness.", source: "editorial" },
    ],
    variants: [
      { name: "You", priceInr: 800000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 18.5, seating: 5, safetyRating: 0, engineCc: 1199, powerBhp: 81, features: [F.AC, F.TOUCH] },
      { name: "Max Turbo AT", priceInr: 1400000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 17.0, seating: 5, safetyRating: 0, engineCc: 1199, powerBhp: 109, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.CAM360] },
    ],
  },

  // -------- Body-on-frame & rugged 7-seaters --------
  {
    make: "Toyota", model: "Fortuner", bodyType: BodyType.SUV, segment: "Premium 7-seat SUV",
    lengthMm: 4795, bootLitres: 296,
    reviews: [
      { rating: 4.6, summary: "Indestructible reputation and serious off-road pedigree.", source: "editorial" },
    ],
    variants: [
      { name: "4x2 MT Diesel", priceInr: 3343000, fuelType: FuelType.DIESEL, transmission: Transmission.MT, mileageKmpl: 14.4, seating: 7, safetyRating: 5, engineCc: 2755, powerBhp: 201, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "Legender 4x4 AT", priceInr: 4924000, fuelType: FuelType.DIESEL, transmission: Transmission.AT, mileageKmpl: 14.0, seating: 7, safetyRating: 5, engineCc: 2755, powerBhp: 201, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.CRUISE] },
    ],
  },
  {
    make: "Mahindra", model: "Thar Roxx", bodyType: BodyType.SUV, segment: "Lifestyle 5-door SUV",
    lengthMm: 4428, bootLitres: 448,
    reviews: [
      { rating: 4.5, summary: "5-door Thar with daily-usable manners and 5-star NCAP.", source: "editorial" },
    ],
    variants: [
      { name: "MX1 Petrol", priceInr: 1299000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 14.0, seating: 5, safetyRating: 5, engineCc: 1997, powerBhp: 160, features: [F.AC, F.TOUCH] },
      { name: "AX7L Diesel 4WD AT", priceInr: 2349000, fuelType: FuelType.DIESEL, transmission: Transmission.AT, mileageKmpl: 15.2, seating: 5, safetyRating: 5, engineCc: 2184, powerBhp: 173, features: [F.AC, F.TOUCH, F.CONN, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Maruti", model: "XL6", bodyType: BodyType.MUV, segment: "Premium MUV",
    lengthMm: 4445, bootLitres: 209,
    reviews: [
      { rating: 4.1, summary: "Captain seat MUV with premium touches.", source: "editorial" },
    ],
    variants: [
      { name: "Zeta MT", priceInr: 1230000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 20.3, seating: 6, safetyRating: 4, engineCc: 1462, powerBhp: 102, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "Alpha+ AT", priceInr: 1500000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 20.0, seating: 6, safetyRating: 4, engineCc: 1462, powerBhp: 102, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.CRUISE] },
      { name: "Zeta CNG", priceInr: 1370000, fuelType: FuelType.CNG, transmission: Transmission.MT, mileageKmpl: 26.3, seating: 6, safetyRating: 4, engineCc: 1462, powerBhp: 87, features: [F.AC, F.TOUCH, F.CONN] },
    ],
  },
  {
    make: "MG", model: "Hector Plus", bodyType: BodyType.SUV, segment: "6/7-seat SUV",
    lengthMm: 4720, bootLitres: 155,
    reviews: [
      { rating: 4.2, summary: "Big-screen tech-fest 6/7 seater.", source: "editorial" },
    ],
    variants: [
      { name: "Style 6-str", priceInr: 1820000, fuelType: FuelType.PETROL, transmission: Transmission.MT, mileageKmpl: 13.1, seating: 6, safetyRating: 4, engineCc: 1451, powerBhp: 141, features: [F.AC, F.TOUCH, F.CONN] },
      { name: "Savvy Pro 7-str CVT", priceInr: 2330000, fuelType: FuelType.PETROL, transmission: Transmission.CVT, mileageKmpl: 13.1, seating: 7, safetyRating: 4, engineCc: 1451, powerBhp: 141, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Volkswagen", model: "Tiguan", bodyType: BodyType.SUV, segment: "Premium SUV",
    lengthMm: 4509, bootLitres: 615,
    reviews: [
      { rating: 4.5, summary: "Solid German SUV with composed dynamics.", source: "editorial" },
    ],
    variants: [
      { name: "Elegance", priceInr: 3499000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 12.7, seating: 5, safetyRating: 5, engineCc: 1984, powerBhp: 187, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Skoda", model: "Kodiaq", bodyType: BodyType.SUV, segment: "Premium 7-seat SUV",
    lengthMm: 4758, bootLitres: 270,
    reviews: [
      { rating: 4.5, summary: "Refined 7-seater with cavernous third row access.", source: "editorial" },
    ],
    variants: [
      { name: "L&K", priceInr: 4699000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 12.4, seating: 7, safetyRating: 5, engineCc: 1984, powerBhp: 201, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },

  // -------- Luxury compact SUVs --------
  {
    make: "BMW", model: "X1", bodyType: BodyType.SUV, segment: "Luxury SUV",
    lengthMm: 4500, bootLitres: 540,
    reviews: [
      { rating: 4.5, summary: "Spacious luxury compact SUV with engaging drive.", source: "editorial" },
    ],
    variants: [
      { name: "sDrive18i M Sport", priceInr: 4900000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 14.0, seating: 5, safetyRating: 5, engineCc: 1499, powerBhp: 134, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Audi", model: "Q3", bodyType: BodyType.SUV, segment: "Luxury SUV",
    lengthMm: 4485, bootLitres: 530,
    reviews: [
      { rating: 4.4, summary: "Premium build and minimalist German cabin.", source: "editorial" },
    ],
    variants: [
      { name: "Premium Plus", priceInr: 4500000, fuelType: FuelType.PETROL, transmission: Transmission.AT, mileageKmpl: 13.6, seating: 5, safetyRating: 5, engineCc: 1984, powerBhp: 188, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },

  // -------- More EVs --------
  {
    make: "Hyundai", model: "Ioniq 5", bodyType: BodyType.EV, segment: "Premium EV",
    lengthMm: 4635, bootLitres: 527,
    reviews: [
      { rating: 4.6, summary: "Future-forward EV with ultra-fast 800V charging.", source: "editorial" },
    ],
    variants: [
      { name: "Standard", priceInr: 4565000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 26.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 215, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "Kia", model: "EV6", bodyType: BodyType.EV, segment: "Premium EV",
    lengthMm: 4695, bootLitres: 480,
    reviews: [
      { rating: 4.5, summary: "Performance-leaning EV with bold design.", source: "editorial" },
    ],
    variants: [
      { name: "GT Line AWD", priceInr: 6595000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 23.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 320, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "MG", model: "Comet EV", bodyType: BodyType.EV, segment: "Micro EV",
    lengthMm: 2974, bootLitres: 215,
    reviews: [
      { rating: 3.8, summary: "Tiny city EV; perfect second car for crowded streets.", source: "editorial" },
    ],
    variants: [
      { name: "Excite", priceInr: 700000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 22.0, seating: 4, safetyRating: 0, engineCc: 0, powerBhp: 41, features: [F.AC, F.TOUCH] },
      { name: "Exclusive Plus", priceInr: 950000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 22.0, seating: 4, safetyRating: 0, engineCc: 0, powerBhp: 41, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE] },
    ],
  },
  {
    make: "Mahindra", model: "BE 6", bodyType: BodyType.EV, segment: "Coupe EV SUV",
    lengthMm: 4371, bootLitres: 455,
    reviews: [
      { rating: 4.5, summary: "Sci-fi styled electric coupe SUV with serious tech.", source: "editorial" },
    ],
    variants: [
      { name: "Pack One", priceInr: 1880000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 24.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 228, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE] },
      { name: "Pack Three", priceInr: 2700000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 23.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 282, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
  {
    make: "BYD", model: "Seal", bodyType: BodyType.EV, segment: "Performance EV Sedan",
    lengthMm: 4800, bootLitres: 400,
    reviews: [
      { rating: 4.5, summary: "EV sports sedan with sub-4s 0-100 in top trim.", source: "editorial" },
    ],
    variants: [
      { name: "Premium RWD", priceInr: 4150000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 25.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 308, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
      { name: "Performance AWD", priceInr: 5325000, fuelType: FuelType.EV, transmission: Transmission.EV, mileageKmpl: 22.0, seating: 5, safetyRating: 5, engineCc: 0, powerBhp: 522, features: [F.AC, F.TOUCH, F.CONN, F.WCHARGE, F.SUNROOF, F.CAM360, F.VENT, F.ADAS, F.CRUISE] },
    ],
  },
];

async function main() {
  console.log("[seed] Clearing existing data...");
  await prisma.shortlistItem.deleteMany();
  await prisma.shortlist.deleteMany();
  await prisma.userSession.deleteMany();
  await prisma.review.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.car.deleteMany();

  console.log(`[seed] Loading ${cars.length} cars...`);
  for (const c of cars) {
    await prisma.car.create({
      data: {
        make: c.make,
        model: c.model,
        bodyType: c.bodyType,
        segment: c.segment,
        lengthMm: c.lengthMm,
        bootLitres: c.bootLitres,
        imageUrl: c.imageUrl ?? null,
        reviews: { create: c.reviews },
        variants: { create: c.variants },
      },
    });
  }
  const carCount = await prisma.car.count();
  const variantCount = await prisma.variant.count();
  console.log(`[seed] Done. ${carCount} cars, ${variantCount} variants.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
