import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { serverUri } from '../../config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  errorStatus: number | undefined;

  constructor(
    public authService: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    //implement deeplink login call from web mobile to app
    // this.route.params.subscribe((params) => {
    //   const accessToken = params.access_token;
    //   if (accessToken) {
    //     this.authService.logout().then(() => {
    //       this.authService.setItemToStorage('token', accessToken).then(() => {
    //         this.userService.getCurrentUser().subscribe(() => {
    //           this.redirectAfterLoginSuccess();
    //         });
    //       });
    //     });
    //   }
    // });

    // this.route.queryParams.subscribe((params) => {
    //   if (params.access_token) {
    //     this.authService.logout().then(() => {
    //       this.authService
    //         .setItemToStorage('token', params.access_token)
    //         .then(() => {
    //           this.userService.getCurrentUser().subscribe((user) => {
    //             if (
    //               this.platform.is('mobileweb')
    //               // || this.platform.is('desktop')
    //             ) {
    //               // eslint-disable-next-line @typescript-eslint/naming-convention
    //               this.deepLinkService.deeplink({
    //                 access_token: params.access_token,
    //               });
    //             } else {
    //               this.redirectAfterLoginSuccess();
    //             }
    //           });
    //         });
    //     });
    //   }
    // });
  }

  login(): void {
    this.authService.login(this.email?.value, this.password?.value).subscribe({
      next: (user) => {
        this.redirectAfterLoginSuccess();
      },
      error: (error) => {
        this.errorStatus = this.authService.handleError(error).status;
      }
    });
  }

  redirectAfterLoginSuccess(): void {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true,
    };
    const redirectUrl = this.authService.redirectUrl;
    if (redirectUrl) {
      this.router.navigate([redirectUrl], navigationExtras).then();
    }
    // fix the error redirect if redirectUrl = null
    else {
      this.router.navigate(['/user/user-info'], navigationExtras).then();
    }
  }

  get email(): AbstractControl | null | undefined {
    return this.loginFormGroup?.get('email');
  }

  get password(): AbstractControl | null | undefined {
    return this.loginFormGroup?.get('password');
  }

  getServerUri(service: string): string {
    return `${serverUri}/auth/${service}`;
  }
}
