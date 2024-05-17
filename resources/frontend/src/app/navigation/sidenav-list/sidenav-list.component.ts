import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SessionUserMenuComponent } from '../session-user-menu/session-user-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sidenav-list',
  standalone: true,
  imports:[SessionUserMenuComponent, CommonModule],
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() onCloseSidenav = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {}

  close(){
    this.onCloseSidenav.emit()
  }
}
