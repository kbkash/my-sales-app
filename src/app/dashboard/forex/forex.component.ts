import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_alert/alert.service';
import { ExternalService } from 'src/app/_services/external.service';

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.scss']
})
export class ForexComponent implements OnInit {

  rateLoaded:boolean =false
  constructor(
      private extService:ExternalService,
      private alert: AlertService
    ) { }

  params:object
  publised_on:string
  data:object[]

  ngOnInit(): void {

    let today = new Date();
    let d = String(today.getDate()).padStart(2, '0');
    let m = String(today.getMonth() + 1).padStart(2, '0'); //month indexing starts from 0
    let y = today.getFullYear();

    let date =  y + "-" + m + "-" + d

    this.extService.getFOREXrate(2,date, date, 1).subscribe(async (res:any) => {
      if (await res.status.code == 200){
        // console.log(res)
        this.params = res.params
        // console.log(this.params)
        this.publised_on = res.data.payload[0].published_on
        // console.log(this.publised_on)
        this.data = res.data.payload[0].rates
        // console.log(this.data)
        this.rateLoaded = true
      }else{
        this.alert.failure(res.status.code)
      }
    })
  }

}
