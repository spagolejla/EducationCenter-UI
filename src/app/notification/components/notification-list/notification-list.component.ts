import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../services/notification.service";
import { Notification } from "src/app/shared/models/notification";
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: "app-notification-list",
  templateUrl: "./notification-list.component.html",
  styleUrls: ["./notification-list.component.scss"]
})
export class NotificationListComponent implements OnInit {
  hideSpinner = false;

  notifications: Notification[];
  user: string;
  constructor(
    private route: ActivatedRoute,
    private notifService: NotificationService,
    private _service: DataService
  ) {}

  ngOnInit() {
    this.getNotifications();
  }

  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }
  checkNotification() {
    for (let notif of this.notifications) {
      if (notif.user === this.user) {
        notif.isCreator = true;
      }
    }
  }

  getNotifications(): void {
    this.notifService.getNotifications().subscribe(ntf => {
      this.toggleSpinner();
      this.notifications = ntf;
      this.user = this._service.currentUser.firstName + ' ' + this._service.currentUser.lastName;
      this.checkNotification();

    });
  }
}
