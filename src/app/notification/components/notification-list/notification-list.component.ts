import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { Notification } from 'src/app/shared/models/notification';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  notifications: Notification[];

  constructor(private route: ActivatedRoute, private notifService: NotificationService) { }

  ngOnInit() {
    this.getNotifications();
  }


  getNotifications(): void {
    this.notifService.getNotifications()
      .subscribe(ntf => {
        this.notifications = ntf;
        console.log(this.notifications);
      }
      );
  }

}
