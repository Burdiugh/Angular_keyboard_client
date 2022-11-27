import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { AccountService } from '../account/account.service';
import { IToken } from '../account/acc_interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  decodedToken: IToken | null;

  constructor(public accountService: AccountService) {
    this.decodedToken = accountService.getDecodedAccessToken();
  }

  logout(): void {
    this.accountService.logout();
  }
}
