import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/Models/Product';
import { Pagination } from './shared/Models/Pagination';
import { ShopService } from './core/services/shop.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'Client';
  products: Product[] = [];
  private shopService = inject(ShopService);

  ngOnInit(): void {
      this.shopService.getProducts().subscribe({
        next: response => this.products = response.data,
        error: error => console.log(error)
      })
  }
}
