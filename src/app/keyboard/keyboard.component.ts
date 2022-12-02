import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { AccountService } from '../account/account.service';
import { AppStateService } from '../app-state.service';
import { IScore } from '../score/IScore';
import { ScoreService } from '../score/score.service';
import { TextService } from '../text-service/text.service';
import { IText } from '../text-service/textInterface';


@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
})
export class KeyboardComponent implements OnInit {
  key: string | null = null;
  followingText?: IText;
  followingChars: string[] = [];
  index: number = 0;
  inputValue: string = '';
  quoteId: number = 3;
  isInputBlocked: boolean = false;
  symbolsCount : number = 0;
  errors: number = 0;
  speed: number = 0;
  accuracy: number = 0;
  isGameStarted : boolean = false;
  score:number =0;

  timeElapsed = 0;
  timeLeft: number = 60;
  timer = null;
  
   interval: any;

  textInput = <HTMLInputElement>document.getElementById('textInput');

  constructor(
    public textService: TextService,
    private stateService: AppStateService,
    private cdr: ChangeDetectorRef,
    private accountService: AccountService,
    private scoreService:ScoreService,
  ) {}

  ngOnInit(): void {
    this.setQuote(this.quoteId);
    this.initStats();
    this.textInput = <HTMLInputElement>document.getElementById('textInput');
  }

  

  setQuote(id: number) {
    this.textService.getTextById(id).subscribe((res) => {
      console.log(res);
      this.followingText = res;
      this.followingChars = Array.from(this.followingText.text);
    });
  }

  initStats() {
    this.stateService.errors$.subscribe((errors) => {
      this.errors = errors;
      this.cdr.markForCheck();
    });

    this.stateService.speed$.subscribe((speed) => {
      this.speed = speed;
      this.cdr.markForCheck();
    });

    this.stateService.accuracy$.subscribe((accuracy) => {
      this.accuracy = accuracy;
      this.cdr.markForCheck();
    });
  }

  updateTimer() {
    if (this.timeLeft > 0) {
      // decrease the current time left
      this.timeLeft--;

      // increase the time elapsed
      this.timeElapsed++;

      // update the timer text
      this.timeLeft + 's';
    } else {
      // finish the game
      this.finishGame();
    }
  }

  finishGame(){
    alert("time has gone!");
    var score = this.sumScore();
   // console.log(this.sumScore());
   // console.log(score);
    
    
    if(score!=null){
      //console.log("score accuracy: "+score.accuracy);
      //console.log(score);
      
     this.scoreService.addScore(score).subscribe(()=>{
      //console.log("Score: "+ score+"\n\nwas succesffully aded.");
     },
     (error) => {
      let message = error.error.Message;
      console.log(error);
      console.log(message);
    });
    }
    this.isGameStarted = false;
    this.pauseTimer();
    this.resetRound();
  }


   startTimer() {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.timeElapsed++;
        } else {
          this.finishGame();
          this.timeLeft = 60;
          this.timeElapsed = 0;
        }
      }, 1000);
    }

  pauseTimer() {
    clearInterval(this.interval);
  }

  nextQuote() {
   
    this.quoteId++;
    this.setQuote(this.quoteId);
    this.inputValue = '';
    this.textInput.value = '';
    this.index = 0;
 

  }

  sumScore(){
    this.score = this.accuracy+(this.speed - this.errors);
    let id = this.accountService.getIdOfLoginedUser();
      
    if(id!=null){
   var newScore:IScore={
       appUserId:id,
       score:this.score,
       errors:this.errors,
       accuracy:this.accuracy,
       speed:this.speed
    }
    return newScore;
  }
  else{
    return null;
  }
  }

  resetRound() {
   
    setTimeout(() => {
      this.stateService.reset();
      this.quoteId = 3;
      this.setQuote(this.quoteId);
      this.inputValue = '';
      this.textInput.value = '';
      this.index = 0;
      this.symbolsCount = 0;
    }, 1000);
  }

  onKey(event: any) {
      this.symbolsCount++;
      if(!this.isGameStarted){
        this.startTimer();
        this.isGameStarted = true;
      }

    if (this.inputValue.length == this.followingChars.length - 1) {
      this.nextQuote();
    } else {
      if (
        event.target.value[event.target.value.length - 1] ==
        this.followingChars[this.index]
      ) {
        this.index++;
      } else {
        this.isInputBlocked = true;
        setTimeout(() => {
          this.isInputBlocked = false;
          this.textInput.value = this.textInput.value.slice(0, -1);
        }, 250);
        this.stateService.addError();
      }
    }
    this.stateService.setSpeed(
      Math.round((this.symbolsCount / this.timeElapsed) * 60)
    );

    let correctCharacters = (this.symbolsCount - this.errors);
    let accuracyVal = ((correctCharacters / this.symbolsCount) * 100);
    this.stateService.setAccuracy(Math.round(accuracyVal));

    
  }
}
