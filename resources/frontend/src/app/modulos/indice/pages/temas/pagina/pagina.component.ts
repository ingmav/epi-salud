import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertPanelComponent } from 'src/app/shared/components/alert-panel/alert-panel.component';
import { PaginaService } from '../../../services/pagina.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina',
  
  templateUrl: './pagina.component.html',
  styleUrl: './pagina.component.css'
})
export class PaginaComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(AlertPanelComponent) alertPanel: AlertPanelComponent;

  constructor(
    private paginaService: PaginaService,
    public dialog: MatDialog,
    private router:Router
  ) { }

  isLoadingResults:boolean;
  isLoadingPDF:boolean;

  searchQuery:string;


  pageSize:number = 50;
  displayedColumns: string[] = ['pagina', 'imagen', 'iframe'];
  resultsLength = 0;
  data:any;

  ngOnInit(): void {
    this.data = [];
    this.searchQuery = '';

    setTimeout(() => {
      this.applySearch();
    }, 10);
  }

  applySearch(){
    this.isLoadingResults = true;
    let params:any = {
      sort: this.sort.active,
      direction: this.sort.direction,
      page: this.paginator.pageIndex+1,
      per_page: this.paginator.pageSize,
      query: this.searchQuery,
    };
    
    this.data = [];
    return this.paginaService.obtenerPaginas(params).subscribe({
      next:(response:any) => {
        this.isLoadingResults = false;
        this.resultsLength = response.data.total;
        this.data = response.data.data;
      },
      error:(response:any) => {
        this.alertPanel.showError(response.error.message);
        this.isLoadingResults = false;
      }
    });
  }

  edicion(row)
  {
    console.log(this.router.url);
    let route = this.router.url;
    this.router.navigate([route, row.id]);
  }

  cleanSearch(){
    this.searchQuery = '';
  }

  openDialog(row?)
  {

  }
}
