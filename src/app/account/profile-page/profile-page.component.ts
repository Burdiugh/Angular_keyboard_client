
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { IToken } from '../acc_interfaces';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  decodedToken: IToken | null;

  constructor(private accountService: AccountService) {
    this.decodedToken = this.accountService.getDecodedAccessToken();

   }


}
