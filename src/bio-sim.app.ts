import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { WorldBuilderComponent } from './world-builder/world-builder.component';

@Component({
  selector: 'bio-sim',
  template: `
  <h1>BioSim</h1>
  <nav>
    <a [routerLink]="['/']">Dashboard</a>
    <a [routerLink]="['/world-builder']">World Builder</a>
  </nav>
  <router-outlet></router-outlet>`
})
@Routes([
  {path: '/', component: DashboardComponent},
  {path: '/world-builder', component: WorldBuilderComponent}
])
export class BioSimApp implements OnInit {
  
  constructor(private router: Router){}
  
  ngOnInit(){
    this.router.navigate(['/']);
  }
  
}