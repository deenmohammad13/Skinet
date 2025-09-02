import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/Models/Product';
import { ShopService } from '../../core/services/shop.service';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ShopParams } from '../../shared/Models/ShopParams';

@Component({
  selector: 'app-shop',
  imports: [
   MatButton,
   MatIcon,
   MatDialogModule,
   MatSelectionList,
   MatMenu,
   MatMenuTrigger,  
   MatListOption,
   ProductItemComponent
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements  OnInit {
     products: Product[] = [];
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ]

  ngOnInit(): void {
      this.initializeShops();
  }

  initializeShops(){
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
    
  }
  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
        next: response => this.products = response.data,
        error: error => console.log(error)
      })
  }
  onSortChange(event: MatSelectionListChange){
    const selectedOption = event.options[0];
    if (selectedOption){
      this.shopParams.sort = selectedOption.value;
      this.getProducts();
    }
  }

  openFiltersDialog(){
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data : {
        selectedBrands : this.shopParams.brands,
        selectedTypes : this.shopParams.types
      }
    });

    dialogRef.afterClosed().subscribe({
      next : result => {
        if (result){
          this.shopParams.brands = result.selectedBrands;
          this.shopParams.types = result.selectedTypes;
          this.getProducts();
        }
      }
    })
  }
}
