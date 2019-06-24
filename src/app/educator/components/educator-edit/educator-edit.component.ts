import { Component, OnInit } from "@angular/core";
import { CourseField } from "src/app/shared/models/courseField";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { EditEducator } from "src/app/shared/models/editEducator";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomValidators } from 'src/app/shared/helpers/custom-validators';
import { EducatorService } from '../../services/educator.service';

@Component({
  selector: "app-educator-edit",
  templateUrl: "./educator-edit.component.html",
  styleUrls: ["./educator-edit.component.scss"]
})
export class EducatorEditComponent implements OnInit {
  title: string = "Edit educator";
  educatorId: number;
  errors: string[] = null;
  editEducator: EditEducator;

  observables: any = [];

  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private edcService: EducatorService
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.educatorId = +params.get("id");
    });

    this.editForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        phone: ["", Validators.required],
        title: ["", Validators.required],

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
        active: [null]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );

    this.getEducator();
  }

  getEducator() {
    this.edcService.getEducatorByIdEdit(this.educatorId).subscribe(edc => {
      this.editEducator = edc;
      console.log('Educator', this.editEducator);
      this.displayEducator();
    });
  }
  displayEducator() {
    if (this.editForm) {
      this.editForm.reset();
    }

    this.editForm.patchValue({
      firstName: this.editEducator.firstName,
      lastName: this.editEducator.lastName,
      email: this.editEducator.email,
      phone: this.editEducator.phone,
      title: this.editEducator.title,
      password: this.editEducator.password,
      avatarUrl: this.editEducator.avatarUrl,
      active: this.editEducator.active
    });
  }

  get f1(): any {
    return this.editForm.controls;
  }

  onSubmit() {

      this.updateEducator();

  }
  updateEducator() {
   this.editEducator.firstName = this.editForm.value.firstName;
   this.editEducator.lastName = this.editForm.value.lastName;
   this.editEducator.email = this.editForm.value.email;
   this.editEducator.phone = this.editForm.value.phone;
   this.editEducator.title = this.editForm.value.title;
   this.editEducator.password = this.editForm.value.password;
   this.editEducator.avatarUrl = this.editForm.value.avatarUrl;
   this.editEducator.active = this.editForm.value.active;


   this.edcService.updateEducator(this.editEducator).subscribe(
    () => {
      this.snackBar.open('Successfully updated educator !', 'Close', {
        duration: 3000
      });
      this.router.navigate(['/educator/details', this.educatorId]);
    },
    err => {
      this.snackBar.open(err, 'Close');
      console.error(err);
    }
  );
  }
}
