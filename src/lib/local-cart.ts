interface LocalCartItem {
  productId: number;  // تغيير من string إلى number
  quantity: number;
  addedAt: Date;
}

const LOCAL_CART_KEY = 'guest_cart';

export const localCart = {
  // إضافة منتج للسلة المحلية
  addItem(productId: number, quantity: number = 1) {  // تغيير parameter إلى number
    const cart = this.getCart();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId,  // سيكون number
        quantity,
        addedAt: new Date()
      });
    }
    
    this.saveCart(cart);
    this.dispatchCartUpdate();
  },

  // تحديث الكمية
  updateItem(productId: number, quantity: number) {  // تغيير إلى number
    const cart = this.getCart();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        existingItem.quantity = quantity;
        this.saveCart(cart);
      }
    }
    this.dispatchCartUpdate();
  },

  // إزالة منتج
  removeItem(productId: number) {  // تغيير إلى number
    const cart = this.getCart();
    const filteredCart = cart.filter(item => item.productId !== productId);
    this.saveCart(filteredCart);
    this.dispatchCartUpdate();
  },

  // الحصول على السلة
  getCart(): LocalCartItem[] {
    if (typeof window === 'undefined') return [];
    
    const cartData = localStorage.getItem(LOCAL_CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
  },

  // الحصول على عدد العناصر
  getItemCount(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  // مسح السلة
  clear() {
    localStorage.removeItem(LOCAL_CART_KEY);
    this.dispatchCartUpdate();
  },

  // حفظ السلة
  saveCart(cart: LocalCartItem[]) {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
  },

  // إرسال حدث تحديث السلة
  dispatchCartUpdate() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cart-updated'));
    }
  }
};