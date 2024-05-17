import { Component, OnInit } from '@angular/core';
import { AppsListService } from './apps-list.service';
import { App } from './apps';
import { AppHubComponent } from '../shared/components/app-hub/app-hub.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'apps-list',
  standalone: true,
  imports:[AppsListComponent, AppHubComponent, CommonModule],
  templateUrl: './apps-list.component.html',
  styleUrls: ['./apps-list.component.css']
})
export class AppsListComponent implements OnInit {

  apps: App[];
  breakpoint = 6;

  constructor(private appsService: AppsListService) { }

  ngOnInit() {
    this.getApps();
    //this.breakpoint = (window.innerWidth <= 599) ? 3 : 6;
  }

  getApps():void{
    this.apps = this.appsService.getApps();
    console.log("-->",this.apps);
  }

  /*onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 599) ? 3 : 6;
  }*/

}
