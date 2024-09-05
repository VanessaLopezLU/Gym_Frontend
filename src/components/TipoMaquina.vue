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
                <form ref="formTipo" >
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
  
          
                  <v-card-actions class="justify-center btn"  color="primary">
                  <v-btn @click="guardarTipo()" class="btn-tabla">
                  {{ editing ? "Modificar" : "Registrar Tipo de Maquina" }}
                </v-btn>
              </v-card-actions>
                </form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  export default {
    data() {
      return {
       tipo:{
        nombre:null,
      
       }
      };
    },
    methods: {
      async guardarTipo() {
      try {
        if (this.editing) {
          await axios.put(
            `${import.meta.env.VITE_APP_API}/tipo-maquina/${this.currentId}`,
            this.tipo
          );
       
          Swal.fire({
            title: "Éxito!",
            text: "Tipo de Maquina actualizada con éxito",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          this.editing = false;
        } else {
          console.log(this.maquina);

          await axios.post(
            `${import.meta.env.VITE_APP_API}/tipo-maquina/crear`,
            this.tipo,
          );
         
          Swal.fire({
            title: "Éxito!",
            text: "Tipo de Maquina guardada con éxito",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        }
        this.$refs.formTipo.reset();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Error al guardar el tipo de Maquina",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        console.error(
          "Error al guardar el tipo de Maquina:",
          error.response ? error.response.data : error.message
        );
      }
    },
    
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
  .btn{
    background-color: #5a9bb9;
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
  