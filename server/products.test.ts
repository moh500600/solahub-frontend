import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `test-user-${userId}`,
    email: `test${userId}@example.com`,
    name: `Test User ${userId}`,
    loginMethod: "test",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("products", () => {
  it("should list solar panels", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.solarPanels({
      limit: 10,
      offset: 0,
    });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("name");
      expect(result[0]).toHaveProperty("price");
      expect(result[0].type).toBe("solar_panel");
    }
  });

  it("should list batteries", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.batteries({
      limit: 10,
      offset: 0,
    });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("name");
      expect(result[0]).toHaveProperty("price");
      expect(result[0].type).toBe("battery");
    }
  });

  it("should get product details with images, videos, and specs", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.detail({ id: 1 });

    expect(result).not.toBeNull();
    if (result) {
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("name");
      expect(result).toHaveProperty("images");
      expect(result).toHaveProperty("videos");
      expect(result).toHaveProperty("specs");
      expect(result).toHaveProperty("reviews");
      expect(Array.isArray(result.images)).toBe(true);
      expect(Array.isArray(result.videos)).toBe(true);
      expect(Array.isArray(result.specs)).toBe(true);
      expect(Array.isArray(result.reviews)).toBe(true);
    }
  });

  it("should filter solar panels by price range", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.solarPanels({
      minPrice: 30000,
      maxPrice: 60000,
      limit: 10,
      offset: 0,
    });

    expect(Array.isArray(result)).toBe(true);
    result.forEach((product) => {
      expect(product.price).toBeGreaterThanOrEqual(30000);
      expect(product.price).toBeLessThanOrEqual(60000);
    });
  });

  it("should sort products by price ascending", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.solarPanels({
      sortBy: "price_asc",
      limit: 10,
      offset: 0,
    });

    expect(Array.isArray(result)).toBe(true);
    for (let i = 1; i < result.length; i++) {
      expect(result[i].price).toBeGreaterThanOrEqual(result[i - 1].price);
    }
  });

  it("should sort products by rating descending", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.list({
      sortBy: "rating",
      limit: 10,
      offset: 0,
    });

    expect(Array.isArray(result)).toBe(true);
    for (let i = 1; i < result.length; i++) {
      const prevRating = parseFloat(result[i - 1].rating?.toString() || "0");
      const currRating = parseFloat(result[i].rating?.toString() || "0");
      expect(currRating).toBeLessThanOrEqual(prevRating);
    }
  });
});

describe("categories", () => {
  it("should list solar panel categories", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.categories.list({ type: "solar_panel" });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("name");
      expect(result[0].type).toBe("solar_panel");
    }
  });

  it("should list battery categories", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.categories.list({ type: "battery" });

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("name");
      expect(result[0].type).toBe("battery");
    }
  });
});

describe("brands", () => {
  it("should list all brands", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.brands.list();

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("name");
    }
  });
});

describe("cart", () => {
  it("should add item to cart", async () => {
    const ctx = createAuthContext(1);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.cart.add({ productId: 1, quantity: 1 });

    expect(result).toEqual({ success: true });
  });

  it("should get cart items for authenticated user", async () => {
    const ctx = createAuthContext(1);
    const caller = appRouter.createCaller(ctx);

    // First add an item
    await caller.cart.add({ productId: 1, quantity: 2 });

    // Then get cart
    const result = await caller.cart.list();

    expect(Array.isArray(result)).toBe(true);
    const item = result.find((i) => i.productId === 1);
    if (item) {
      expect(item.quantity).toBeGreaterThanOrEqual(1);
      expect(item.product).not.toBeNull();
    }
  });

  it("should update cart item quantity", async () => {
    const ctx = createAuthContext(2);
    const caller = appRouter.createCaller(ctx);

    // Add item
    await caller.cart.add({ productId: 1, quantity: 1 });

    // Update quantity
    const result = await caller.cart.update({ productId: 1, quantity: 5 });

    expect(result).toEqual({ success: true });
  });

  it("should remove item from cart", async () => {
    const ctx = createAuthContext(3);
    const caller = appRouter.createCaller(ctx);

    // Add item
    await caller.cart.add({ productId: 1, quantity: 1 });

    // Remove item
    const result = await caller.cart.remove({ productId: 1 });

    expect(result).toEqual({ success: true });
  });

  it("should clear entire cart", async () => {
    const ctx = createAuthContext(4);
    const caller = appRouter.createCaller(ctx);

    // Add multiple items
    await caller.cart.add({ productId: 1, quantity: 1 });
    await caller.cart.add({ productId: 2, quantity: 1 });

    // Clear cart
    const result = await caller.cart.clear();

    expect(result).toEqual({ success: true });
  });

  it("should prevent unauthenticated users from accessing cart", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.cart.list();
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("UNAUTHORIZED");
    }
  });
});
