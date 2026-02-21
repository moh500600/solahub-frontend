import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Product Categories
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  type: mysqlEnum("type", ["solar_panel", "battery"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

// Brands
export const brands = mysqlTable("brands", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  logo: varchar("logo", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Brand = typeof brands.$inferSelect;
export type InsertBrand = typeof brands.$inferInsert;

// Products (Solar Panels & Batteries)
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  categoryId: int("categoryId").notNull(),
  brandId: int("brandId").notNull(),
  price: int("price").notNull(), // Store as cents to avoid decimal issues
  originalPrice: int("originalPrice"), // Original price before discount
  type: mysqlEnum("type", ["solar_panel", "battery"]).notNull(),
  
  // Solar Panel specific fields
  power: int("power"), // Watts (W)
  efficiency: int("efficiency"), // Percentage (0-100)
  voltage: int("voltage"), // Volts (V)
  current: int("current"), // Amps (A)
  
  // Battery specific fields
  capacity: int("capacity"), // Watt-hours (Wh)
  batteryVoltage: int("batteryVoltage"), // Volts (V)
  chargeTime: int("chargeTime"), // Minutes
  dischargeTime: int("dischargeTime"), // Minutes
  
  // Common fields
  weight: int("weight"), // Grams (g)
  dimensions: varchar("dimensions", { length: 100 }), // e.g., "100x100x10 cm"
  warranty: varchar("warranty", { length: 50 }), // e.g., "25 years"
  pdfUrl: varchar("pdfUrl", { length: 255 }), // URL to PDF specifications
  
  // Stock and ratings
  stock: int("stock").default(0).notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"), // 0-5 stars
  reviewCount: int("reviewCount").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// Product Images
export const productImages = mysqlTable("productImages", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId").notNull(),
  imageUrl: varchar("imageUrl", { length: 255 }).notNull(),
  alt: varchar("alt", { length: 255 }),
  order: int("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProductImage = typeof productImages.$inferSelect;
export type InsertProductImage = typeof productImages.$inferInsert;

// Product Videos (YouTube links)
export const productVideos = mysqlTable("productVideos", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId").notNull(),
  videoUrl: varchar("videoUrl", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }),
  order: int("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProductVideo = typeof productVideos.$inferSelect;
export type InsertProductVideo = typeof productVideos.$inferInsert;

// Product Reviews/Ratings
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId").notNull(),
  userId: int("userId").notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  title: varchar("title", { length: 255 }),
  content: text("content"),
  helpful: int("helpful").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

// Shopping Cart
export const cartItems = mysqlTable("cartItems", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  quantity: int("quantity").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;

// Product Specifications (for flexible specification storage)
export const productSpecs = mysqlTable("productSpecs", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId").notNull(),
  specName: varchar("specName", { length: 100 }).notNull(),
  specValue: varchar("specValue", { length: 255 }).notNull(),
  order: int("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProductSpec = typeof productSpecs.$inferSelect;
export type InsertProductSpec = typeof productSpecs.$inferInsert;
