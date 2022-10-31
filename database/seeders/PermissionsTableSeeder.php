<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $basic_permissions = [
            ['id'=>'R9vq2ksTpI27zUNfl1BOZNu4nWaBEdzI','description'=>'Crear Roles',                 'group'=>'SEGURIDAD/ROLES',      'is_super'=>false ],
            ['id'=>'WEXPBavKv3I8O7qDWZFPJ8qSBJIOorxR','description'=>'Seleccionar Permiso',         'group'=>'SEGURIDAD/PERMISOS',   'is_super'=>false ],
            ['id'=>'cbjMp9Nyvrn6496Lr3A4AViQ4xfCuUGD','description'=>'Crear Usuarios',              'group'=>'ADMIN/USUARIOS',       'is_super'=>false ],
            ['id'=>'tQCBXc4vpAD7CXKIYefpMgTfpC6H7lht','description'=>'Seleccionar Rol',             'group'=>'SEGURIDAD/ROLES',      'is_super'=>false ],
            ['id'=>'TYApYivN480zKKZEciMIqXFd0P8ZB5cr','description'=>'Eliminar Usuarios',           'group'=>'ADMIN/USUARIOS',       'is_super'=>false ],
            ['id'=>'kouKswi19okTm61loGNOaJA8eYAd2RYB','description'=>'Ver Roles',                   'group'=>'SEGURIDAD/ROLES',      'is_super'=>false ],
            ['id'=>'XgQSNeHHCqMScU1EvNaKgv5ju2Tp32AS','description'=>'Eliminar Roles',              'group'=>'SEGURIDAD/ROLES',      'is_super'=>false ],
            ['id'=>'tTVayONYIDylH9dk7jg5143h0FKoSpBi','description'=>'CRUD Permisos',               'group'=>'SEGURIDAD/PERMISOS',   'is_super'=>true  ],
            ['id'=>'qo5BS6kfPEfLXSQy8eUjw1UJ85H8te64','description'=>'Editar Roles',                'group'=>'SEGURIDAD/ROLES',      'is_super'=>false ],
            ['id'=>'utOb2NFkCZAgWQY81Oh2h6GChMxDuMrz','description'=>'Editar Usuarios',             'group'=>'ADMIN/USUARIOS',       'is_super'=>false ],
            ['id'=>'hr5UhgMTDmF9EiLYeq5x0cz0e281IWRU','description'=>'Modulo Usuarios',             'group'=>'MODULOS',              'is_super'=>false ],
            ['id'=>'tOJt3Tw42CjDT8Ob5164lwm2i3FCxJCR','description'=>'Modulo Permisos',             'group'=>'MODULOS',              'is_super'=>false ],
            ['id'=>'gzA7BboE1BpzXZmko6OIDT3EOQRn4otm','description'=>'Modulo Roles',                'group'=>'MODULOS',              'is_super'=>false ],
            
        ];

        foreach ($basic_permissions as $permission) {
            \App\Models\Permission::create($permission);
        }
    }
}
