import { Component, inject, input } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../shared/Models/cart';
import { RouterLink } from '@angular/router';
import { MatIconButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CurrencyPipe } from '@angular/common';
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-cart-item',
  imports: [RouterLink, MatIconButton, MatIconModule, CurrencyPipe, MatButton],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  item = input.required<CartItem>();
  cartService = inject(CartService);

  incrementQuantity(){
    this.cartService.addItemToCart(this.item());
  }

  decrementQuantity(){
    this.cartService.removeItemFromCart(this.item().productId);
  }

  removeItemFromCart(){
    this.cartService.removeItemFromCart(this.item().productId, this.item().quantity);
  }
}
