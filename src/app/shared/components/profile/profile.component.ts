import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomValidators } from "../../helpers/custom-validators";
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  hideSpinner = false;
  editForm: FormGroup;
  editUser: User = new User;

  constructor(
    private _service: DataService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.editForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        phone: ["", Validators.required],

        avatarUrl: ["", Validators.required],
        password: [
          null,
          Validators.compose([
            Validators.required,
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );

    this.editForm.patchValue({
      firstName: this._service.currentUser.firstName,
      lastName: this._service.currentUser.lastName,
      email: this._service.currentUser.email,
      phone: this._service.currentUser.phone,
      password: this._service.currentUser.password,
      avatarUrl: this._service.currentUser.avatarUrl
    });
  }
  get f1(): any {
    return this.editForm.controls;
  }

  toggleSpinner() {
    this.hideSpinner ? (this.hideSpinner = false) : (this.hideSpinner = true);
  }

  onSubmit() {
    // this.currentUser = usr;
    // this.toggleSpinner();
    // localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    // this._service.initUser();
    if ( this.editForm.invalid){
      return;
    }

    this.editUser.firstName = this.editForm.value.firstName;
    this.editUser.lastName = this.editForm.value.lastName;
    this.editUser.email = this.editForm.value.email;
    this.editUser.phone = this.editForm.value.phone;
    this.editUser.password = this.editForm.value.password;
    this.editUser.avatarUrl = this.editForm.value.avatarUrl;
    this.editUser.username = this._service.currentUser.username;
    this.editUser.userId = this._service.currentUser.userId;
    this.editUser.accountTypeId = this._service.currentUser.accountTypeId;
    this.editUser.accountType = this._service.currentUser.accountType;
    this.editUser.userAccountId = this._service.currentUser.userAccountId;



    this.userService.updateUser(this.editUser).subscribe(
      () => {
        this.toggleSpinner();
        this.snackBar.open("Successfully updated profile !", "Close", {
          duration: 3000
        });
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(this.editUser));
        this._service.initUser();
        this.router.navigate(["/profile"]);
      },
      err => {
        this.toggleSpinner();
        this.snackBar.open(err, "Close");
        console.error(err);
      }
    );
  }
}
