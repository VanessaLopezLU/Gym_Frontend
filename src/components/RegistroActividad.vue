<template>
    <v-container class="contenedor py-10">
      <v-responsive max-width="600">
        <v-row class="justify-center">
          <v-col cols="12">
            <v-card class="pa-6" elevation="10">
              <v-card-title class="justify-center">
                <h1 class="text-center mb-4">Registrar Actividad</h1>
              </v-card-title>
              <v-card-text>
                <form>
                  
                  <v-select 
                    v-model="actividad.id_maquina" 
                    :items="maquina" 
                    label="Seleccionar Máquina" 
                    outlined 
                    dense 
                    clearable
                    prepend-inner-icon="mdi-dumbbell"
                    color="black"
                    class="text-black">
                  </v-select>
                  <v-select 
                    v-model="actividad.id_usuario" 
                    :items="usuario" 
                    label="Seleccionar su usuario" 
                    outlined 
                    dense 
                    clearable
                    prepend-inner-icon="mdi-account"
                    color="black"
                    class="text-black">
                  </v-select>
                  <v-text-field 
                    v-model="actividad.repeticiones" 
                    label="Repeticiones" 
                    outlined 
                    dense 
                    clearable
                    prepend-inner-icon="mdi-repeat"
                    type="number"
                    color="black"
                    class="text-black">
                  </v-text-field>
  
                  <v-text-field 
                    v-model="actividad.peso" 
                    label="Peso Levantado (kg)" 
                    outlined 
                    dense 
                    clearable
                    prepend-inner-icon="mdi-scale"
                    type="number"
                    color="black"
                    class="text-black">
                  </v-text-field>
  
                  <v-text-field 
                    v-model="actividad.fechaInicio" 
                    label="Fecha de Inicio" 
                    outlined 
                    dense 
                    clearable
                    prepend-inner-icon="mdi-calendar-start"
                    type="date"
                    color="black"
                    class="text-black">
                  </v-text-field>
  
                  <v-text-field 
                    v-model="actividad.fechaFin" 
                    label="Fecha de Fin" 
                    outlined 
                    dense 
                    clearable
                    prepend-inner-icon="mdi-calendar-end"
                    type="date"
                    color="black"
                    class="text-black">
                  </v-text-field>
  
                 
  
                  <v-btn class="mt-6" type="submit" color="primary" block>
                    Registrar Actividad
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
        actividad: {
          id_maquina: null,
          id_usuario:null,
          repeticiones: null,
          peso: null,
          fechaInicio: '',
          fechaFin: '',
          
        },
        maquina:[],
        usuario:[]
       
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
  