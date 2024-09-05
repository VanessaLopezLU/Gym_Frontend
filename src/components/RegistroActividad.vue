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
                >
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
                  class="text-black"
                >
                </v-text-field>

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
                >
                </v-text-field>

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
                >
                </v-text-field>

                <v-card-actions class="justify-center btn" color="primary">
                  <v-btn @click="guardarActividad()" class="btn-tabla">
                    {{ editing ? "Modificar" : "Registrar actividad" }}
                  </v-btn>
                </v-card-actions>
              </form>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Section for Chart Report -->
        <v-col cols="12" md="5">
          <v-card class="pa-6" elevation="10">
            <v-card-title class="justify-center">
              <h1 class="text-center mb-4">Reporte de Avance</h1>
            </v-card-title>
            <v-card-text>
              <!-- Doughnut Chart component -->
              <doughnut-chart :chart-data="chartData" :chart-options="chartOptions"></doughnut-chart>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import { Doughnut } from 'vue-chartjs/legacy';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from "axios";
import Swal from "sweetalert2";

ChartJS.register(Title, Tooltip, Legend, ArcElement);
export default {
  components: {
    DoughnutChart: Doughnut
  },
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
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Progreso de Actividades'
          }
        }
      },
     
    };
  },
  methods: {
    async guardarActividad() {
      try {
        if (this.editing) {
          await axios.put(
            `${import.meta.env.VITE_APP_API}/actividades/${this.currentId}`,
            this.actividad
          );
          this.ObtenerActividad();
          Swal.fire({
            title: "Éxito!",
            text: "Actividad  actualizada con éxito",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          this.editing = false;
        } else {
          console.log(this.actividad);
          const usuario = this.$store.getters.getUser;

          if (usuario && usuario.id) {
            this.actividad.usuario = usuario.id;
            await axios.post(
              `${import.meta.env.VITE_APP_API}/actividades/crear`,
              this.actividad
            );
          }

          this.ObtenerActividad();
          Swal.fire({
            title: "Éxito!",
            text: "Actividad guardada con éxito",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        }
        this.$refs.formActividad.reset();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Error al guardar la actividad",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        console.error(
          "Error al guardar la actividad:",
          error.response ? error.response.data : error.message
        );
      }
    },
    async ObtenerActividad() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API}/actividades/obtenerTodos`);
        this.actividades = response.data;
        this.generateChartData();
      } catch (error) {
        console.error("Error al obtener las actividades:", error);
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
    generateChartData() {
      // Crear los datos para la gráfica de anillo
      const labels = this.actividades.map(actividad => `Actividad ${actividad.id}`);
      const data = this.actividades.map(actividad => actividad.repeticiones);

      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Repeticiones',
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            data: data,
          }
        ]
      };
    }
 
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
  height: 400px; /* Adjust as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
