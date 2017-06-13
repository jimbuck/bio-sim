import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'BioSimApp',
  template:
  `<div>
    <h2>Hi JimmyBoh, welcome to {{name}} Angular 2!</h2>
    <p>The time is {{time}}.</p>
    <div class="dropdown">
      <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
        Dropdown
        <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a href="javascript: void(0);">Action</a></li>
        <li><a href="javascript: void(0);">Another action</a></li>
        <li><a href="javascript: void(0);">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a href="javascript: void(0);">Separated link</a></li>
      </ul>
    </div>
  </div>`
})
export class AppComponent implements OnInit {
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