import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../account/account.service';
import { IToken } from '../account/acc_interfaces';
import { IUser } from '../Interfaces/IUser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(
    private accountService: AccountService,
    private jwtHelper: JwtHelperService
  ) {}
}
