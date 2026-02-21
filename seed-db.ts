import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { categories, brands, products, productImages, productVideos, productSpecs } from "./drizzle/schema";

const DATABASE_URL = process.env.DATABASE_URL;

async function seed() {
  if (!DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection);

  try {
    console.log("Starting seed...");

    // Clear existing data
    await connection.execute("DELETE FROM productSpecs");
    await connection.execute("DELETE FROM productVideos");
    await connection.execute("DELETE FROM productImages");
    await connection.execute("DELETE FROM reviews");
    await connection.execute("DELETE FROM cartItems");
    await connection.execute("DELETE FROM products");
    await connection.execute("DELETE FROM brands");
    await connection.execute("DELETE FROM categories");

    // Insert categories
    const solarCategories = [
      { name: "Monocrystalline", slug: "monocrystalline", description: "High efficiency monocrystalline solar panels", type: "solar_panel" as const },
      { name: "Polycrystalline", slug: "polycrystalline", description: "Cost-effective polycrystalline solar panels", type: "solar_panel" as const },
      { name: "Thin Film", slug: "thin-film", description: "Flexible thin film solar panels", type: "solar_panel" as const },
    ];

    const batteryCategories = [
      { name: "Lithium Ion", slug: "lithium-ion", description: "High performance lithium ion batteries", type: "battery" as const },
      { name: "Lead Acid", slug: "lead-acid", description: "Traditional lead acid batteries", type: "battery" as const },
      { name: "LiFePO4", slug: "lifepo4", description: "Long-lasting LiFePO4 batteries", type: "battery" as const },
    ];

    const allCategories = [...solarCategories, ...batteryCategories];
    await db.insert(categories).values(allCategories);
    console.log("Categories inserted");

    // Insert brands
    const brandValues = [
      { name: "SunPower", logo: "https://via.placeholder.com/100?text=SunPower" },
      { name: "Canadian Solar", logo: "https://via.placeholder.com/100?text=Canadian" },
      { name: "JinkoSolar", logo: "https://via.placeholder.com/100?text=JinkoSolar" },
      { name: "Tesla", logo: "https://via.placeholder.com/100?text=Tesla" },
      { name: "LG Chem", logo: "https://via.placeholder.com/100?text=LGChem" },
      { name: "Victron", logo: "https://via.placeholder.com/100?text=Victron" },
    ];

    await db.insert(brands).values(brandValues);
    console.log("Brands inserted");

    // Insert solar panel products
    const solarProducts = [
      {
        name: "SunPower 400W Monocrystalline Panel",
        slug: "sunpower-400w-mono",
        description: "Premium monocrystalline solar panel with 22% efficiency",
        categoryId: 1,
        brandId: 1,
        price: 50000,
        originalPrice: 60000,
        type: "solar_panel" as const,
        power: 400,
        efficiency: 22,
        voltage: 48,
        current: 8,
        weight: 22000,
        dimensions: "2000x1000x40",
        warranty: "25 years",
        pdfUrl: "https://example.com/sunpower-400w.pdf",
        stock: 50,
        rating: "4.8",
        reviewCount: 120,
      },
      {
        name: "Canadian Solar 350W Panel",
        slug: "canadian-solar-350w",
        description: "Reliable polycrystalline solar panel",
        categoryId: 2,
        brandId: 2,
        price: 35000,
        originalPrice: 42000,
        type: "solar_panel" as const,
        power: 350,
        efficiency: 18,
        voltage: 48,
        current: 7,
        weight: 20000,
        dimensions: "1956x992x40",
        warranty: "25 years",
        pdfUrl: "https://example.com/canadian-350w.pdf",
        stock: 75,
        rating: "4.5",
        reviewCount: 95,
      },
      {
        name: "JinkoSolar 450W Monocrystalline",
        slug: "jinkosolar-450w",
        description: "High performance monocrystalline panel",
        categoryId: 1,
        brandId: 3,
        price: 55000,
        originalPrice: 65000,
        type: "solar_panel" as const,
        power: 450,
        efficiency: 21,
        voltage: 48,
        current: 9,
        weight: 24000,
        dimensions: "2094x1038x40",
        warranty: "25 years",
        pdfUrl: "https://example.com/jinkosolar-450w.pdf",
        stock: 40,
        rating: "4.7",
        reviewCount: 110,
      },
      {
        name: "Thin Film 300W Panel",
        slug: "thin-film-300w",
        description: "Flexible thin film solar panel",
        categoryId: 3,
        brandId: 1,
        price: 28000,
        originalPrice: 35000,
        type: "solar_panel" as const,
        power: 300,
        efficiency: 15,
        voltage: 48,
        current: 6,
        weight: 15000,
        dimensions: "1500x750x5",
        warranty: "10 years",
        pdfUrl: "https://example.com/thinfilm-300w.pdf",
        stock: 30,
        rating: "4.2",
        reviewCount: 45,
      },
    ];

    await db.insert(products).values(solarProducts);
    console.log("Solar products inserted");

    // Insert battery products
    const batteryProducts = [
      {
        name: "Tesla Powerwall 13.5kWh",
        slug: "tesla-powerwall-13",
        description: "Home battery system with 13.5 kWh capacity",
        categoryId: 4,
        brandId: 4,
        price: 500000,
        originalPrice: 600000,
        type: "battery" as const,
        capacity: 13500,
        batteryVoltage: 400,
        chargeTime: 120,
        dischargeTime: 240,
        weight: 120000,
        dimensions: "1150x755x155",
        warranty: "10 years",
        pdfUrl: "https://example.com/tesla-powerwall.pdf",
        stock: 20,
        rating: "4.9",
        reviewCount: 200,
      },
      {
        name: "LG Chem RESU 10H",
        slug: "lg-chem-resu-10h",
        description: "Compact 10kWh lithium ion battery",
        categoryId: 4,
        brandId: 5,
        price: 350000,
        originalPrice: 420000,
        type: "battery" as const,
        capacity: 10000,
        batteryVoltage: 400,
        chargeTime: 100,
        dischargeTime: 180,
        weight: 85000,
        dimensions: "1000x700x200",
        warranty: "10 years",
        pdfUrl: "https://example.com/lg-chem-resu.pdf",
        stock: 25,
        rating: "4.6",
        reviewCount: 150,
      },
      {
        name: "Victron LiFePO4 5kWh",
        slug: "victron-lifepo4-5k",
        description: "LiFePO4 battery with 5kWh capacity",
        categoryId: 6,
        brandId: 6,
        price: 200000,
        originalPrice: 250000,
        type: "battery" as const,
        capacity: 5000,
        batteryVoltage: 48,
        chargeTime: 60,
        dischargeTime: 120,
        weight: 60000,
        dimensions: "600x400x300",
        warranty: "10 years",
        pdfUrl: "https://example.com/victron-lifepo4.pdf",
        stock: 35,
        rating: "4.8",
        reviewCount: 180,
      },
      {
        name: "Lead Acid 200Ah Battery",
        slug: "lead-acid-200ah",
        description: "Traditional lead acid battery 200Ah",
        categoryId: 5,
        brandId: 2,
        price: 50000,
        originalPrice: 60000,
        type: "battery" as const,
        capacity: 2400,
        batteryVoltage: 12,
        chargeTime: 240,
        dischargeTime: 480,
        weight: 60000,
        dimensions: "500x300x250",
        warranty: "3 years",
        pdfUrl: "https://example.com/lead-acid-200ah.pdf",
        stock: 50,
        rating: "4.0",
        reviewCount: 70,
      },
    ];

    await db.insert(products).values(batteryProducts);
    console.log("Battery products inserted");

    // Insert product images
    const productImageValues = [
      { productId: 1, imageUrl: "https://via.placeholder.com/400x300?text=SunPower+400W+1", alt: "Front view", order: 0 },
      { productId: 1, imageUrl: "https://via.placeholder.com/400x300?text=SunPower+400W+2", alt: "Side view", order: 1 },
      { productId: 2, imageUrl: "https://via.placeholder.com/400x300?text=Canadian+350W+1", alt: "Front view", order: 0 },
      { productId: 2, imageUrl: "https://via.placeholder.com/400x300?text=Canadian+350W+2", alt: "Installation", order: 1 },
      { productId: 3, imageUrl: "https://via.placeholder.com/400x300?text=JinkoSolar+450W+1", alt: "Front view", order: 0 },
      { productId: 4, imageUrl: "https://via.placeholder.com/400x300?text=ThinFilm+300W+1", alt: "Flexible panel", order: 0 },
      { productId: 5, imageUrl: "https://via.placeholder.com/400x300?text=Tesla+Powerwall+1", alt: "Front view", order: 0 },
      { productId: 5, imageUrl: "https://via.placeholder.com/400x300?text=Tesla+Powerwall+2", alt: "Installation", order: 1 },
      { productId: 6, imageUrl: "https://via.placeholder.com/400x300?text=LG+Chem+1", alt: "Front view", order: 0 },
      { productId: 7, imageUrl: "https://via.placeholder.com/400x300?text=Victron+1", alt: "Front view", order: 0 },
      { productId: 8, imageUrl: "https://via.placeholder.com/400x300?text=LeadAcid+1", alt: "Battery", order: 0 },
    ];

    await db.insert(productImages).values(productImageValues);
    console.log("Product images inserted");

    // Insert product videos
    const productVideoValues = [
      { productId: 1, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "SunPower 400W Installation Guide", order: 0 },
      { productId: 2, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Canadian Solar Setup", order: 0 },
      { productId: 5, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Tesla Powerwall Review", order: 0 },
      { productId: 6, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "LG Chem Installation", order: 0 },
    ];

    await db.insert(productVideos).values(productVideoValues);
    console.log("Product videos inserted");

    // Insert product specs
    const productSpecValues = [
      { productId: 1, specName: "Efficiency", specValue: "22%", order: 0 },
      { productId: 1, specName: "Temperature Coefficient", specValue: "-0.3%/°C", order: 1 },
      { productId: 1, specName: "Operating Temperature", specValue: "-40°C to 85°C", order: 2 },
      { productId: 2, specName: "Efficiency", specValue: "18%", order: 0 },
      { productId: 2, specName: "Temperature Coefficient", specValue: "-0.4%/°C", order: 1 },
      { productId: 5, specName: "Chemistry", specValue: "Lithium Ion", order: 0 },
      { productId: 5, specName: "Roundtrip Efficiency", specValue: "90%", order: 1 },
      { productId: 5, specName: "Warranty", specValue: "10 years", order: 2 },
    ];

    await db.insert(productSpecs).values(productSpecValues);
    console.log("Product specs inserted");

    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seed();
