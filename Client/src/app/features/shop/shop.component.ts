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
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { Pagination } from '../../shared/Models/Pagination';
import { FormsModule } from '@angular/forms';

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
   MatPaginator,
   ProductItemComponent,
   FormsModule
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements  OnInit {
  products?: Pagination<Product>;
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  shopParams = new ShopParams();
  pageSizeOptions = [5,10,15,20];
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
        next: response => this.products = response,
        error: error => console.log(error)
      })
  }

  onSearchChange(){
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  
  handlePageEvent(event: PageEvent){
    this.shopParams.pageNumber = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }

  onSortChange(event: MatSelectionListChange){
    const selectedOption = event.options[0];
    if (selectedOption){
      this.shopParams.sort = selectedOption.value;
      this.shopParams.pageNumber = 1;
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
          this.shopParams.pageNumber = 1;
          this.getProducts();
        }
      }
    })
  }
}
