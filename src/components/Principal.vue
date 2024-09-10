<template>
    <v-app>
      <v-navigation-drawer
        app
        v-model="drawer"
        
      >
        <v-list dense>
          <v-list-item
            v-for="item in filteredMenuItems"
            :key="item.title"
            link
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar
        app
       
        color="primary"
        dark
      >
        <v-app-bar-nav-icon @click="toggleDrawer" />
        <v-toolbar-title>Mi Aplicación</v-toolbar-title>
      </v-app-bar>
  
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const drawer = ref(false);
  
      const role = computed(() => store.getters.getRole);
  
      const menuItems = {
        admin: [
          { title: 'Iniciar Sesión', path: '/', icon: 'mdi-login' },
          { title: 'Registrarse', path: '/registrarse', icon: 'mdi-account-plus' },
          { title: 'Registro de Actividad', path: '/actividad', icon: 'mdi-dumbbell' },
          { title: 'Ranking', path: '/ranking', icon: 'mdi-trophy' },
          { title: 'Tipo de Máquina', path: '/tipo-maquina', icon: 'mdi-cogs' },
          { title: 'Máquina', path: '/maquina', icon: 'mdi-toolbox' },
        ],
        user: [
          { title: 'Iniciar Sesión', path: '/', icon: 'mdi-login' },
          { title: 'Registrarse', path: '/registrarse', icon: 'mdi-account-plus' },
          { title: 'Registro de Actividad', path: '/actividad', icon: 'mdi-dumbbell' },
          { title: 'Ranking', path: '/ranking', icon: 'mdi-trophy' },
        ],
      };
  
      const filteredMenuItems = computed(() => {
        return role.value === 'admin' ? menuItems.admin : menuItems.user;
      });
  
      const toggleDrawer = () => {
        drawer.value = !drawer.value;
      };
  
      return {
        drawer,
        filteredMenuItems,
        toggleDrawer,
      };
    },
  };
  </script>
  
  <style>
  /* Puedes agregar estilos adicionales aquí */
  </style>
  