import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/shared/models/student';
import { StudentService } from '../../services/student.service';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  hideSpinner = false;

  students: Student[];
  displayedColumns: string[] = ['Firstname', 'Lastname', 'Email', 'Phone', 'Active', 'Action'];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private route: ActivatedRoute, private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }
  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }
  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(student => {
        this.toggleSpinner();
        this.students = student;
        this.dataSource = new MatTableDataSource(this.students);

      }
      );
  }

}
