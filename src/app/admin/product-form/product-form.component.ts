import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { map, switchMap,take } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({   
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product={ };
  id;

  constructor(private categoryService: CategoryService ,
    private route: ActivatedRoute,
    private router : Router,
     private productService: ProductService ) {

    this.id = this.route.snapshot.paramMap.get('id');

    categoryService.getCategories().subscribe(val=>{
      this.categories$ = val;
    });

    
    if(this.id) {
      this.productService.get(this.id).subscribe(prod=>{
        this.product = prod;
      })
    }
  }

  save(product){
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Are you sure want to delete this product?')) return ;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
