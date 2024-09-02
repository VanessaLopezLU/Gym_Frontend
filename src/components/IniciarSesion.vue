<template>
    <v-container class="contenedor py-10">
      <v-responsive max-width="400">
        <v-row class="justify-center">
          <v-col cols="12">
            <v-card class="pa-6" elevation="10">
              <v-card-title class="justify-center">
                <h1 class="text-center mb-4">Iniciar Sesión</h1>
              </v-card-title>
              <v-card-text>
                <form >
                  <v-text-field 
                    v-model="paqueteUsuario.usuario" 
                    label="Usuario" 
                    outlined 
                    dense 
                    clearable
                    prepend-inner-icon="mdi-account"
                    color="black"
                    class="text-black">
                  </v-text-field>
  
                  <v-text-field 
                    v-model="paqueteUsuario.contrasena" 
                    label="Contraseña" 
                    outlined 
                    dense 
                    clearable
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    color="black"
                    class="text-black">
                  </v-text-field>
  
                  <v-btn class="mt-6" type="submit" color="primary" block>
                    Iniciar Sesión
                  </v-btn>
                </form>
              </v-card-text>
  
              <v-card-actions class="justify-center">
                <span style="color: black;">¿No tienes una cuenta?</span>
                <v-btn color="secondary"  @click="goToRegister">
                  Regístrate aquí
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        paqueteUsuario: {
          usuario: null,
          contrasena: null,
        },
      };
    },
    methods: {
        goToRegister() {
      this.$router.replace('/registrarse'); 
    }
      
    }
  };
  </script>
  
<style scoped>
.contenedor {
  background-color: #5a9bb9;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-family: 'Cambria', serif;
  color: black;
}

.v-card {
  background-color: #f5f5f5;
  border-radius: 15px;
}

.v-text-field {
  margin-bottom: 16px;
}

.v-text-field .v-input__control {
  color: black;
}

.v-btn {
  font-weight: bold;
}

.no-account-text {
  color: black;
  margin-right: 8px; 
}
</style>

  