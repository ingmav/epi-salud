import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '../../../apps-list/apps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './app-hub.component.html',
  styleUrls: ['./app-hub.component.css']
})
export class AppHubComponent implements OnInit {
  @Input() appsList: App[];

  apps: App[];

  constructor(private router:Router) { }

  ngOnInit() {
    this.getApps();
  }

  getApps():void{
    this.apps = this.appsList;
    console.log("apps=>",this.apps);
  }

  goTo(url:string){
    let route = '/' + url;
    this.router.navigate([route]);
  }
}