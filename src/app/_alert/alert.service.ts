import { Injectable } from '@angular/core';
import { NgxNotificationDirection, NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  direction:any;
  constructor(
    private readonly notificationService: NgxNotificationMsgService
    ) {
      this.direction = NgxNotificationDirection.BOTTOM_RIGHT;
    }

  // Success alert
  success(message:string, title?: string){
    if (title === undefined){
      title = "Success";
    }
    this.notificationService.open({
      direction: this.direction,
      status: NgxNotificationStatusMsg.SUCCESS,
      header: title,
      messages: [message]
    })
  }

  // Success alert
  failure(message:string, title?: string){
    if (title === undefined){
      title = "Error";
    }

    this.notificationService.open({
      direction: this.direction,
      status: NgxNotificationStatusMsg.FAILURE,
      header: title,
      messages: [message]
    })
  }

  // Success alert
  info(message:string, title?: string){
    if (title === undefined){
      title = "Info";
    }
    this.notificationService.open({
      direction: this.direction,
      status: NgxNotificationStatusMsg.INFO,
      header: title,
      messages: [message]
    })
  }

  // Success alert
  general(message:string, title?: string){
    if (title === undefined){
      title = "General";
    }

    this.notificationService.open({
      direction: this.direction,
      status: NgxNotificationStatusMsg.NONE,
      header: title,
      messages: [message]
    })
  }
}
