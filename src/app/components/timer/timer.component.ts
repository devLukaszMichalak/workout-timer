import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  seconds: number = 45;

  private intervalId: any;

  ngOnInit(): void {
    this.startTimer(this.seconds);
  }

  resetTimer() {
    const resetValue = 45;
    if (this.seconds !== 0){
      this.seconds = resetValue;
    } else {
      this.seconds = resetValue;
      clearInterval(this.intervalId);
      this.startTimer(resetValue);
    }

  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private startTimer(seconds: number): void {
    this.intervalId = setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  getTimerValue() {
    return `--value:${100 / 45 * this.seconds};--size:18rem;`
  }
}
