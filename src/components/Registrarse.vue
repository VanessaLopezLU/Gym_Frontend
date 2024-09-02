<template>
  <v-container class="contenedor py-10">
    <v-responsive max-width="600">
      <v-row class="justify-center">
        <v-col cols="12">
          <v-card class="pa-6" elevation="10">
            <v-card-title class="justify-center">
              <h1 class="text-center mb-4">Registrarse</h1>
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
                  class="text-black"
                  requerid>
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

                <v-text-field 
                  v-model="paqueteUsuario.email" 
                
                  label="E-mail" 
                  outlined 
                  dense 
                  clearable
                  prepend-inner-icon="mdi-email"
                  color="black"
                  class="text-black">
                </v-text-field>

                <v-text-field 
                  v-model="paqueteUsuario.nombre" 
                  label="Nombre" 
                  outlined 
                  dense 
                  clearable
                  prepend-inner-icon="mdi-account-box"
                  color="black"
                  class="text-black">
                </v-text-field>

                <v-text-field 
                  v-model="paqueteUsuario.edad" 
                  label="Digite su edad" 
                  outlined 
                  dense 
                  clearable
                  prepend-inner-icon="mdi-cake-variant"
                  type="number"
                  color="black"
                  class="text-black">
                </v-text-field>

                <v-text-field 
                  v-model="paqueteUsuario.peso" 
                  label="Digite su peso (kg)" 
                  outlined 
                  dense 
                  clearable
                  prepend-inner-icon="mdi-scale"
                  type="number"
                  color="black"
                  class="text-black">
                </v-text-field>

                <v-text-field 
                  v-model="paqueteUsuario.altura" 
                  label="Digite su altura (cm)" 
                  outlined 
                  dense 
                  clearable
                  prepend-inner-icon="mdi-ruler"
                  color="black"
                  class="text-black">
                </v-text-field>

                <v-select 
                  v-model="paqueteUsuario.id_rol" 
                  :items="roles" 
                  label="Seleccione su rol" 
                  outlined 
                  dense
                  color="black"
                  class="text-black">
                </v-select>

                <v-btn class="mt-6" type="submit" color="primary" block>
                  Registrarse
                </v-btn>
              </form>
            </v-card-text>
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
        email: null,
        nombre: null,
        edad: null,
        peso: null,
        altura: null,
        id_rol: null,
      },
      roles: ['Usuario', 'Administrador'] 
    };
  },
  methods: {
   
  }
};
</script>

<style >
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

.v-text-field, .v-select {
  margin-bottom: 16px;
}

.v-text-field .v-input__control, 
.v-select .v-input__control {
  color: black;
}

.v-btn {
  font-weight: bold;
}
</style>
