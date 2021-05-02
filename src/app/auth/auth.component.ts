import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxNotificationMsgService, NgxNotificationDirection, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { AlertService } from '../_alert/alert.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  formGroup:FormGroup;

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(){
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(async res => {
        console.log(res)
        if(await res.status){
          localStorage.setItem('token', res.token)
          localStorage.setItem('is_admin', res.payload.is_admin)
          localStorage.setItem('username', res.payload.username)
          localStorage.setItem('logged_in_user', res.payload.user_id)

          this.alert.success("Login Success", 'Welcome')
          
          await this.route.navigateByUrl('d');

        }else{
          this.alert.failure("incorrect username or password")
        }
      }) //authService Closed
    }

  }


  constructor(
    private authService:AuthService,
    private route: Router,
    private readonly alert: AlertService
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

}
