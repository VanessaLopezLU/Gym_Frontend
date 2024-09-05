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
              <v-form ref="formRegister" v-model="validRegister" lazy-validation>
                <v-text-field v-model="paqueteUsuario.usuario" label="Usuario" outlined dense clearable
                  prepend-inner-icon="mdi-account" color="black" class="text-black"
                  :rules="[v => !!v || 'El usuario es requerido']" required></v-text-field>

                <v-text-field v-model="paqueteUsuario.contrasena" label="Contraseña" outlined dense clearable
                  prepend-inner-icon="mdi-lock" type="password" color="black" class="text-black" :rules="passwordRules"
                  required></v-text-field>

                <v-text-field v-model="paqueteUsuario.email" label="E-mail" outlined dense clearable
                  prepend-inner-icon="mdi-email" color="black" class="text-black" :rules="emailRules"
                  required></v-text-field>

                <v-text-field v-model="paqueteUsuario.nombre" label="Nombre" outlined dense clearable
                  prepend-inner-icon="mdi-account-box" color="black" class="text-black"></v-text-field>

                <v-text-field v-model="paqueteUsuario.edad" label="Digite su edad" outlined dense clearable
                  prepend-inner-icon="mdi-cake-variant" type="number" color="black" class="text-black"
                  :rules="[v => !!v || 'La edad es requerida']" required></v-text-field>

                <v-text-field v-model="paqueteUsuario.peso" label="Digite su peso (kg)" outlined dense clearable
                  prepend-inner-icon="mdi-scale" type="number" color="black" class="text-black"
                  :rules="[v => !!v || 'El peso es requerido']" required></v-text-field>

                <v-text-field v-model="paqueteUsuario.altura" label="Digite su altura (cm)" outlined dense clearable
                  prepend-inner-icon="mdi-ruler"  type="number" color="black" class="text-black"
                  :rules="[v => !!v || 'La altura es requerida']" required></v-text-field>

                <v-select v-model="paqueteUsuario.rol" :items="roles" label="Seleccione el rol" item-title="rol"
                  item-value="id" color="black" class="text-black" prepend-inner-icon="mdi-account"
                  :rules="[v => !!v || 'El rol es requerido']" required></v-select>


                <v-card-actions class="justify-center">
                  <v-btn @click="registerUser" class="mt-6 btn" type="submit" block>
                    Registrarse
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
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
      paqueteUsuario: {
        usuario: null,
        contrasena: null,
        email: null,
        nombre: null,
        edad: null,
        peso: null,
        altura: null,
        rol: null,
      },
      validRegister: false,
      roles:[],
      emailRules: [
        v => !!v || 'El correo es requerido',
        v => /.+@.+\..+/.test(v) || 'Correo inválido'
      ],
      passwordRules: [
        v => !!v || 'La contraseña es requerida',
        v => v.length >= 6 || 'Mínimo 6 caracteres'
      ],
    };
  },
  methods: {
    async registerUser() {
      if (!this.validRegister) return;

      try {
        const apiUrl = `${import.meta.env.VITE_APP_API}/auth/registro`;
        await axios.post(apiUrl, this.paqueteUsuario);
        
        Swal.fire('Éxito', 'Registro exitoso', 'success');
        this.$router.push('/');
      } catch (error) {
        Swal.fire('Error', 'No se pudo registrar el usuario', 'error');
      }
    },
    async ObtenerRol() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/roles/obtener`
        );
        this.roles = response.data;
        console.log(this.roles);
      } catch (error) {
        console.error(
          "Error al obtener los roles:",
          error.response ? error.response.data : error.message
        );
      }
    },
  },
  created() {
    this.ObtenerRol();
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

.btn {
  background-color: #5a9bb9;
  color: #f5f5f5;
}
</style>
