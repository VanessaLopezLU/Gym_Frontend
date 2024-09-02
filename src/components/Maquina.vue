<template>
    <v-container class="contenedor py-10">
      <v-responsive max-width="600">
        <v-row class="justify-center">
          <v-col cols="12">
            <v-card class="pa-6" elevation="10">
              <v-card-title class="justify-center">
                <h1 class="text-center mb-4">Crear Máquina</h1>
              </v-card-title>
              <v-card-text>
                <form @submit.prevent="submitMachine">
                  <v-text-field 
                    v-model="maquina.nombre" 
                    label="Nombre de la Máquina" 
                    outlined 
                    dense 
                    clearable
                    prepend-inner-icon="mdi-dumbbell"
                    color="black"
                    class="text-black">
                  </v-text-field>
  
                  <v-text-field
                    v-model="maquina.estado"  
                    label="Estado de la Máquina" 
                    outlined 
                    dense 
                    clearable
                    prepend-inner-icon="mdi-check-circle"
                    color="black"
                    class="text-black">
                  </v-text-field>
  
                  <v-select 
                    v-model="maquina.id_tipo" 
                    :items="tipo" 
                    label="Tipo de Máquina" 
                    outlined 
                    dense 
                    clearable
                    prepend-inner-icon="mdi-text"
                    color="black"
                    class="text-black">
                  </v-select>
  
                  <v-btn class="mt-6" type="submit" color="primary" block>
                    Crear Máquina
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
        maquina: {
          nombre: null,           // Nombre de la máquina
          estado: null,          // Estado de la máquina
          id_tipo: null,   // ID del tipo de máquina
        },
        tipo:[

        ]
       
      };
    },
    methods: {
      submitMachine() {
        // Lógica para enviar los datos de la máquina al backend
        if (this.machine.name && this.machine.state && this.machine.machineTypeId) {
          console.log('Máquina creada:', this.machine);
          // Aquí puedes agregar la lógica para enviar los datos al servidor
        } else {
          alert('Por favor, complete todos los campos.');
        }
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
  