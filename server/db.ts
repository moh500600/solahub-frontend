import { eq, and, gte, lte, inArray, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, categories, brands, products, productImages, productVideos, reviews, cartItems, productSpecs } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Product queries
export async function getProducts(filters?: {
  type?: 'solar_panel' | 'battery';
  categoryId?: number;
  brandIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  minPower?: number;
  maxPower?: number;
  minEfficiency?: number;
  maxEfficiency?: number;
  minCapacity?: number;
  maxCapacity?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return [];

  const conditions: any[] = [];

  if (filters?.type) {
    conditions.push(eq(products.type, filters.type));
  }
  if (filters?.categoryId) {
    conditions.push(eq(products.categoryId, filters.categoryId));
  }
  if (filters?.brandIds && filters.brandIds.length > 0) {
    conditions.push(inArray(products.brandId, filters.brandIds));
  }
  if (filters?.minPrice !== undefined) {
    conditions.push(gte(products.price, filters.minPrice));
  }
  if (filters?.maxPrice !== undefined) {
    conditions.push(lte(products.price, filters.maxPrice));
  }
  if (filters?.minPower !== undefined) {
    conditions.push(gte(products.power, filters.minPower));
  }
  if (filters?.maxPower !== undefined) {
    conditions.push(lte(products.power, filters.maxPower));
  }
  if (filters?.minEfficiency !== undefined) {
    conditions.push(gte(products.efficiency, filters.minEfficiency));
  }
  if (filters?.maxEfficiency !== undefined) {
    conditions.push(lte(products.efficiency, filters.maxEfficiency));
  }
  if (filters?.minCapacity !== undefined) {
    conditions.push(gte(products.capacity, filters.minCapacity));
  }
  if (filters?.maxCapacity !== undefined) {
    conditions.push(lte(products.capacity, filters.maxCapacity));
  }

  let query = db.select().from(products);

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  // Sorting
  if (filters?.sortBy === 'price_asc') {
    query = query.orderBy(asc(products.price)) as any;
  } else if (filters?.sortBy === 'price_desc') {
    query = query.orderBy(desc(products.price)) as any;
  } else if (filters?.sortBy === 'rating') {
    query = query.orderBy(desc(products.rating)) as any;
  } else if (filters?.sortBy === 'newest') {
    query = query.orderBy(desc(products.createdAt)) as any;
  }

  // Pagination
  if (filters?.limit) {
    query = query.limit(filters.limit) as any;
  }
  if (filters?.offset) {
    query = query.offset(filters.offset) as any;
  }

  return query as any;
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getProductImages(productId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(productImages)
    .where(eq(productImages.productId, productId))
    .orderBy(asc(productImages.order));
}

export async function getProductVideos(productId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(productVideos)
    .where(eq(productVideos.productId, productId))
    .orderBy(asc(productVideos.order));
}

export async function getProductSpecs(productId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(productSpecs)
    .where(eq(productSpecs.productId, productId))
    .orderBy(asc(productSpecs.order));
}

export async function getProductReviews(productId: number, limit = 10, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(reviews)
    .where(eq(reviews.productId, productId))
    .orderBy(desc(reviews.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getCategories(type?: 'solar_panel' | 'battery') {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(categories);
  if (type) {
    query = query.where(eq(categories.type, type)) as any;
  }
  return query as any;
}

export async function getBrands() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(brands);
}

// Cart operations
export async function getCartItems(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(cartItems).where(eq(cartItems.userId, userId));
}

export async function addToCart(userId: number, productId: number, quantity: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db.select().from(cartItems)
    .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)))
    .limit(1);

  if (existing.length > 0) {
    return db.update(cartItems)
      .set({ quantity: existing[0].quantity + quantity })
      .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)));
  } else {
    return db.insert(cartItems).values({ userId, productId, quantity });
  }
}

export async function updateCartItem(userId: number, productId: number, quantity: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (quantity <= 0) {
    return db.delete(cartItems)
      .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)));
  }

  return db.update(cartItems)
    .set({ quantity })
    .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)));
}

export async function removeFromCart(userId: number, productId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.delete(cartItems)
    .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)));
}

export async function clearCart(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.delete(cartItems).where(eq(cartItems.userId, userId));
}

// Review operations
export async function addReview(productId: number, userId: number, rating: number, title: string, content: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(reviews).values({ productId, userId, rating, title, content });
}
