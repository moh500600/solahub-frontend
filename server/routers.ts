import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getProducts,
  getProductById,
  getProductImages,
  getProductVideos,
  getProductSpecs,
  getProductReviews,
  getCategories,
  getBrands,
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Products router
  products: router({
    // Get all products with filters
    list: publicProcedure
      .input(
        z.object({
          type: z.enum(["solar_panel", "battery"]).optional(),
          categoryId: z.number().optional(),
          brandIds: z.array(z.number()).optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          minPower: z.number().optional(),
          maxPower: z.number().optional(),
          minEfficiency: z.number().optional(),
          maxEfficiency: z.number().optional(),
          minCapacity: z.number().optional(),
          maxCapacity: z.number().optional(),
          sortBy: z.enum(["price_asc", "price_desc", "rating", "newest"]).optional(),
          limit: z.number().default(20),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        return getProducts(input);
      }),

    // Get product by ID with all details
    detail: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const product = await getProductById(input.id);
        if (!product) return null;

        const images = await getProductImages(input.id);
        const videos = await getProductVideos(input.id);
        const specs = await getProductSpecs(input.id);
        const reviews = await getProductReviews(input.id, 10, 0);

        return {
          ...product,
          images,
          videos,
          specs,
          reviews,
        };
      }),

    // Get solar panels
    solarPanels: publicProcedure
      .input(
        z.object({
          categoryId: z.number().optional(),
          brandIds: z.array(z.number()).optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          minPower: z.number().optional(),
          maxPower: z.number().optional(),
          minEfficiency: z.number().optional(),
          maxEfficiency: z.number().optional(),
          sortBy: z.enum(["price_asc", "price_desc", "rating", "newest"]).optional(),
          limit: z.number().default(20),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        return getProducts({
          ...input,
          type: "solar_panel",
        });
      }),

    // Get batteries
    batteries: publicProcedure
      .input(
        z.object({
          categoryId: z.number().optional(),
          brandIds: z.array(z.number()).optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          minCapacity: z.number().optional(),
          maxCapacity: z.number().optional(),
          sortBy: z.enum(["price_asc", "price_desc", "rating", "newest"]).optional(),
          limit: z.number().default(20),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        return getProducts({
          ...input,
          type: "battery",
        });
      }),
  }),

  // Categories router
  categories: router({
    list: publicProcedure
      .input(z.object({ type: z.enum(["solar_panel", "battery"]).optional() }))
      .query(async ({ input }) => {
        return getCategories(input.type);
      }),
  }),

  // Brands router
  brands: router({
    list: publicProcedure.query(async () => {
      return getBrands();
    }),
  }),

  // Cart router
  cart: router({
    // Get cart items for current user
    list: protectedProcedure.query(async ({ ctx }) => {
      const items = await getCartItems(ctx.user.id);
      // Fetch product details for each item
      const itemsWithProducts = await Promise.all(
        items.map(async (item) => {
          const product = await getProductById(item.productId);
          return {
            ...item,
            product,
          };
        })
      );
      return itemsWithProducts;
    }),

    // Add item to cart
    add: protectedProcedure
      .input(z.object({ productId: z.number(), quantity: z.number().default(1) }))
      .mutation(async ({ input, ctx }) => {
        await addToCart(ctx.user.id, input.productId, input.quantity);
        return { success: true };
      }),

    // Update cart item quantity
    update: protectedProcedure
      .input(z.object({ productId: z.number(), quantity: z.number() }))
      .mutation(async ({ input, ctx }) => {
        await updateCartItem(ctx.user.id, input.productId, input.quantity);
        return { success: true };
      }),

    // Remove item from cart
    remove: protectedProcedure
      .input(z.object({ productId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        await removeFromCart(ctx.user.id, input.productId);
        return { success: true };
      }),

    // Clear entire cart
    clear: protectedProcedure.mutation(async ({ ctx }) => {
      await clearCart(ctx.user.id);
      return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
