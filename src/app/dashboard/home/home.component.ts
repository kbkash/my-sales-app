import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { SaleService } from 'src/app/_services/sale.service';
import { AlertService } from '../../_alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  is_admin:string
  homeLoaded:boolean= false;
  products:object[]
  VATConfig:object = {
    config_id:null,
    vat_rate:null
  }
  salesForm:FormGroup
  
  title= ""
  myType = 'ColumnChart';
  myData = [];
  columnNames = ['days', 'Rs'];
  options = {
    legend : {position: 'none'},
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    width : 1000,
    height : 500,
    backgroundColor: 'transparent' 
  }
  // height= 800;
  // width = 700;
  

  chartHasData:boolean = false
  dataMode:string = "Weekly"
  // quickMode:boolean = false

  getChartData(days:number){
    this.saleService.getChartData(days).subscribe( async (res:any) => {
      if(await res.status){
        this.myData = res.data
        this.alert.success(res.message)
        this.chartHasData=true
        console.log(this.myData)
        if(days === 30){
          this.dataMode = "Monthly"
        }else{
          this.dataMode = "Weekly"
        }
      }else{
        console.log(res)
        this.alert.failure(res.message)
      }
    })
  }
  

  constructor(
      private route: Router,
      private alert:AlertService,
      private saleService: SaleService,
      private productService: ProductService
    ){

  }

  getSales(){

  }

  makeSale(){

  }
  selectedConfig:string
  
  getProducts(){
    this.productService.getAllProduct().subscribe(async (res:any) => {
      if (await res.status){
        this.products = res.products
        console.log(this.products)
        this.saleService.getVATRate().subscribe(async (res:any) => {
          if (await res.status){
            this.VATConfig = res.config
            console.log(this.VATConfig)
            this.selectedConfig = res.config.config_id
            this.homeLoaded =true
            this.getChartData(30)
          }
        })
      }else{
        this.alert.failure(res.message)
      }
    })
  }

  

  selectedProductId:string
  selectedProductRate:number
  selectedVATId:string
  selectedSoldQuantity:number
  finalProductRate:number

  setProductId(value){
    this.selectedProductId = value
    this.selectedProductRate = this.products.filter(
      product => product['product_id'] === value)[0]['product_price']
  }

  setVATCOnfigId(value){
    this.selectedVATId = value
    console.log(this.selectedVATId) 
  }

  setProductRate(value){
    this.finalProductRate = value
  }

  setSoldQuantity(value){
    this.selectedSoldQuantity = value
    console.log(value)
  }
  

  

  onSubmitSales(){
    let dataSet:object = {
      product_id: this.selectedProductId,
      sold_rate: this.selectedProductRate,
      vat_rate_id: this.selectedConfig,
      sold_by: localStorage.getItem('logged_in_user'),
      sold_quantity: this.selectedSoldQuantity,
    }

    if (dataSet['product_id'] && dataSet['sold_quantity']){
      this.saleService.addSale(dataSet).subscribe(async (res:any) => {
        if (await res['status']){
          this.alert.success("Transaction successful")
          window.location.reload()
        }else{
          this.alert.failure("transaction could not be completed")
        }
      })
    }else{
      console.log("Invalid response")
    }



  }


  ngOnInit(): void {
    this.is_admin = localStorage.getItem("is_admin")
    
    this.getProducts()


  }

  // buttonClick(){
  //   this.alert.success("hello")
  // }

}
