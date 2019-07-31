import { Component, OnInit } from "@angular/core";
import { Course } from 'src/app/shared/models/course';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/course/services/course.service';
import { CompetitionService } from '../../services/competition.service';
import { DataService } from 'src/app/shared/services/data.service';
import { forkJoin } from 'rxjs';
import { AddCompetition } from 'src/app/shared/models/addCompetition';
import { Competition } from 'src/app/shared/models/competition';

@Component({
  selector: "app-competition-addedit",
  templateUrl: "./competition-addedit.component.html",
  styleUrls: ["./competition-addedit.component.scss"]
})
export class CompetitionAddeditComponent implements OnInit {
  hideSpinner = false;
  errors: string[] = null;
  isEdit: boolean = false;
  courses: Course[] = [];
  title: string = "Add new competition";

  competitionForm: FormGroup;
  competitionUpdateForm: FormGroup;


  observables: any = [];
  competitionId: number;
  educatorId: any;
  compEdit: AddCompetition;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private courseService: CourseService,
    private compService: CompetitionService,
    private route: ActivatedRoute,
    private _service: DataService,
  ) {}

  ngOnInit() {
    this.educatorId = this._service.currentUser.userId;
    this.route.paramMap.subscribe(params => {
      this.competitionId = +params.get("id");
    });

    this.competitionForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      endDate: ["", Validators.required],
      courseId: [null, Validators.required],
      maxCandidates: [null, Validators.required]
  });

    this.competitionUpdateForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      endDate: ["", Validators.required],
      maxCandidates: [null, Validators.required],
      active: [null],

 });

    this.observables.push(this.courseService.getCoursesForCompetition(this.educatorId));
   console.log("compId", this.competitionId);
    if ( this.competitionId !== 0 ) {

      this.observables.push(this.compService.getCompetitionDetailsById(this.competitionId));
      this.isEdit = true;
    }

    forkJoin(this.observables).subscribe(responseList => {
      this.courses = responseList[0] as Course[];

      if ( this.competitionId !== 0) {
        this.compEdit = responseList[1] as AddCompetition;
        this.displayCompetition();
      }

      this.toggleSpinner();
    });

  }
  displayCompetition() {
    this.title = "Edit competition";
  console.log(this.compEdit)
    this.competitionUpdateForm.patchValue({
      title: this.compEdit.title,
      description: this.compEdit.description,
      maxCandidates: this.compEdit.maxCandidates,
      endDate: this.compEdit.endDate,
      active: this.compEdit.active
    });

  }

  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }

  get f(): any {
    return this.competitionForm.controls;
  }

  get f1(): any {
    return this.competitionUpdateForm.controls;
  }


  onSubmit(){
    if(this.isEdit){
      this.updateCompetition();
    } else {
    this.addNewCompetition();
    }
  }
  addNewCompetition() {
    let d: Date = this.competitionForm.get("endDate").value;
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60);

    const newCompetition: AddCompetition = {
      id: 1, //default
      title: this.competitionForm.value.title,
      description: this.competitionForm.value.description,
      maxCandidates: this.competitionForm.value.maxCandidates,
      courseId: this.competitionForm.value.courseId,
      endDate: d,
      active: true
    };


    this.compService.addCompetition(newCompetition).subscribe(
      () => {
        this.toggleSpinner();
        this.openSnackBar("Success!", "New Comptition added!");
        this.router.navigate(["/competition"]);
      },
      err => {
        this.toggleSpinner();
        this.openSnackBar("Error!", err);
        console.log(err);
      }
    );

  }
  updateCompetition() {
    this.compEdit.title = this.competitionUpdateForm.value.title;
    this.compEdit.description = this.competitionUpdateForm.value.description;
    this.compEdit.maxCandidates = this.competitionUpdateForm.value.maxCandidates;
    this.compEdit.active = this.competitionUpdateForm.value.active;
    this.compEdit.endDate = this.competitionUpdateForm.value.endDate;



    this.compService.updateCompetition(this.compEdit).subscribe(
     () => {
      this.toggleSpinner();
       this.snackBar.open('Successfully updated competition !', 'Close', {
         duration: 3000
       });
       this.router.navigate(['/competition/details',this.competitionId]);
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
