import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/Models/Product';
import { ShopService } from '../../core/services/shop.service';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-shop',
  imports: [
   MatCard,
   MatButton,
   MatIcon,
   MatDialogModule,
   ProductItemComponent
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements  OnInit {
     products: Product[] = [];
     selectedBrands: string[] = [];
     selectedTypes: string[] = [];
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);

  ngOnInit(): void {
      this.initializeShops();
  }

  initializeShops(){
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.shopService.getProducts().subscribe({
        next: response => this.products = response.data,
        error: error => console.log(error)
      })
  }

  openFiltersDialog(){
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data : {
        selectedBrands : this.selectedBrands,
        selectedTypes : this.selectedTypes
      }
    });

    dialogRef.afterClosed().subscribe({
      next : result => {
        if (result){
          this.selectedBrands = result.selectedBrands;
          this.selectedTypes = result.selectedTypes;
          this.shopService.getProducts(this.selectedBrands, this.selectedTypes).subscribe({
            next: response => this.products = response.data,
            error: error => console.log(error)
          })
        }
      }
    })
  }
}
