import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { query } from '@angular/animations';
import { Product } from 'src/app/models/product';
import { switchMap} from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { async } from 'q';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [] ;
  filteredProducts: Product []= [];
  category:string;
  cart:any;
  subscription:Subscription;

  constructor( 
    private productService : ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService) {}

  async ngOnInit(){
    this.subscription = (await this.cartService.getCart()).subscribe(cart=>{
      this.cart = cart;
      this.populateProducts();
    })
   }

   ngOnDestroy(){
     this.subscription.unsubscribe();
   }

   private applyFilter(){
    this.filteredProducts = this.category? this .products
    .filter(p=>p.category===this.category):this.products;
  }
  
  private populateProducts(){
    this.productService.getAll().subscribe(values=>{
      this.products=values;
      this.route.queryParamMap.subscribe(params=>{
        this.category = params.get ('category');
        this.applyFilter();
      })
    })
  }


  
}
