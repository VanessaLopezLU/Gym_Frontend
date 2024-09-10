<template>
  <v-container class="contenedor py-10">
    <v-responsive max-width="1200">
      <v-row>
        <!-- Ranking Section -->
        <v-col cols="12">
          <v-card class="pa-6" elevation="10">
            <v-card-title class="justify-center">
              <h1 class="text-center mb-4">Ranking de Usuarios</h1>
            </v-card-title>

            <v-card-text>
              <v-data-table
                :headers="headersCombinados"
                :items="rankingCombinado"
                class="custom-table"
              >
                <template v-slot:item="{ item }">
                  <tr class="data-row-1">
                    <td class="data">
                      <v-chip class="custom-chip">{{ item.position }}</v-chip>
                    </td>
                    <td class="data">{{ item.usuario }}</td>
                    <td class="data">{{ item.actividades }}</td>
                    <td class="data">{{ item.pesoRepeticiones }}</td>
                    <td class="data">{{ item.pesoTotal }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rankingCombinado: [],
      headersCombinados: [
        { title: "Posición", value: "position" },
        { title: "Usuario", value: "usuario" },
        { title: "Cantidad de Actividades", value: "actividades" },
        { title: "Peso por Repeticiones (kg)", value: "pesoRepeticiones" },
        { title: "Peso Total (kg)", value: "pesoTotal" },
      ],
    };
  },
  methods: {
    
    async fetchRanking() {
      try {
        // Obtener los rankings
        const [cantidadActividadesResponse, pesoRepeticionesResponse, pesoTotalResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_APP_API}/actividades/ranking/cantidad-actividades`),
          axios.get(`${import.meta.env.VITE_APP_API}/actividades/ranking/peso-repeticiones`),
          axios.get(`${import.meta.env.VITE_APP_API}/actividades/ranking/peso-total`)
        ]);

        const cantidadActividades = cantidadActividadesResponse.data;
        const pesoRepeticiones = pesoRepeticionesResponse.data;
        const pesoTotal = pesoTotalResponse.data;

        // Transformar los datos
        this.rankingCombinado = cantidadActividades.map((item, index) => {
          const usuarioNombre = item.usuarioNombre || `Usuario ${item.usuarioId}`;
          const pesoRepeticionesData = pesoRepeticiones.find(p => p.usuarioId === item.usuarioId) || {};
          const pesoTotalData = pesoTotal.find(p => p.usuarioId === item.usuarioId) || {};

          return {
            position: index + 1,
            usuario: usuarioNombre,
            actividades: item.cantidadActividades,
            pesoRepeticiones: pesoRepeticionesData.pesoRepeticiones || 0,
            pesoTotal: pesoTotalData.pesoTotal || 0
          };
        });

      } catch (error) {
        console.error("Error al obtener los rankings:", error);
      }
    },
  },
  created() {
    this.fetchRanking();
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

.v-card {
  background-color: #f5f5f5;
  border-radius: 15px;
}

.v-btn {
  font-weight: bold;
  background-color: #5a9bb9;
}

.v-data-table-header th {
  color: black;
}

.v-chip {
  font-weight: bold;
  background-color: #5a9bb9;
  color: white;
}

.custom-chip {
  color: black; /* Cambia el color del texto a negro */
  /* Color de fondo, puedes ajustarlo según tu diseño */
  font-weight: bold; /* Opcional: para hacer el texto en negrita */
}
</style>
