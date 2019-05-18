import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Student } from "src/app/shared/models/student";
import { StudentService } from "src/app/student/services/student.service";
import { CourseService } from "src/app/course/services/course.service";
import { Course } from "src/app/shared/models/course";
import { AddPayment } from "src/app/shared/models/addPayment";
import { PaymentService } from "../../services/payment.service";
import { MatSnackBar } from "@angular/material";
import { EditPayment } from "src/app/shared/models/editPayment";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-payment-add-edit",
  templateUrl: "./payment-add-edit.component.html",
  styleUrls: ["./payment-add-edit.component.scss"]
})
export class PaymentAddEditComponent implements OnInit {
  pageTitle = "Add Payment";
  paymentId: number;
  students: Student[];
  courses: Course[];
  editPayment: EditPayment;

  observables: any = [];

  paymentForm = new FormGroup({
    studentId: new FormControl(null, [Validators.required]),
    courseId: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private studentService: StudentService,
    private courseService: CourseService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.paymentId = +params.get("id");
    });

    this.observables.push(this.studentService.getStudents());
    this.observables.push(this.courseService.getCourses());
    if (this.isEdit) {
      this.observables.push(this.paymentService.getPaymentById(this.paymentId));
    }

    forkJoin(this.observables).subscribe(responseList => {
      this.students = responseList[0] as Student[];
      this.courses = responseList[1] as Course[];
      if (this.isEdit) {
        this.editPayment = responseList[2] as EditPayment;
        this.displayPayment();
      }
    });
  }

  get f(): any {
    return this.paymentForm.controls;
  }
  get isEdit(): boolean {
    if (this.paymentId === 0) {
      return false;
    } else {
      return true;
    }
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(student => {
      this.students = student;
    });
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(course => {
      this.courses = course;
    });
  }

  displayPayment(): void {
    if (this.paymentForm) {
      this.paymentForm.reset();
    }
    this.pageTitle = "Edit Entry";

    this.paymentForm.patchValue({
      studentId: this.editPayment.studentId,
      courseId: this.editPayment.courseId,
      amount: this.editPayment.amount,
      date: this.editPayment.date
    });
  }

  onSubmit() {
    if (this.paymentForm.invalid || this.paymentForm.untouched) {
      return;
    }
    //this.toggleSpinner();
    if (!this.isEdit) {
      this.addNewPayment();
    } else {
      this.updatePayment();
    }
  }
  updatePayment() {
    this.editPayment.studentId = this.paymentForm.get("studentId").value;
    this.editPayment.courseId = this.paymentForm.get("courseId").value;
    this.editPayment.amount = this.paymentForm.get("amount").value;
    this.editPayment.date = this.paymentForm.get("date").value;

    this.paymentService.updatePayment(this.editPayment).subscribe(
      () => {
        this.snackBar.open("Successfully updated the payment !", "Close", {
          duration: 3000
        });
      },
      err => {
        this.snackBar.open(err, "Close");
        console.error(err);
      }
    );
  }

  addNewPayment() {
    const newPayment: AddPayment = {
      studentId: this.paymentForm.value.studentId,
      courseId: this.paymentForm.value.courseId,
      date: this.paymentForm.value.date,
      amount: this.paymentForm.value.amount
    };

    this.paymentService.addPayment(newPayment).subscribe(
      () => {
        this.openSnackBar("Success!", "New Payment added!");
        this.router.navigate(["/payment"]);
      },
      err => console.log(err)
    );
  }

  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}
