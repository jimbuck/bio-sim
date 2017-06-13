import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bio-sim-app',
  templateUrl: 'app.component.html'
})
export class BioSimAppComponent implements OnInit {
  public readonly name = 'electron-forge';

  public time: string;

  public ngOnInit(): void {
    console.log('Component initialized');
    setInterval(() => this._updateTime(), 1000);
    this._updateTime();
  }

  private _updateTime(): void {
    this.time = (new Date()).toLocaleTimeString();
  }
}