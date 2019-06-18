import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Injectable()
export class UsernameValidator {

  debouncer: any;

  constructor(public userService: UserService){

  }

  checkUsername(control: FormControl): any {

    clearTimeout(this.debouncer);

    return new Promise(resolve => {

      this.debouncer = setTimeout(() => {

        this.userService.checkUsername(control.value).subscribe((res) => {
          if (res === false) {
            resolve(null);
          } else{
            resolve({'usernameInUse': true});

          }
        }, (err) => {
          console.log(err)
        });

      }, 1000);

    });
  }

}
