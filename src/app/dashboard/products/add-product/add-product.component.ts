import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert/alert.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  // @Input() productInfo:object

  formMode:string;
  selectedProduct:object = {
    product_id: '',
    product_code: '',
    product_type: '',
    product_manufacturer: '',
    product_price: '',
    product_in_stock: ''
  }

  productForm:FormGroup;

  initForm(){
    this.productForm = new FormGroup({
      product_id: new FormControl(this.selectedProduct['product_id']),
      product_code: new FormControl(this.selectedProduct['product_code'], [Validators.required]),
      product_type: new FormControl(this.selectedProduct['product_type'], [Validators.required]),
      product_manufacturer: new FormControl(this.selectedProduct['product_manufacturer'], [Validators.required]),
      product_price: new FormControl(this.selectedProduct['product_price'], [Validators.required]),
      product_in_stock: new FormControl(this.selectedProduct['product_in_stock'], [Validators.required]),
    })
  }


  closeForm(){
    localStorage.removeItem('selectedProduct')
    this.route.navigateByUrl("d/products")
  }

  addOrUpdateProduct(){
    if (this.formMode === 'edit'){
      this.updateProduct();
    }else if(this.formMode === 'add'){
      this.addProduct();
    }
  }

  updateProduct(){
    if(this.productForm.valid){
      this.productService.updateProduct(this.productForm.value).subscribe(async res=>{
        if(res.status){
          await this.alert.success(res.message)
          await this.productForm.reset()
          await this.route.navigateByUrl("d/products")
        }else{
          await this.alert.failure(res.message)
        }
      })
    }else{
      this.alert.failure("validation Failed")
    }
  }

  addProduct(){
    if(this.productForm.valid){
      this.productService.addProduct(this.productForm.value).subscribe(async res=>{
        if(await res.status){
          this.alert.success(res.message)
          this.productForm.reset()
        }else{
          this.alert.failure(res.message)
        }
      })
    }else{
      this.alert.failure("validation Failed")
    }
  }











  constructor(
    private route: Router,
    private alert: AlertService,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    
    if (localStorage.getItem('selectedProduct') !== null){
      this.formMode = 'edit';
      this.selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'))
    }else{
      this.selectedProduct = {}
      this.formMode = 'add';
    }
    this.initForm()
  }

  ngOnDestroy(){
    localStorage.removeItem('selectedProduct')
  }
}
