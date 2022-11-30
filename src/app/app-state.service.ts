import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatService } from './stat.servise';

interface StatState {
  errors: number;
  speed: number;
  accuracy: number;
}

const initialState: StatState = {
  errors: 0,
  speed: 0,
  accuracy: 0,
};

@Injectable({
  providedIn: 'root',
})
export class AppStateService extends StatService<StatState> {
  errors$: Observable<number> = this.select((state) => state.errors);
  speed$: Observable<number> = this.select((state) => state.speed);
  accuracy$: Observable<number> = this.select((state) => state.accuracy);

  constructor() {
    super(initialState);
  }

  addError() {
    this.setState({ errors: this.state.errors + 1 });
  }

  setSpeed(value: number) {
    this.setState({ speed: (this.state.speed = value) });
  }

  setAccuracy(value: number){
    if(value>100) value = 100;
    this.setState({ accuracy: (this.state.accuracy = value) });
  }

  reset() {
    this.setState({ errors: 0, speed: 0, accuracy: 0 });
  }
}
