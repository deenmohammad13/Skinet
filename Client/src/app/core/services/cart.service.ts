import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../../shared/Models/cart';
import { Product } from '../../shared/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  cart = signal<Cart | null>(null);

  getCart(id:string){
    return this.http.get<Cart>(this.baseUrl + 'cart?id='+ id).subscribe({
      next : cart => this.cart.set(cart),
      error : error => console.error('Error fetching cart:', error)
    });
  }

  setCart(cart: Cart) {
    return this.http.post<Cart>(this.baseUrl + 'cart', cart).subscribe({
      next : cart => this.cart.set(cart),
      error : error => console.error('Error setting cart:', error)
    });
  }

  addItemToCart(item: CartItem | Product, quantity = 1) {
    const cart = this.cart()?? this.createCart();
    if(this.isProduct(item)){
      item = this.mapProductItemToCartItem(item);
    }
    cart.items = this.addOrUpdateItem(cart.items, item, quantity);
    this.setCart(cart);
  }

  private addOrUpdateItem(items: CartItem[], item: CartItem, quantity: number): CartItem[] {
    const index = items.findIndex(x => x.productId=== item.productId);
    if(index === -1){
      item.quantity = quantity;
      items.push(item);
    }
    else{
      items[index].quantity += quantity;
    }
    return items;
  }

  private mapProductItemToCartItem(item: Product): CartItem {
    return {
      productId: item.id,
      productName : item.name,
      price : item.price,
      quantity : 0,
      pictureurl : item.pictureUrl,
      brand : item.brand,
      type : item.type
    }
  }

  private isProduct(item: CartItem | Product): item is Product {
    return (item as Product).id ! == undefined;
  }

  private createCart(): Cart{
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }
}
