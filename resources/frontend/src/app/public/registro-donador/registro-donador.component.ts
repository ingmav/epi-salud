import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { PublicService } from '../public.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

import { ReportWorker } from '../../web-workers/report-worker';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-registro-donador',
  templateUrl: './registro-donador.component.html',
  styleUrls: ['./registro-donador.component.css']
})
export class RegistroDonadorComponent implements OnInit {

  isLoading:boolean;
  isValidatingCURP:boolean;
  CURP:string;

  donante_id:number = 0;
  donante:any = {};

  catalogos: any = {};
  filteredCatalogs:any = {};

  isLoadingPDF: boolean = false;
  showMyStepper:boolean = false;
  showReportForm:boolean = false;
  stepperConfig:any = {};
  reportTitle:string;
  reportIncludeSigns:boolean = false;

  selectedItemIndex: number = -1;
  fechaActual:any = '';

  isLinear:boolean = true;
  firstFormGroup: UntypedFormGroup;
  secondFormGroup: UntypedFormGroup;
  donadoresForm:UntypedFormGroup;
  

  constructor(
    private fb: UntypedFormBuilder,
    private publicService: PublicService,
    private snackBar: MatSnackBar,
    private sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.CURP = '';
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });

    this.fechaActual = new Date();

    //this.fechaActual = formatDate(new Date(), 'yyyy-MM-dd', 'en');


    this.donadoresForm = this.fb.group ({

      id:[''],
      codigo:[''],
      nombre:['',Validators.required],
      apellido_paterno:[''],
      apellido_materno:[''],
      edad:['',Validators.required],
      fecha_nacimiento:['',Validators.required],
      curp:['', Validators.pattern(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/)],
      sexo:['',Validators.required],
      codigo_postal:['',Validators.required],
      ciudad:['',Validators.required],
      entidad_federativa:[''],
      entidad_federativa_id:['7',Validators.required],
      seguro:[''],
      seguro_id:['',Validators.required],
      seguro_otro:[''],
      email: ['', [Validators.required, Validators.email]],
      telefono_contacto:[''],

    });

    this.route.params.subscribe(params => {
      
      this.donante_id = params['id'];
      if(this.donante_id){

        this.obtenerDonante();

        console.log("hay un ID");

      }

  });

    this.IniciarCatalogos(null);


  }

  public IniciarCatalogos(obj:any)
  {
    this.isLoading = true;

    let carga_catalogos = [
      {nombre:'estados',orden:'nombre'},
      {nombre:'seguros',orden:'descripcion'},
    ];

    this.publicService.obtenerCatalogos(carga_catalogos).subscribe(
      response => {

        this.catalogos = response.data;

        this.filteredCatalogs['estados'] = this.donadoresForm.get('entidad_federativa_id').valueChanges.pipe(startWith(''),map(value => this._filter(value,'estados','nombre')));
        this.filteredCatalogs['seguros'] = this.donadoresForm.get('seguro_id').valueChanges.pipe(startWith(''),map(value => this._filter(value,'seguros','descripcion')));

      
        if(obj)
        {
          this.donadoresForm.get('entidad_federativa_id').setValue(obj.entidad_federativa);
          this.donadoresForm.get('seguro_id').setValue(obj.seguro);
        }
        this.isLoading = false; 
      } 
    );

  }

  private _filter(value: any, catalog: string, valueField: string): string[] {
    if(this.catalogos[catalog]){
      let filterValue = '';
      if(value){
        if(typeof(value) == 'object'){
          filterValue = value[valueField].toLowerCase();
        }else{
          filterValue = value.toLowerCase();
        }
      }
      return this.catalogos[catalog].filter(option => option[valueField].toLowerCase().includes(filterValue));
    }
  }

  getDisplayFn(label: string){
    return (val) => this.displayFn(val,label);
  }

  displayFn(value: any, valueLabel: string){
    return value ? value[valueLabel] : value;
  }

  validarCurp(){
    if(this.CURP.length == 18){
      this.isValidatingCURP = !this.isValidatingCURP;
    }else{
      console.log('CURP invalida');
    }
  }


  calcularEdad() {
    var today = new Date();
    var nacimiento = new Date(this.donadoresForm.get('fecha_nacimiento').value);
    console.log(nacimiento);
    //Restamos los años
    var años = today.getFullYear() - nacimiento.getFullYear();
    // Si no ha llegado su cumpleaños le restamos el año por cumplir
    if ( nacimiento.getMonth() > (today.getMonth()) || nacimiento.getDay() > today.getDay())
        años--;
    this.donadoresForm.get('edad').patchValue(años);
}

  soloNumeros(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  guardarDonante(){

    let formData =  JSON.parse(JSON.stringify(this.donadoresForm.value));

    if(formData.entidad_federativa_id){
      formData.entidad_federativa_id = formData.entidad_federativa_id.id;
    }

    if(formData.seguro_id){
      formData.seguro_id = formData.seguro_id.id;
    }

    // let datoGuardado = {
    //   data: formData
    // }

    this.isLoading = true;

    if(this.donante_id > 0 ){

      this.publicService.updateDonante(this.donante_id, formData).subscribe(
        response =>{
          //this.dialogRef.close(true);
          this.isLoading = false;

          var Message = "";            

          Message = "Se Editaron los datos del Donante: "+" "+response.data.nombre+" "+response.data.apellido_paterno+" "+response.data.apellido_materno+" "+" con Éxito!";

          this.sharedService.showSnackBar(Message, 'Cerrar', 5000);
          this.router.navigate(['/donantes']);

        },
        errorResponse => {
          console.log(errorResponse);
          this.isLoading = false;
      });

    }else{

      this.publicService.createDonante(formData).subscribe(
        response =>{
          console.log(response);
          this.isLoading = false;



          if(response.status != 409){

            var Message = "Donante Registrado con Éxito!";

            this.sharedService.showSnackBar(Message, 'Cerrar', 3000);

            this.QRDonante(response.datos, response.datos.codigo);
            this.donadoresForm.reset();
            this.router.navigate(['/qr-donante/'+response.datos.codigo]);

          }else if(response.status == 409){

            var error = response.errores.curp[0];

            this.sharedService.showSnackBar(error, 'Cerrar', 3000);

          }

          errorResponse => {
            console.log(errorResponse.error.errores);
            this.reponseErrorsPaciente(errorResponse);
            this.isLoading = false;
          }
          

      });

    }

  }

  obtenerDonante():void{
    this.isLoading = true;
    
    this.publicService.getDonante(this.donante_id).subscribe(
      response => {

        this.donante = response.donante;        
        this.donadoresForm.reset();
        this.donadoresForm.patchValue(response.donante);
        
        this.calcularEdad();
        this.IniciarCatalogos(response.donante);

        this.isLoading = false;
      },
      errorResponse =>{
        var errorMessage = "Ocurrió un error.";
        if(errorResponse.status == 409){
          errorMessage = errorResponse.error.message;
        }
        this.sharedService.showSnackBar(errorMessage, null, 3000);
        this.isLoading = false;
      }
    );
  }

  reponseErrorsPaciente(errorResponse:any){

    if(errorResponse.error.errores){

      for(let i in errorResponse.error.errores){

        if(i == 'curp'){
          let errores = errorResponse.error.errores[i];
          for(let j in errores){

              let message = errores[j];

              this.sharedService.showSnackBar(message, 'Cerrar', 7000);
          }
          break;
        }
      }
    }
  }

  QRDonante(obj, index){

    console.log("acaaa",obj);

    this.selectedItemIndex = index;

      //this.showMyStepper = true;
      this.isLoadingPDF = true;
      this.showMyStepper = true;
      this.showReportForm = false;

      let params:any = {};
      let countFilter = 0;
      let fecha_reporte = new Intl.DateTimeFormat('es-ES', {year: 'numeric', month: 'numeric', day: '2-digit'}).format(new Date());

      let appStoredData = this.sharedService.getArrayDataFromCurrentApp(['searchQuery','filter']);
      
      params.reporte = 'registro-donador';
      if(appStoredData['searchQuery']){
        params.query = appStoredData['searchQuery'];
      }
      this.stepperConfig = {
        steps:[
          {
            status: 1, //1:standBy, 2:active, 3:done, 0:error
            label: { standBy: 'Cargar Datos', active: 'Cargando Datos', done: 'Datos Cargados' },
            icon: 'settings_remote',
            errorMessage: '',
          },
          {
            status: 1, //1:standBy, 2:active, 3:done, 0:error
            label: { standBy: 'Generar PDF', active: 'Generando PDF', done: 'PDF Generado' },
            icon: 'settings_applications',
            errorMessage: '',
          },
          {
            status: 1, //1:standBy, 2:active, 3:done, 0:error
            label: { standBy: 'Descargar Archivo', active: 'Descargando Archivo', done: 'Archivo Descargado' },
            icon: 'save_alt',
            errorMessage: '',
          },
        ],
        currentIndex: 0
      }


      this.stepperConfig.steps[0].status = 2;

      this.stepperConfig.steps[0].status = 3;
      this.stepperConfig.steps[1].status = 2;
      this.stepperConfig.currentIndex = 1;

      const reportWorker = new ReportWorker();
      reportWorker.onmessage().subscribe(
        data => {
          this.stepperConfig.steps[1].status = 3;
          this.stepperConfig.steps[2].status = 2;
          this.stepperConfig.currentIndex = 2;

          FileSaver.saveAs(data.data,'Registro-Donador '+'('+fecha_reporte+')');
          reportWorker.terminate();

          this.stepperConfig.steps[2].status = 3;
          this.isLoadingPDF = false;
          this.showMyStepper = false;
      });

      reportWorker.onerror().subscribe(
        (data) => {
          this.stepperConfig.steps[this.stepperConfig.currentIndex].status = 0;
          this.stepperConfig.steps[this.stepperConfig.currentIndex].errorMessage = data.message;
          this.isLoadingPDF = false;
          reportWorker.terminate();
        }
      );
      
      let config = {
        title: "Registro de Donación",
        showSigns: this.reportIncludeSigns, 
      };
      reportWorker.postMessage({data:{items: obj, config:config, fecha_actual: this.fechaActual},reporte:'/registro-donante'});
      this.isLoading = false;
  }


}
