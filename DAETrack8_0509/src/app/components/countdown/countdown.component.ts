import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {
  remainingTime: string = '00:10';
  private intervalId: any;

  @Output() timerFinished = new EventEmitter<void>();

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    let totalSeconds = 60;

    this.updateTimeDisplay(totalSeconds);

    this.intervalId = setInterval(() => {
      totalSeconds--;
      this.updateTimeDisplay(totalSeconds);

      if (totalSeconds <= 0) {
        clearInterval(this.intervalId);
        this.timerFinished.emit();
      }
    }, 1000);
  }

  updateTimeDisplay(totalSeconds: number): void {
    const seconds = totalSeconds % 60;

    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds.toString();

    this.remainingTime = `${formattedSeconds}`;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
