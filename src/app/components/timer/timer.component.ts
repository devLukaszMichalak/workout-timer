import {Component, OnDestroy, OnInit} from '@angular/core';
import { faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  resetValue:  number = 45;
  seconds: number = this.resetValue;

  faGear = faGear;

  private intervalId: any;

  ngOnInit(): void {
    this.startTimer();
  }

  resetTimer(): void {
    if (this.seconds !== 0){
      this.seconds = this.resetValue;
    } else {
      this.seconds = this.resetValue;
      clearInterval(this.intervalId);
      this.startTimer();
    }

  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private startTimer(): void {
    this.intervalId = setInterval(() => {
      this.seconds -= 0.025;
      if (this.seconds === 0) {
        clearInterval(this.intervalId);
      }
    }, 25);
  }

  getTimerRingValue(): string {
    return `--value:${100 / this.resetValue * this.seconds};--size:18rem;`
  }

  setResetValue(value: any): void {
    this.resetValue = value;
    this.resetTimer();
  }

  getRoundedSeconds(): number {
    return Math.floor(this.seconds);
  }
}
