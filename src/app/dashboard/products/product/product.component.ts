import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert/alert.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products:object[] = []
  productLoaded:boolean = false

  addNewProduct(){
    this.route.navigateByUrl("/d/addproduct")
  }

  editProduct(product_id){
    for(let i =0; i< this.products.length; i++){
      if (product_id === this.products[i]['product_id']){
        console.log(this.products[i])
        localStorage.setItem("selectedProduct", JSON.stringify(this.products[i]))
        this.route.navigateByUrl("/d/addproduct")
      }
    }
  }
  
  constructor(
    private route:Router,
    private productService: ProductService,
    private alert: AlertService
  ) { }

  is_admin:string
  ngOnInit(): void {
    this.getProducts();
    this.is_admin = localStorage.getItem('is_admin')
  }

  getProducts(){
    this.productService.getAllProduct().subscribe(async res => {
      await console.log(res)
      if(res.status){
        this.products = res.products
        await this.alert.success("All products fetched", 'Success')
        this.productLoaded = true

      }else{
        await this.alert.failure("Failed to load products")
      }
    })
  }

}
