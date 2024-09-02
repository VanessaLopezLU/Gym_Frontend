import { createRouter, createWebHashHistory } from 'vue-router';
import Registrarse from './components/Registrarse.vue';
import IniciarSesion from './components/IniciarSesion.vue';
import RegistroActividad from './components/RegistroActividad.vue';
import TipoMaquina from './components/TipoMaquina.vue';
import Maquina from './components/Maquina.vue';




// Definir las rutas de la aplicación
const routes = [
    {
      path: '/',
      name: 'IniciarSesion',
      component: IniciarSesion
    },
    {
      path: '/registrarse',
      name: 'Registrarse',
      component: Registrarse
    },
    {
        path: '/actividad',
        name: 'RegistroActividad',
        component: RegistroActividad ,
      },
      {
        path: '/tipo-maquina',
        name: 'TipoMaquina',
        component: TipoMaquina ,
      },
      {
        path: '/maquina',
        name: 'Maquina',
        component: Maquina ,
      }
    // otras rutas...
  ];

// Crear la instancia del router
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;