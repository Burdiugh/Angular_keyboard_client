import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { IResetPassword, IToken } from '../acc_interfaces';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string | null = null;
  email: string | null = null;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.resetPasswordForm = fb.group({
      newPassword: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      this.token = params['token'];
      this.email = params['email'];
    });
  }

  resetPassword(): void {
    if (
      this.resetPasswordForm.invalid ||
      this.token == null ||
      this.email == null
    ) {
      alert('invalid data');
      return;
    }

    let passwordResetObj: IResetPassword = {
      email: this.email,
      newPassword: this.resetPasswordForm.value.newPassword,
      token: this.token,
    };

    console.log(passwordResetObj);

    this.accountService.resetPassword(passwordResetObj).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        let message = error.error.Message;
        alert(message);
        console.log(message);
      }
    );
  }
}
