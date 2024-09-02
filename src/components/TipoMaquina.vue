<template>
    <v-container class="contenedor py-10">
      <v-responsive max-width="600">
        <v-row class="justify-center">
          <v-col cols="12">
            <v-card class="pa-6" elevation="10">
              <v-card-title class="justify-center">
                <h1 class="text-center mb-4">Crear Tipo de Máquina</h1>
              </v-card-title>
              <v-card-text>
                <form >
                  <v-text-field 
                    v-model="tipo.nombre" 
                    label="Nombre del Tipo de Máquina" 
                    outlined 
                    dense 
                    clearable
                    prepend-inner-icon="mdi-dumbbell"
                    color="black"
                    class="text-black">
                  </v-text-field>
  
                  <v-textarea 
                    v-model="tipo.descripcion" 
                    label="Descripción del Tipo de Máquina" 
                    outlined 
                    dense 
                    clearable
                    prepend-inner-icon="mdi-text"
                    color="black"
                    class="text-black">
                  </v-textarea>
  
                  <v-btn class="mt-6" type="submit" color="primary" block>
                    Crear Tipo de Máquina
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
       tipo:{
        nombre:null,
        descripcion:null
       }
      };
    },
    methods: {
    
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
  
  .v-text-field, .v-textarea {
    margin-bottom: 16px;
  }
  
  .v-text-field .v-input__control, 
  .v-textarea .v-input__control {
    color: black;
  }
  
  .v-btn {
    font-weight: bold;
  }
  </style>
  