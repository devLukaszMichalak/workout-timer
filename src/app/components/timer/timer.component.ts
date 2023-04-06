import {Component, OnDestroy, OnInit} from '@angular/core';
import {faGear} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  resetValue: number = 45000;
  milliseconds: number = this.resetValue;

  faGear = faGear;

  private intervalId: any;

  ngOnInit(): void {
    this.startTimer();
  }

  resetTimer(): void {
    if (this.milliseconds !== 0) {
      this.milliseconds = this.resetValue;
    } else {
      this.milliseconds = this.resetValue;
      clearInterval(this.intervalId);
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private startTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.milliseconds === 0) {
        clearInterval(this.intervalId);
      } else {
        this.milliseconds -= 25;
      }
    }, 25);
  }

  getTimerRingValue(): string {
    return `--value:${100 / this.resetValue * this.milliseconds};--size:18rem;`
  }

  setResetValue(value: any): void {
    this.resetValue = value * 1000;
    this.resetTimer();
  }

  getRoundedSeconds(): string {
    return `${Math.floor(this.milliseconds / 1000)}.${Math.floor((this.milliseconds % 1000) / 100)}`;
  }

  isWindowLandscape() {
    return window.innerHeight < window.innerWidth;
  }
}
