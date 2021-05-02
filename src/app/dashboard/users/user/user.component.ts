import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert/alert.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users:object[] = [];
  usersLoaded:boolean = false;

  addNewUser(){
    this.route.navigateByUrl("d/addUser")
  }

  editUser(user_id:string){
    for(let i =0; i< this.users.length; i++){
      if (user_id === this.users[i]['user_id']){
        console.log(this.users[i])
        localStorage.setItem("selectedUser", JSON.stringify(this.users[i]))
        this.route.navigateByUrl("d/addUser")
        break
      }
    }
  }

  getUsers(){
    this.authService.getAllUsers().subscribe(async res => {
      if(await res.status){
        this.usersLoaded = true
        console.log(res.payload)
        this.users = res.payload
        this.alert.info(res.message)
      }
    })
  }

  constructor(
    private route:Router,
    private authService: AuthService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

}
