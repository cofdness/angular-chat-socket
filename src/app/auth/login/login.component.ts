import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {UserService} from "../../user/user.service";

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
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.route.queryParams.subscribe(params => {
      if (params.access_token) {
        localStorage.setItem('token', params.access_token);
        this.userService.getUser().subscribe((user) => {
          if (this.authService.isLoggedIn) {
            this.redirectAfterLoginSuccess();
          }
        });
      }
    });
  }

  login(): void {
    this.authService.login(this.email?.value, this.password?.value).subscribe(() => {
      if (this.authService.isLoggedIn) {
        this.redirectAfterLoginSuccess();
      }
    }, error => {
      this.errorStatus = this.authService.handleError(error).status;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  redirectAfterLoginSuccess(): void {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };
    const redirectUrl = this.authService.redirectUrl;
    if (redirectUrl) {
      this.router.navigate([redirectUrl], navigationExtras).then();
    }
    // fix the error redirect if redirectUrl = null
    else {
      this.router.navigate(['/user'], navigationExtras).then();
    }
  }

  get email(): AbstractControl | null | undefined {
    return this.loginFormGroup?.get('email');
  }

  get password(): AbstractControl | null | undefined {
    return  this.loginFormGroup?.get('password');
  }

}
