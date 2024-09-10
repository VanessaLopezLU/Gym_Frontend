<template>
  <v-container class="contenedor py-10">
    <v-responsive max-width="1200">
      <v-row>
        <!-- Section for Activity Registration -->
        <v-col cols="12" md="6">
          <v-card class="pa-6" elevation="10">
            <v-card-title class="justify-center">
              <h1 class="text-center mb-4">Registrar Actividad</h1>
            </v-card-title>
            <v-card-text>
              <form ref="formActividad">
                <v-select
                  v-model="actividad.maquina"
                  :items="maquinas"
                  label="Seleccione la maquina"
                  item-title="nombre"
                  item-value="id"
                  color="black"
                  class="text-black"
                  prepend-inner-icon="mdi-dumbbell"
                  required
                ></v-select>

                <v-text-field
                  v-model="actividad.repeticiones"
                  label="Repeticiones"
                  outlined
                  dense
                  clearable
                  prepend-inner-icon="mdi-repeat"
                  type="number"
                  color="black"
                  class="text-black"
                ></v-text-field>

                <v-text-field
                  v-model="actividad.peso"
                  label="Peso Levantado (kg)"
                  outlined
                  dense
                  clearable
                  prepend-inner-icon="mdi-scale"
                  type="number"
                  color="black"
                  class="text-black"
                ></v-text-field>

                <v-text-field
                  v-model="actividad.fechaInicio"
                  label="Fecha de Inicio"
                  outlined
                  dense
                  clearable
                  prepend-inner-icon="mdi-calendar-start"
                  type="datetime-local"
                  color="black"
                  class="text-black"
                ></v-text-field>

                <v-text-field
                  v-model="actividad.fechaFin"
                  label="Fecha de Fin"
                  outlined
                  dense
                  clearable
                  prepend-inner-icon="mdi-calendar-end"
                  type="datetime-local"
                  color="black"
                  class="text-black"
                ></v-text-field>

                <v-card-actions class="justify-center btn" color="primary">
                  <v-btn @click="guardarActividad()" class="btn-tabla">
                    {{ editing ? "Modificar" : "Registrar actividad" }}
                  </v-btn>
                </v-card-actions>
              </form>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Bar Chart Section -->
        <v-col cols="12" md="5">
          <v-card class="pa-6" elevation="10">
            <v-card-title class="justify-center">
              <h1 class="text-center mb-4">Reporte de Avances</h1>
            </v-card-title>
            <v-card-text>
              <bar-chart :chart-data="chartData" />
            </v-card-text>
            <v-card-actions class="justify-center">
                  <v-btn @click="rankingUsuarios" class="mt-6 btn" type="submit" block>
                    RANKING
                  </v-btn>
                </v-card-actions>
          </v-card>
        </v-col>
        
      </v-row>
      
    </v-responsive>
    
  </v-container>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,BarController } from 'chart.js';
import axios from "axios";
import Swal from "sweetalert2";
import { BarChart } from 'vue-chart-3';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,BarController);

export default {
  components: { BarChart },
  data() {
    return {
      actividad: {
        maquina: null,
        usuario: null,
        repeticiones: null,
        peso: null,
        fechaInicio: "",
        fechaFin: "",
      },
      maquinas: [],
      loading: false,
      validActividad: false,
      editing: false,
      maquina: [],
      usuario: [],
      actividades: [],
      chartData: [],
    };
  },
  methods: {
    async rankingUsuarios() {
      
        this.$router.push('/ranking');
    
    },
    async guardarActividad() {
      try {
        const usuario = this.$store.getters.getUser;
        if (usuario && usuario.id) {
          this.actividad.usuario = usuario.id;
        }

        if (this.editing) {
          await axios.put(`${import.meta.env.VITE_APP_API}/actividades/${this.currentId}`, this.actividad);
          Swal.fire({ title: "Éxito!", text: "Actividad actualizada con éxito", icon: "success", confirmButtonText: "Aceptar" });
          this.editing = false;
        } else {
          await axios.post(`${import.meta.env.VITE_APP_API}/actividades/crear`, this.actividad);
          Swal.fire({ title: "Éxito!", text: "Actividad guardada con éxito", icon: "success", confirmButtonText: "Aceptar" });
        }

        this.ObtenerActividad();
        this.$refs.formActividad.reset();
      } catch (error) {
        Swal.fire({ title: "Error!", text: "Error al guardar la actividad", icon: "error", confirmButtonText: "Aceptar" });
        console.error("Error al guardar la actividad:", error.response ? error.response.data : error.message);
      }
    },

    async ObtenerActividad() {
    try {
      const user = this.$store.getters.getUser;
      console.log("Usuario obtenido de Vuex:", user);
      if (!user || !user.id) {
        console.warn("No se pudo obtener el ID del usuario.");
        return;
      }
      const id = user.id;
      console.log("ID del usuario:", id);
      const response = await axios.get(`${import.meta.env.VITE_APP_API}/actividades/usuario/${id}`);
      console.log("Datos de actividades obtenidos:", response.data);
      this.actividades = response.data;

      if (this.actividades.length > 0) {
        this.generarGrafica();
      } else {
        console.warn("No hay actividades para mostrar en la gráfica");
      }
    } catch (error) {
      console.error("Error al obtener las actividades:", error);
    }
  },

    async ObtenerMaquina() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API}/maquinas/obtenerTodos`);
        this.maquinas = response.data;
      } catch (error) {
        console.error("Error al obtener la maquina:", error.response ? error.response.data : error.message);
      }
    },

    generarGrafica() {
    if (!this.actividades || this.actividades.length === 0) {
      console.warn("No hay actividades para generar la gráfica");
      return;
    }
    
    const datosPorMaquina = this.actividades.reduce((acumulador, actividad) => {
      const maquinaNombre = actividad.maquina.nombre; 
      if (!acumulador[maquinaNombre]) {
        acumulador[maquinaNombre] = { repeticiones: 0, peso: 0 };
      }
      acumulador[maquinaNombre].repeticiones += actividad.repeticiones; 
      acumulador[maquinaNombre].peso += actividad.peso; 
      return acumulador;
    }, {});


    const labels = Object.keys(datosPorMaquina); 
    const repeticionesData = Object.values(datosPorMaquina).map((dato) => dato.repeticiones); 
    const pesoData = Object.values(datosPorMaquina).map((dato) => dato.peso);

    // Configuración del gráfico de barras
    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Repeticiones por Máquina',
          backgroundColor: '#36A2EB',
          borderColor: '#36A2EB',
          borderWidth: 1,
          data: repeticionesData,
        },
        {
          label: 'Peso Levantado por Máquina (kg)',
          backgroundColor: '#FF6384',
          borderColor: '#FF6384',
          borderWidth: 1,
          data: pesoData,
        }
      ]
    };
  },
  },

  created() {
    this.ObtenerActividad();
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

h1 {
  font-family: "Cambria", serif;
  color: black;
}

.btn {
  background-color: #5a9bb9;
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

.chart-container {
  height: 400px; 
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
