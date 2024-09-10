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
              <form ref="formMaquina">
                <v-text-field v-model="maquina.nombre" label="Nombre de la Máquina" outlined dense clearable
                  prepend-inner-icon="mdi-dumbbell" color="black" class="text-black">
                </v-text-field>

                <v-select v-model="maquina.estado" :items="estado" label="Estado de la Máquina" outlined dense clearable
                  prepend-inner-icon="mdi-check-circle" color="black" class="text-black">
                </v-select>

                <v-select v-model="maquina.tipoMaquina" :items="tipo" label="Seleccione el tipo de maquina"
                  item-title="nombre" item-value="id" color="black" class="text-black" prepend-inner-icon="mdi-account"
                  required></v-select>

                <v-card-actions class="justify-center btn" color="primary">
                  <v-btn @click="guardarMaquina()" class="btn-tabla">
                    {{ editing ? "Modificar" : "Registrar Maquina" }}
                  </v-btn>
                </v-card-actions>
              </form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="table">
        <v-col cols="12">
          <v-toolbar flat class="titulo">
            <v-toolbar-title class="center-title">
              Lista de Maquinas
            </v-toolbar-title>
          </v-toolbar>
          <v-data-table :headers="headers" :items="maquinas" class="custom-table">
            <template v-slot:item="{ item }">
              <tr class="data-row-1 item">
                <td class="data">{{ item.nombre }}</td>
                <td class="data">{{ item.estado }}</td>
                <td class="data">
                  {{ item.tipoMaquina.nombre }}
                </td>
                <td class="data acciones">
                  <v-btn small @click="editMaquina(item)" class="mx-2">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn small @click="deleteMaquina(item.id)" class="mx-2">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

    </v-responsive>
  </v-container>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      maquina: {
        nombre: null,
        estado: '',
        tipoMaquina: [],
      },
      maquinas: [],
      editing: false,
      currentId: null,
      loading: false,
      headers: [
        { title: "Nombre", value: "nombre" },
        { title: "Estado", value: "estado" },
        { title: "Tipo Maquina", value: "tipoMaquina" },
        { title: "Acciones", value: "actions" },
      ],

      tipo: [],
      estado: ['Disponible', 'En Uso', 'Fuera de Servicio'],

    };
  },
  methods: {
    async guardarMaquina() {
      try {
        if (this.editing) {
          await axios.put(
            `${import.meta.env.VITE_APP_API}/maquinas/actualizar/${this.currentId}`,
            this.maquina
          );
          this.ObtenerTipoMaquina();
          console.log(this.tipo);

          Swal.fire({
            title: "Éxito!",
            text: "Maquina  actualizada con éxito",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          this.editing = false;
        } else {
          console.log(this.maquina);

          await axios.post(
            `${import.meta.env.VITE_APP_API}/maquinas/crear`,
            this.maquina,
          );

          Swal.fire({
            title: "Éxito!",
            text: "Maquina guardada con éxito",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        }
        this.maquina.nombre = "";
        this.maquina.estado = "";
        this.ObtenerMaquina();
        this.$refs.formMaquina.reset();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Error al guardar la Maquina",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        console.error(
          "Error al guardar la Maquina:",
          error.response ? error.response.data : error.message
        );
      }
    },
    async ObtenerMaquina() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/maquinas/obtenerTodos`
        );
        this.maquinas = response.data;
      } catch (error) {
        console.error(
          "Error al obtener la maquina:",
          error.response ? error.response.data : error.message
        );
      }
    },
    async editMaquina(item) {  // Preparar el formulario para la edición
      delete item.actividades
      this.maquina = { ...item };
      this.currentId = item.id;
      this.editing = true; // Cambiar el estado a editar
    },
    async deleteMaquina(id) {
      try {
        await axios.delete(`${import.meta.env.VITE_APP_API}/maquinas/${id}`);
        Swal.fire({
          title: "Éxito!",
          text: "Maquina eliminada con éxito",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
       
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Error al eliminar la maquina",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        console.error(
          "Error al eliminar la maquina:",
          error.response ? error.response.data : error.message
        );
      }
    },
    async ObtenerTipoMaquina() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/tipo-maquina/obtenerTodos`
        );
        this.tipo = response.data;
      } catch (error) {
        console.error(
          "Error al obtener el tipo de maquina:",
          error.response ? error.response.data : error.message
        );
      }
    },


  },
  created() {
    this.ObtenerTipoMaquina();
    this.ObtenerMaquina();
  },
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

.btn {
  background-color: #5a9bb9;
}


h1 {
  font-family: 'Cambria', serif;
  color: black;
}

.v-card {
  background-color: #f5f5f5;
  border-radius: 15px;
}

.v-text-field,
.v-select {
  margin-bottom: 16px;
}

.v-text-field .v-input__control,
.v-select .v-input__control {
  color: black;
}

.v-btn {
  font-weight: bold;
}

.table {
  background-color: #5a9bb9;
  color: #a39a9a;
}
</style>