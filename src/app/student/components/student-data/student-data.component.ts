import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Student } from 'src/app/shared/models/student';
import { forkJoin } from 'rxjs';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.scss']
})
export class StudentDataComponent implements OnInit {
  hideSpinner = false;

  student: Student;
  studentId: number;
  formShowed: boolean = false;

  observables: any = [];
  displayedColumns: string[] = [ 'Course', 'Date', 'Amount'];
  dataSource;
  descriptionForm = new FormGroup({
    description: new FormControl(null, [Validators.required]),
  });
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private studentService: StudentService,
    private _service: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {


    this.observables.push(this.studentService.getStudentById(this._service.currentUser.userId));


    forkJoin(this.observables).subscribe(responseList => {
      this.student = responseList[0] as Student;
      this.dataSource = new MatTableDataSource(this.student.payments);
      
      this.toggleSpinner();

    });
  }

  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }
  showForm(){
    this.descriptionForm.patchValue({
      description: this.student.description
    });
    this.formShowed = true;
  }
  hideForm(){

    this.formShowed = false;
  }
  get f() {
    return this.descriptionForm.controls;
  }

  onSubmit() {
    this.student.description = this.descriptionForm.value.description;

    this.studentService.upatedStudentDescription(this.student).subscribe(
      () => {
        this.toggleSpinner();
        this.openSnackBar("Success!", "Description is successfully updated!");
        this.router.navigate(["/student/home"]);
      },
      err => {
        this.toggleSpinner();
        this.openSnackBar(err, "Something bad has happened!");
        console.log(err);
      }
    );

  }
  getTotal() {
    return this.student.payments.map(p => p.amount).reduce(( acc, value ) => acc + value, 0);
  }
  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}
