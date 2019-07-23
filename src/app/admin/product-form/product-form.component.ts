import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { Router } from '@angular/router';
@Component({   
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(private categoryService: CategoryService ,
      private router : Router,
     private productService: ProductService ) { 
    categoryService.getCategories().subscribe(val=>{
      this.categories$ = val;
    });
  }

  save(products){
    this.productService.create(products);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
