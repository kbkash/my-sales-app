import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../_alert/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user:any
  is_admin:string
  constructor(
    private route: Router,
    private readonly alert: AlertService
    ) { }

  signOut(){
    localStorage.clear()
    this.user=undefined;
    this.route.navigateByUrl('');
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('token')
    this.is_admin = localStorage.getItem('is_admin')
    if(this.user == undefined){
      this.route.navigateByUrl("")
      this.alert.failure('failed to get the token', 'App error')
    }
  }

}
