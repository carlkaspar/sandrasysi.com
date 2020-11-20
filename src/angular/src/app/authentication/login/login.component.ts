import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../_services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  isLoggedIn = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });



  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  login() {

    this.loginService.login(this.loginForm.value).subscribe(
      response =>{
        console.log(response);
        localStorage.setItem("token", response.jwt);
        this.isLoggedIn = true;
        this.router.navigate(['/digitaal'])
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    )
  }

}
