import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router, ActivatedRoute } from  '@angular/router';
import { AuthService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { User } from '../../models/user';
import { UsernameValidator } from '../../helpers/username';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hideSpinner = false;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  currentUser: User;


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              public usernameValidator: UsernameValidator,
              private _service: DataService
              ) { }

  ngOnInit() {
    this.authService.logged=false;
    this._service.isLoggedIn$=false;
    localStorage.removeItem('currentUser');
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.compose([Validators.required]), this.usernameValidator.checkUsernameExist.bind(this.usernameValidator)],
      password: ['', Validators.required]
  });
    this.toggleSpinner();
  }

  get f() { return this.loginForm.controls; }


  toggleSpinner() {
    this.hideSpinner ? (this.hideSpinner = false) : (this.hideSpinner = true);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    if (this.loginForm && this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;

      this.authService.login1(username, password).subscribe(usr => {
        this.authService.headerToggle();
        this.authService.logged=true;
        this.currentUser = usr;
        this.toggleSpinner();
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this._service.initUser();
        if(this.currentUser.accountTypeId === 1) {
          this.router.navigate(['/home']);
        } else if (this.currentUser.accountTypeId === 2) {
          this.router.navigate(['/educator/home']);
        } else {
          this.router.navigate(['/student/home']);
        }

        console.log(this.currentUser);
      },
      err => {
       // this.toggleSpinner();
        this.snackBar.open('Error: Incorrect password!', 'Close!');
        this.loginForm.get('password').reset();
        console.error(err);
      }

      );



  }
  }

  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}

