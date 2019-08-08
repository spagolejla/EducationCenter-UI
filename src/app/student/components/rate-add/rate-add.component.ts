import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { DataService } from 'src/app/shared/services/data.service';
import { Educator } from 'src/app/shared/models/educator';
import { EducatorService } from 'src/app/educator/services/educator.service';
import { forkJoin } from 'rxjs';
import { AddEducatorRate } from 'src/app/shared/models/addEducatorRate';

@Component({
  selector: "app-rate-add",
  templateUrl: "./rate-add.component.html",
  styleUrls: ["./rate-add.component.scss"]
})
export class RateAddComponent implements OnInit {
  rateForm: FormGroup;
  hideSpinner = false;
  educator: Educator;
  educatorId: number;
  observables: any = [];
  constructor(
    private educatorService: EducatorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private _service: DataService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.educatorId = +params.get("id");
    });

    this.observables.push(
      this.educatorService.getEducatorById(this.educatorId));



    forkJoin(this.observables).subscribe(responseList => {
      this.educator = responseList[0] as Educator;
      this.toggleSpinner();
    });

    this.rateForm  =  this.formBuilder.group({
      comment: ['', Validators.required],
      rate: ['', [Validators.required, Validators.min(1), Validators.max(10)]],

  });

  }

  get f() { return this.rateForm.controls; }


onSubmit() {
  const newRate: AddEducatorRate = {
    educatorId: this.educatorId,
    studentId: this._service.currentUser.userId,
    rate: this.rateForm.value.rate,
    comment: this.rateForm.value.comment

  };

  this.educatorService.addEducatorRate(newRate).subscribe(
    () => {
      this.toggleSpinner();
      this.openSnackBar("Success!", "Educator is successfully rated!");
      this.router.navigate(["/educator/details", this.educatorId]);
    },
    err => {
      this.toggleSpinner();
      this.openSnackBar(err, "Something bad has happened!");
      console.log(err);
    }
  );
}


  toggleSpinner() {
    this.hideSpinner ? (this.hideSpinner = false) : (this.hideSpinner = true);
  }
  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}
