import { Component, OnInit, OnDestroy} from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataTableResource } from 'angular5-data-table';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products:Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product[]>;
  items: any;
  itemCount:number;

  constructor(private productService:ProductService) { 
    this.subscription=this.productService.getAll().subscribe(values=>{
       this.products = values;
       this.initializeTable(values);
    })
  }

  private initializeTable(products){
    this.tableResource = new DataTableResource(products);
     this.tableResource.query({offset:0, limit:10})
     .then(items=>{
       this.items = items;
     });
     this.tableResource.count()
     .then(count=>{
       this.itemCount=count});

    
  }
  reloadItems(params){
    if(!this.tableResource) return;
  
    this.tableResource.query(params)
    .then(items=>{
      this.items = items}
      );
  }

  filter(query : string){
    console.log("query",query)
    let filteredProducts = (query) ?
     this.products.filter(p=> p.title.toLowerCase().includes(query.toLowerCase())): this.products;
     this.initializeTable(filteredProducts);
  }

  ngOnInit() {
    
  }
 

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
