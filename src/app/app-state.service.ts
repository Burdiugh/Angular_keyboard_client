import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatService } from './stat.servise';

interface StatState {
  errors: number;
  speed: number;
  occuracy: number;
}

const initialState: StatState = {
  errors: 0,
  speed: 0,
  occuracy: 0,
};

@Injectable({
  providedIn: 'root',
})
export class AppStateService extends StatService<StatState> {
  errors$: Observable<number> = this.select((state) => state.errors);
  speed$: Observable<number> = this.select((state) => state.speed);
  occuracy$: Observable<number> = this.select((state) => state.occuracy);

  constructor() {
    super(initialState);
  }

  addError() {
    this.setState({ errors: this.state.errors + 1 });
  }

  addSpeed(value: number) {
    this.setState({ speed: (this.state.speed = value) });
  }

  reset() {
    this.setState({ errors: 0, speed: 0, occuracy: 0 });
  }
}
