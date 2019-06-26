import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/course/services/course.service';
import { EducatorService } from '../../services/educator.service';
import { AccountTypeService } from 'src/app/shared/services/account-type.service';
import { AccountType } from 'src/app/shared/models/accountType';
import { CourseField } from 'src/app/shared/models/courseField';
import { forkJoin } from 'rxjs';
import { CustomValidators } from 'src/app/shared/helpers/custom-validators';
import { AddEducator } from 'src/app/shared/models/addEducator';
import { UsernameValidator } from 'src/app/shared/helpers/username';

@Component({
  selector: 'app-educator-addedit',
  templateUrl: './educator-addedit.component.html',
  styleUrls: ['./educator-addedit.component.scss']
})
export class EducatorAddeditComponent implements OnInit {
  hideSpinner = false;

  title = 'Add new educator';
  errors: string[] = null;

  accTypes: AccountType[] = [];
  courseFields: CourseField[] = [];


  basicInfoFormGroup: FormGroup;
  advInfoFormGroup: FormGroup;

  observables: any = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private courseService: CourseService,
    private edcService: EducatorService,
    private accTypeService: AccountTypeService,
    public usernameValidator: UsernameValidator
  ) { }

  ngOnInit() {

    this.basicInfoFormGroup = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: [null, Validators.compose([
        Validators.email,
        Validators.required])
     ],
      phone: ["", Validators.required],
      title: ["", Validators.required],
      courseFieldId: [null, Validators.required]
    });

    this.advInfoFormGroup = this.fb.group({
      username: ['', Validators.compose([Validators.required]), this.usernameValidator.checkUsername.bind(this.usernameValidator)],
      avatarUrl: ["", Validators.required],
      password: [ null, Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8)])
     ],
     confirmPassword: [null, Validators.compose([Validators.required])]
  },
  {
     // check whether our password and confirm password match
     validator: CustomValidators.passwordMatchValidator
  });


    this.observables.push(this.courseService.getCourseFields());
    this.observables.push(this.accTypeService.getAccountTypes());

    forkJoin(this.observables).subscribe(responseList => {
      this.courseFields = responseList[0] as CourseField[];
      this.accTypes = responseList[1] as AccountType[];
      this.toggleSpinner();
    });

  }
  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }


  get f1(): any {
    return this.basicInfoFormGroup.controls;
  }

  get f2(): any {
    return this.advInfoFormGroup.controls;
  }

  onSubmit() {
    this.addNewEducator();
  }
  addNewEducator() {

    const newEducator: AddEducator = {
      firstName: this.basicInfoFormGroup.value.firstName,
      lastName: this.basicInfoFormGroup.value.lastName,
      email: this.basicInfoFormGroup.value.email,
      phone: this.basicInfoFormGroup.value.phone,
      title: this.basicInfoFormGroup.value.title,
      username: this.advInfoFormGroup.value.username,
      password: this.advInfoFormGroup.value.password,
      avatarUrl: this.advInfoFormGroup.value.avatarUrl,
      courseFieldId: this.basicInfoFormGroup.value.courseFieldId
    };

    this.edcService.addEducator(newEducator).subscribe(
      () => {
        this.toggleSpinner();
        this.openSnackBar("Success!", "New Educator added!");
        this.router.navigate(["/educator"]);
      },
      err => {
        this.toggleSpinner();
        this.openSnackBar(err, "Something bad has happened!");
        console.log(err);
      }
    );



  }
 openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}
