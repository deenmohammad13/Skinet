import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/Models/Product';
import { ShopService } from '../../core/services/shop.service';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-shop',
  imports: [
    MatCard 
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements  OnInit {
     products: Product[] = [];
  private shopService = inject(ShopService);

  ngOnInit(): void {
      this.shopService.getProducts().subscribe({
        next: response => this.products = response.data,
        error: error => console.log(error)
      })
  }
}
