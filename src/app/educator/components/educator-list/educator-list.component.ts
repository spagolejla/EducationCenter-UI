import { Component, OnInit } from '@angular/core';
import { EducatorService } from '../../services/educator.service';
import { ActivatedRoute } from '@angular/router';
import { Educator } from 'src/app/shared/models/educator';
import { elementContainerStart } from '@angular/core/src/render3';

@Component({
  selector: 'app-educator-list',
  templateUrl: './educator-list.component.html',
  styleUrls: ['./educator-list.component.scss']
})
export class EducatorListComponent implements OnInit {

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredEducators = this.listFilter ? this.applyFilter(this.listFilter) : this.educators;
  }

  educators: Educator[];
  filteredEducators: Educator[] = [];

  constructor(private educatorService: EducatorService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getEducators();
  }

  getEducators(): void {
    this.educatorService.getEducators()
      .subscribe(edc => {
        this.educators = edc;
        this.filteredEducators = this.educators;
      }
      );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.toLocaleLowerCase();
    let result1: Educator[];
    result1 = this.educators.filter((educator: Educator) =>
    educator.firstName.toLocaleLowerCase().indexOf(filterValue) !== -1);

    let result2: Educator[];
    result2 = this.educators.filter((educator: Educator) =>
    educator.lastName.toLocaleLowerCase().indexOf(filterValue) !== -1);

    for (let obj of result2 ){
         result1.push(obj);
    }

    return result1;
  }
}

