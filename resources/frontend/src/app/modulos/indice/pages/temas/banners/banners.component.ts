import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertPanelComponent } from 'src/app/shared/components/alert-panel/alert-panel.component';
import { DialogConfirmActionComponent } from 'src/app/shared/components/dialog-confirm-action/dialog-confirm-action.component';
import { BannersService } from '../../../services/banners.service';
import { BannersDialogComponent } from '../banners-dialog/banners-dialog.component';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.css'
})
export class BannersComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(AlertPanelComponent) alertPanel: AlertPanelComponent;

  constructor(
    private bannersService: BannersService,
    public dialog: MatDialog,
  ) { }

  isLoadingResults:boolean;
  isLoadingPDF:boolean;

  searchQuery:string;


  pageSize:number = 50;
  displayedColumns: string[] = ['estatus','descripcion', 'extension', 'posicion'];
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
    return this.bannersService.listar(params).subscribe({
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

  cleanSearch(){
    this.searchQuery = '';
  }

  openDialog(obj?){
    let dialogConfig:any = {
      maxWidth: '100%',
      width: '80%',
      height: '260px',
      disableClose: true,
      data:{}
    };

    if(obj){
      dialogConfig.data.id          = obj.id;
      dialogConfig.data.columna_id  = obj.columna_id;
      dialogConfig.data.orden       = obj.orden;
      dialogConfig.data.estatus_id  = obj.estatus_id;
      dialogConfig.data.descripcion = obj.descripcion;
      dialogConfig.data.extension = obj.extension;
      dialogConfig.data.nombre = obj.nombre;

      dialogConfig.height = '500px';
    }

    const dialogRef = this.dialog.open(BannersDialogComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
        this.applySearch();
    });

  }

  eliminarRegistro(id)
  {
    this.bannersService.eliminar(id).subscribe({
      next:(response:any)=>{
        this.applySearch();
      },
      error:(response:any)=>{
        if(response.error.error_type == 'form_validation'){
          for (const key in response.error.data) {
            if (Object.prototype.hasOwnProperty.call(response.error.data, key)) {
              const element = response.error.data[key];
              let error:any = {};
              error[element] = true;
              
            }
          }
          this.alertPanel.showError(response.error.message);
        }else{
          this.alertPanel.showError(response.error.message);
        }
      }
    });
  }

  eliminar(obj?)
  {
    let id:string = obj.id;
    //DialogConfirmActionComponent
    const dialogRef = this.dialog.open(DialogConfirmActionComponent, {
      width: '500px',
      data: {title:'Eliminar Registro',message:'Esta seguro de eliminar este registro?',hasOKBtn:true,btnColor:'warn',btnText:'Eliminar',btnIcon:'delete'}
    });

    dialogRef.afterClosed().subscribe(reponse => {
      if(reponse){
        this.eliminarRegistro(obj.id);
      }
    });
  }
}
