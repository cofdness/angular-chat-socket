import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  message: string | undefined;
  errorStatus: number | undefined;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.message = this.getMessage();
  }

  getMessage(): string {
    return `Logged ${this.authService.isLoggedIn ? 'in' : 'out'}`;
  }

  login(): void {
    this.message = 'Try to log in ...';

    // this.authService.login(this.email?.value, this.password?.value).subscribe(() => {
    //   this.message = this.getMessage();
    //   if (this.authService.isLoggedIn) {
    //     const navigationExtras: NavigationExtras = {
    //       queryParamsHandling: 'preserve',
    //       preserveFragment: true
    //     };
    //     const redirectUrl = this.authService.redirectUrl;
    //     if (redirectUrl) {
    //       this.router.navigate([redirectUrl], navigationExtras).then();
    //     }
    //     // fix the error redirect if redirectUrl = null
    //     else {
    //       this.router.navigate(['/admin'], navigationExtras).then();
    //     }
    //   }
    // }, error => {
    //   this.errorStatus = this.authService.handleError(error).status;
    // });
    this.authService.login(this.email?.value, this.password?.value);
  }

  logout(): void {
    this.authService.logout();
    this.message = this.getMessage();
  }

  get email(): AbstractControl | null | undefined {
    return this.loginFormGroup?.get('email');
  }

  get password(): AbstractControl | null | undefined {
    return  this.loginFormGroup?.get('password');
  }

}
