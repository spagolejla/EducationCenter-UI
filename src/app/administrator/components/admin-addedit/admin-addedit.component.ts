import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AdministratorService } from '../../services/administrator.service';
import { CustomValidators } from 'src/app/shared/helpers/custom-validators';
import { AddAdmin } from 'src/app/shared/models/addAdministrator';
import { UsernameValidator } from 'src/app/shared/helpers/username';

@Component({
  selector: 'app-admin-addedit',
  templateUrl: './admin-addedit.component.html',
  styleUrls: ['./admin-addedit.component.scss']
})
export class AdminAddeditComponent implements OnInit {

  title = 'Add new administrator';
  errors: string[] = null;

  basicInfoFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private adminService: AdministratorService,
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
      // tslint:disable-next-line:max-line-length
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

  }

  get f1(): any {
    return this.basicInfoFormGroup.controls;
  }

  onSubmit() {
    this.addNewEducator();
  }
  addNewEducator() {

    const newAdmin: AddAdmin = {
      firstName: this.basicInfoFormGroup.value.firstName,
      lastName: this.basicInfoFormGroup.value.lastName,
      email: this.basicInfoFormGroup.value.email,
      phone: this.basicInfoFormGroup.value.phone,
      username: this.basicInfoFormGroup.value.username,
      password: this.basicInfoFormGroup.value.password,
      avatarUrl: this.basicInfoFormGroup.value.avatarUrl
    };

    this.adminService.addAdmin(newAdmin).subscribe(
      () => {
        this.openSnackBar("Success!", "New Administrator added!");
        this.router.navigate(["/administrator"]);
      },
      err => {
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
