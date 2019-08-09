import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from "@angular/material";
import { NotificationService } from '../../services/notification.service';
import { forkJoin } from 'rxjs';
import { AddNotification } from 'src/app/shared/models/addNotification';
import { EditNotification } from 'src/app/shared/models/editNotification';
import { DataService } from 'src/app/shared/services/data.service';


@Component({
  selector: 'app-notification-addedit',
  templateUrl: './notification-addedit.component.html',
  styleUrls: ['./notification-addedit.component.scss']
})
export class NotificationAddeditComponent implements OnInit {
  hideSpinner = false;

  pageTitle = "Add new notification";
  notifId: number;

  isAdmin: boolean = true;
  editNotification: EditNotification;
  userId: number;

  observables: any = [];

  notifForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    text: new FormControl(null, [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private notifService: NotificationService,
    private _service: DataService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.notifId = +params.get("id");
      this.userId = this._service.currentUser.userId;
      this.isAdmin = this._service.isAdmin;
    });

    if (this.isEdit) {
      this.observables.push(this.notifService.getNotifById(this.notifId));
    }


    forkJoin(this.observables).subscribe(responseList => {
     /*  this.students = responseList[0] as Student[];
      this.courses = responseList[1] as Course[]; */
      if (this.isEdit) {
        this.toggleSpinner();

        this.editNotification = responseList[0] as EditNotification;

        this.displayNotif();


      }


    });
    this.toggleSpinner();

  }

  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }
  get f(): any {
    return this.notifForm.controls;
  }
  get isEdit(): boolean {
    if (this.notifId === 0) {
      return false;
    } else {
      return true;
    }
  }

  displayNotif(): void {
    if (this.notifForm) {
      this.notifForm.reset();
    }
    this.toggleSpinner();

    this.pageTitle = "Edit notification";

    this.notifForm.patchValue({
      title: this.editNotification.title,
      text: this.editNotification.text
    });
  }

  onSubmit() {
    if (this.notifForm.invalid || this.notifForm.untouched) {
      return;
    }
    this.toggleSpinner();
    if (!this.isEdit) {
      this.addNewNotif();
    } else {
      this.updateNotif();
    }
  }


  addNewNotif() {
    // promjeniti creatorId na logiranog korisnika
    const newNotif: AddNotification = {
      title: this.notifForm.value.title,
      text: this.notifForm.value.text,
      isAdmin: this.isAdmin,
      creatorId: this.userId
    };

    this.notifService.addNotif(newNotif).subscribe(
      () => {
        this.toggleSpinner();

        this.openSnackBar('Success!', 'New notfication added!');
        this.notifForm.reset();
        this.router.navigate(['/notification']);
      },
      err => {
        this.snackBar.open(err, 'Close');
        this.toggleSpinner();

        console.error(err);
      }
    );
  }

  updateNotif() {
    this.editNotification.title = this.notifForm.get('title').value;
    this.editNotification.text = this.notifForm.get('text').value;


    this.notifService.updateNotif(this.editNotification).subscribe(
      () => {
        this.toggleSpinner();

        this.snackBar.open('Successfully updated notification !', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/notification']);
      },
      err => {
        this.toggleSpinner();
        this.snackBar.open(err, 'Close');
        console.error(err);
      }
    );

  }

  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }

}
