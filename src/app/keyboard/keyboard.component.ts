import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppStateService } from '../app-state.service';
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
  quoteId: number = 1;
  isInputBlocked: boolean = false;
  errors: number = 0;
  speed: number = 0;
  occuracy: number = 0;

  timeElapsed = 0;
  timeLeft: number = 15;
  timer = null;
  // interval: any;

  textInput = <HTMLInputElement>document.getElementById('textInput');

  constructor(
    public textService: TextService,
    private stateService: AppStateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setQuote(this.quoteId);
    this.initStats();
    this.textInput = <HTMLInputElement>document.getElementById('textInput');
  }

  setQuote(id: number) {
    this.textService.getTextById(id).subscribe((res) => {
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

    this.stateService.occuracy$.subscribe((occuracy) => {
      this.occuracy = occuracy;
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
      finishGame();
    }
  }

  startGame() {
    this.resetRound();

    // clear old and start a new timer
    clearInterval(this.timer);
    this.timer = setInterval(updateTimer, 1000);
  }

  //  startTimer() {
  //     this.interval = setInterval(() => {
  //       if (this.timeLeft > 0) {
  //         this.timeLeft--;
  //       } else {
  //         this.timeLeft = 5;
  //       }
  //     }, 1000);
  //   }

  // pauseTimer() {
  //   clearInterval(this.interval);
  // }

  nextQuote() {
    this.quoteId++;
    this.setQuote(this.quoteId);
    this.inputValue = '';
    this.textInput.value = '';
    this.index = 0;
  }

  resetRound() {
    alert('time has gone');
    // this.pauseTimer();
    //this.timeLeft = 15;

    setTimeout(() => {
      this.stateService.reset();
      this.quoteId = 1;
      this.setQuote(this.quoteId);
      this.inputValue = '';
      this.textInput.value = '';
      this.index = 0;
    }, 1000);
  }

  onKey(event: any) {
    console.log(event.target.value[event.target.value.length - 1]);
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
    this.stateService.addSpeed(
      Math.round((this.inputValue.length / this.timeElapsed) * 60)
    );
  }
}
