import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { AdministratorService } from "../../services/administrator.service";
import { CustomValidators } from "src/app/shared/helpers/custom-validators";
import { AddAdmin } from "src/app/shared/models/addAdministrator";
import { UsernameValidator } from "src/app/shared/helpers/username";
import { EditAdmin } from "src/app/shared/models/editAdmin";

@Component({
  selector: "app-admin-addedit",
  templateUrl: "./admin-addedit.component.html",
  styleUrls: ["./admin-addedit.component.scss"]
})
export class AdminAddeditComponent implements OnInit {
  title = "Add new administrator";
  errors: string[] = null;

  isEdit: boolean;
  adminId: number;
  adminEdit: EditAdmin;

  basicInfoFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdministratorService,
    public usernameValidator: UsernameValidator
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.adminId = +params.get("id");
    });

    this.basicInfoFormGroup = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        phone: ["", Validators.required],
        // tslint:disable-next-line:max-line-length
        username: [
          "",
          Validators.compose([Validators.required]),
          this.usernameValidator.checkUsername.bind(this.usernameValidator)
        ],
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
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );

    if (this.adminId !== 0) {
      this.getAdmin();
    }
  }
  getAdmin() {
    this.adminService.getAdminById(this.adminId).subscribe(adm => {
      this.adminEdit = adm;
      console.log(this.adminEdit);
      this.displayAdmin();
    });
  }
  displayAdmin() {
    if (this.basicInfoFormGroup) {
      this.basicInfoFormGroup.reset();
    }
    this.title = "Edit Administrator";

    this.basicInfoFormGroup.patchValue({
      firstName: this.adminEdit.firstName,
      lastName: this.adminEdit.lastName,
      email: this.adminEdit.email,
      phone: this.adminEdit.phone,
      username: this.adminEdit.username,
      password: this.adminEdit.password,
      avatarUrl: this.adminEdit.avatarUrl
    });
  }

  get f1(): any {
    return this.basicInfoFormGroup.controls;
  }

  onSubmit() {
    if (this.basicInfoFormGroup.invalid || this.basicInfoFormGroup.untouched) {
      return;
    }
    if (this.adminId !== 0) {
      this.updateAdmin();
    } else {
      this.addNewAdmin();
    }
  }
  updateAdmin() {
   this.adminEdit.firstName = this.basicInfoFormGroup.value.firstName;
   this.adminEdit.lastName = this.basicInfoFormGroup.value.lastName;
   this.adminEdit.email = this.basicInfoFormGroup.value.email;
   this.adminEdit.phone = this.basicInfoFormGroup.value.phone;
   this.adminEdit.username = this.basicInfoFormGroup.value.username;
   this.adminEdit.password = this.basicInfoFormGroup.value.password;
   this.adminEdit.avatarUrl = this.basicInfoFormGroup.value.avatarUrl;

   this.adminService.updateAdmin(this.adminEdit).subscribe(
    () => {
      this.snackBar.open('Successfully updated admint !', 'Close', {
        duration: 3000
      });
      this.router.navigate(['/administrator']);
    },
    err => {
      this.snackBar.open(err, 'Close');
      console.error(err);
    }
  );

  }
  addNewAdmin() {
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
