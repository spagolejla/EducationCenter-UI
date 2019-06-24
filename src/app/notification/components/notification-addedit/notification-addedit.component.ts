import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from "@angular/material";
import { NotificationService } from '../../services/notification.service';
import { forkJoin } from 'rxjs';
import { AddNotification } from 'src/app/shared/models/addNotification';


@Component({
  selector: 'app-notification-addedit',
  templateUrl: './notification-addedit.component.html',
  styleUrls: ['./notification-addedit.component.scss']
})
export class NotificationAddeditComponent implements OnInit {

  pageTitle = "Add new notification";
  notifId: number;

  isAdmin: boolean = true;
 // editNotification: EditPayment;


  observables: any = [];

  notifForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    text: new FormControl(null, [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private notifService: NotificationService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.notifId = +params.get("id");
    });

    if (this.isEdit) {
     // this.observables.push(this.notifService.getNotifById(this.notifId));
    }


    forkJoin(this.observables).subscribe(responseList => {
     /*  this.students = responseList[0] as Student[];
      this.courses = responseList[1] as Course[]; */
      if (this.isEdit) {
       // this.editPayment = responseList[2] as EditPayment;
        // this.displayNotif();
      }
    });

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

  }

  onSubmit() {
    if (this.notifForm.invalid || this.notifForm.untouched) {
      return;
    }
    //this.toggleSpinner();
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
      creatorId: 1
    };

    this.notifService.addNotif(newNotif).subscribe(
      () => {
        this.openSnackBar('Success!', 'New notfication added!');
        this.notifForm.reset();
        this.router.navigate(['/notification']);
      },
      err => console.log(err)
    );
  }

  updateNotif() {


  }

  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }

}
