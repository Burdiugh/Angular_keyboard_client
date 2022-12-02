import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.css'],
})
export class ResetPasswordRequestComponent {
  resetPasswordRequestForm: FormGroup;
  flag: boolean;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.resetPasswordRequestForm = fb.group({
      email: ['', Validators.required],
    });
    this.flag = false;
  }

  sendPasswordRequest(): void {
    if (this.resetPasswordRequestForm.invalid) {
      alert('invalid data');
      return;
    }

    this.accountService
      .resetPasswordRequest(this.resetPasswordRequestForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.flag = true;
        },
        (error) => {
          let message = error.error.Message;
          alert(message);
          console.log(message);
        }
      );
  }
}
