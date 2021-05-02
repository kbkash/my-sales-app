import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_alert/alert.service';
import { AuthService } from 'src/app/_services/auth.service';
// import { AlertService } from '../../../_alert/alert.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  toggleActive(is_active:boolean){
    console.log(is_active)
    this.selectedUser['is_active'] = is_active
  }

  toggleAdmin(is_admin:boolean){
    this.selectedUser['is_admin'] = is_admin
  }

  defaultFalse:boolean = false

  formAddUser:FormGroup;
  formMode:string
  selectedUser:object = {
    user_id:null,
    username: null,
    email: null,
    password: null,
    full_name: null,
    contact_number: null,
    address: null,
    is_admin: null,
    is_active: null
  }


  initFormAddUser(){
    this.formAddUser = new FormGroup({
      user_id: new FormControl(this.selectedUser['user_id']),
      username: new FormControl(this.selectedUser['username'], [Validators.required]),
      email: new FormControl(this.selectedUser['email'], [Validators.required]),
      password: new FormControl(this.selectedUser['password']),
      full_name: new FormControl(this.selectedUser['full_name'], [Validators.required]),
      contact_number: new FormControl(this.selectedUser['contact_number'], [Validators.required]),
      address: new FormControl(this.selectedUser['address'], [Validators.required]),
      is_admin: new FormControl(false),
      is_active: new FormControl(false)
    })
  }

  gotoUser(){
    // console.log("route to home here")
    this.route.navigateByUrl("/d/users")
  }

  addOrUpdateUser(){
    if (this.formMode === 'edit'){
      this.updateUser();
    }else if(this.formMode === 'add'){
      this.addUser();
    }
  }

  addUser(){
    if(this.formAddUser.valid){
      this.userService.addUser(this.formAddUser.value).subscribe(async res => {
        if(await res['status']){
          this.alert.success(res['message'])
          this.formAddUser.reset()
        }else{
          this.alert.failure(res['message'])
        }
      })
    }else{
      this.alert.failure("Validation Error")
    }
  }

  updateUser(){
    if(this.formAddUser.valid){
      this.userService.updateUser(this.formAddUser.value).subscribe(async (res:any) => {
        if(await res['status']){
          console.log(res)
          this.alert.success(res['message']);
          this.formAddUser.reset()
        }else{
          this.alert.failure(res['message'])
        }
      })
    }else{
      this.alert.failure("Validation Error")
    }
  }


  constructor(
    private route:Router,
    private userService:AuthService,
    private alert:AlertService  
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('selectedUser')!==null){
      this.formMode = 'edit'
      this.selectedUser = JSON.parse(localStorage.getItem('selectedUser'))
    }else{
      this.formMode = 'add'
      this.selectedUser = {}
    }

    this.initFormAddUser()
  }

  ngOnDestroy(){
    localStorage.removeItem('selectedUser')
  }

}
