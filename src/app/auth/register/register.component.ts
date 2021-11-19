import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {User, UserInput} from '../../user/user';
import {UserService} from '../../user/user.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  newUser: UserInput;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('',[Validators.required])},
      [this.passwordConfirming]);
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  register() {
    this.newUser = {
      email: this.registerForm.get('email').value as string,
      password: this.registerForm.get('password').value as string
    };
    this.userService.createUser(this.newUser).subscribe((user: User) => {
      this.authService.user = user;
      this.authService.isLoggedIn = true;
      this.authService.setItemToStorage('token', user.accessToken.token).then(() => {
        this.router.navigate(['/user/user-info']).then();
      });
    });
  }

  private passwordConfirming(form: FormGroup): ValidationErrors {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({mismatch: {value: true}});
      return {mismatch: {value: true}};
    } else {
      form.get('confirmPassword').clearValidators();
      return null;
    }
  }
}
