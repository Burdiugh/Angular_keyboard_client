
import { Component, OnInit } from '@angular/core';
import { IScore } from 'src/app/score/IScore';
import { ScoreService } from 'src/app/score/score.service';
import { AccountService } from '../account.service';
import { IToken } from '../acc_interfaces';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  decodedToken: IToken | null;
   id:string = "";
   scores:IScore[] = [];
 

  constructor(private accountService: AccountService,
    private scoreService:ScoreService) {
    this.decodedToken = this.accountService.getDecodedAccessToken();
    
      console.log(this.decodedToken);
      
   }
  ngOnInit(): void {
    this.scoreService.getAllByUserId(this.decodedToken?.nameid!).subscribe((res) => {
      this.scores = res;
      console.log(res);
      
    });
  }

   

   showScores(){

   }

}
