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
  hideSpinner = false;
  title = "Add new administrator";
  errors: string[] = null;
  isEdit: boolean = false;
  adminId: number;
  adminEdit: EditAdmin;

  basicInfoFormGroup: FormGroup;
  editForm: FormGroup;

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
        confirmPassword: [null]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );


    this.editForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        phone: ["", Validators.required],
        // tslint:disable-next-line:max-line-length

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
        confirmPassword: [null],
        active: [null],

      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );

    if (this.adminId !== 0) {
      this.isEdit = true;
      this.getAdmin();
    } else {
      this.toggleSpinner();

    }
  }
  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }
  getAdmin() {
    this.adminService.getAdminById(this.adminId).subscribe(adm => {
      this.toggleSpinner();
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

    this.editForm.patchValue({
      firstName: this.adminEdit.firstName,
      lastName: this.adminEdit.lastName,
      email: this.adminEdit.email,
      phone: this.adminEdit.phone,
      password: this.adminEdit.password,
      avatarUrl: this.adminEdit.avatarUrl,
      active: this.adminEdit.active
    });
  }

  get f1(): any {
    return this.basicInfoFormGroup.controls;
  }

  onSubmit() {
    if (this.adminId !== 0) {
      this.updateAdmin();
    } else {
      this.addNewAdmin();
    }
  }
  updateAdmin() {
   this.adminEdit.firstName = this.editForm.value.firstName;
   this.adminEdit.lastName = this.editForm.value.lastName;
   this.adminEdit.email = this.editForm.value.email;
   this.adminEdit.phone = this.editForm.value.phone;
   this.adminEdit.password = this.editForm.value.password;
   this.adminEdit.avatarUrl = this.editForm.value.avatarUrl;
   this.adminEdit.active = this.editForm.value.active;


   this.adminService.updateAdmin(this.adminEdit).subscribe(
    () => {
      this.toggleSpinner();
      this.snackBar.open('Successfully updated Admin !', 'Close', {
        duration: 3000
      });
      this.router.navigate(['/administrator']);
    },
    err => {
      this.toggleSpinner();
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
        this.toggleSpinner();
        this.openSnackBar("Success!", "New Administrator added!");
        this.router.navigate(["/administrator"]);
      },
      err => {
        this.toggleSpinner();
        this.openSnackBar("Error!", err);
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
