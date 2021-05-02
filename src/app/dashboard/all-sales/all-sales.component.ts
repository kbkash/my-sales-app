import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert/alert.service';
import { ProductService } from 'src/app/_services/product.service';
import { SaleService } from 'src/app/_services/sale.service';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.scss']
})
export class AllSalesComponent implements OnInit {

  historyLoaded:boolean = false;
  history:object[]

  getHistory(){
    this.saleService.getAllSales().subscribe(async (res:any) => {
      if(await res.status){
        this.historyLoaded = true
        this.alert.info(res.message)
        this.history = res.sales
        console.log(this.history)
      }
      
    })
  }

  constructor(
    private route:Router,
    private saleService: SaleService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getHistory();
  }

}
