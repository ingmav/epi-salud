export class App {
    name:string;
    
    route: string;
    icon: string;
    permission?: string; //Si tiene permisos se motrara/oculatara dependiendo de los permisos que el usuario tenga asignado
    hideHome?:boolean; //Si es verdadero ocultara el elemento que dirige a raiz, en la lista que aparece en los modulos con hijos (la raiz es la ruta de la aplicación padre)
    isHub?:boolean; //Si es verdadero solo mostrara la aplicación en el HUB cuando tenga al menos un hijo activo, de lo contario se ocultara, si es falso siempre estara presente en el HUB (tomando encuenta los permisos asignados) sin importar si tiene hijos o no activos
    children?:App[]; //Lista de modulos y componentes hijos de la aplicación
    apps?:App[]; //Hub secundario de apps
    menu?:Menu[];
}

export class Menu {
    name:string;
    identificador?:string;
    icon?: string;
    permission?: string; //Si tiene permisos se motrara/oculatara dependiendo de los permisos que el usuario tenga asignado
    children:App[]
}

export const APPS:App [] = [
    { name:"Usuarios",      route: "usuarios",          icon: "assets/icons/users.png",              permission:"hr5UhgMTDmF9EiLYeq5x0cz0e281IWRU" },
    { name:'Permisos',      route: "permisos",          icon: "assets/icons/permisos.png",    permission:"tOJt3Tw42CjDT8Ob5164lwm2i3FCxJCR" },
    { name:'Roles',         route: "roles",             icon: "assets/icons/roles.png",        permission:"gzA7BboE1BpzXZmko6OIDT3EOQRn4otm" },
    { name:'Prueba',         route: "prueba",           icon: "assets/icons/catalogos.png",    
    /*menu:[
        {
            name:'MODULO',
            identificador:'primero',
            children:
            [
                { name:'Comisión Interna',              route:'tramites/comision',              icon:'call_merge'},
                { name:'Adscripción',                   route:'tramites/adscripcion',           icon:'call_made',               permission:"2"  },
                { name:'Adscripción Ext.',              route:'tramites/adscripcion-externa',   icon:'call_made',               permission:"2"  }, 
                { name:'Reincorporación',               route:'tramites/reincorporacion',       icon:'call_received',           permission:"2"  },
                { name:'Documentacion',                 route:'tramites/documentacion',         icon:'insert_drive_file',       permission:"2"  },
                { name:'Comisión Sindical',             route:'tramites/comision-sindical',     icon:'supervised_user_circle',  permission:"2"  }
            ]
        }
    ]*/
    },
]