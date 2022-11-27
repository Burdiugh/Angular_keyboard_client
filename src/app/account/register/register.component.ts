import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  hide = true;
  registerForm: FormGroup;

  constructor(private accountService: AccountService,
    private fb: FormBuilder,
     private snackBar: MatSnackBar,
     private router: Router
     ) {
   this.registerForm = fb.group({
     email: ['', Validators.required],
     password: ['', Validators.required]
   });
 }

 register() {
   console.log("Registration...");

   if (this.registerForm.invalid) {
     this.openSnackBar("Invalid data!");
     return;
   }

   this.accountService.register(this.registerForm.value).subscribe(res => {
     console.log(res);
     this.router.navigate(["/account/login"]);
   },
   error=>{
     let message = error.error.Message;
     console.log(error);
     
     this.openSnackBar(message);
   }
   
   );
 }

 openSnackBar(message: string) {
   this.snackBar.open(message, "OK", {
     duration: 5 * 1000, // 5 sec
   });
 }
}



