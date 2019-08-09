import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router, ActivatedRoute } from  '@angular/router';



import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';
import { UsernameValidator } from 'src/app/shared/helpers/username';
import { AuthService } from 'src/app/shared/services/authentication.service';
import { CustomValidators } from 'src/app/shared/helpers/custom-validators';
import { StudentRegistration } from 'src/app/shared/models/studentRegistration';
import { StudentService } from '../../services/student.service';


@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {
  basicInfoFormGroup: FormGroup;
  advInfoFormGroup: FormGroup;
  hideSpinner = false;
  constructor(
      private router: Router,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private authService: AuthService,
      private snackBar: MatSnackBar,
      public usernameValidator: UsernameValidator,
      private _service: DataService,
      private studentService: StudentService

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
      description: ["", Validators.required],
      birthdate: [null, Validators.required]
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
  this.toggleSpinner();
  }

  get f1(): any {
    return this.basicInfoFormGroup.controls;
  }

  get f2(): any {
    return this.advInfoFormGroup.controls;
  }

  onSubmit() {

    let d: Date = this.basicInfoFormGroup.get("birthdate").value;
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60);

    const newStudent: StudentRegistration = {
      id: 1, //def
      firstName: this.basicInfoFormGroup.value.firstName,
      lastName: this.basicInfoFormGroup.value.lastName,
      email: this.basicInfoFormGroup.value.email,
      phone: this.basicInfoFormGroup.value.phone,
      birthDate: d,
      username: this.advInfoFormGroup.value.username,
      password: this.advInfoFormGroup.value.password,
      avatarUrl: this.advInfoFormGroup.value.avatarUrl,
      description: this.basicInfoFormGroup.value.description,
      active: true

    };

    this.studentService.addStudent(newStudent).subscribe(
      () => {
        this.toggleSpinner();
        this.openSnackBar("Success!", "You are now registred!");

        const username = newStudent.username;
        const password = newStudent.password;

        this.authService.login1(username, password).subscribe(usr => {
          this.authService.headerToggle();
          this.authService.logged=true;

          this.toggleSpinner();
          localStorage.setItem('currentUser', JSON.stringify(usr));
          this._service.initUser();

            this.router.navigate(['/student/home']);


          
        },
        err => {
          this.toggleSpinner();
          this.snackBar.open('Error: Incorrect password!', 'Close!');

          console.error(err);
        }

        );





      },
      err => {
        this.toggleSpinner();
        this.openSnackBar(err, "Something bad has happened!");
        console.log(err);
      }
    );

  }
  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }
  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}
