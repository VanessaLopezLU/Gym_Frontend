<template>
  <v-container class="align-start contenedor">
    <v-responsive class="align-start mx-auto" max-width="900">
      <v-row class="justify-center inicio">
        <v-col cols="6">
          <v-card>

            <h1>Inicio de Sesion</h1>
            <form @submit.prevent="submit" class="form">
              <v-text-field v-model="paqueteUsuario.usuario"  label="Usuario"></v-text-field>
              <v-text-field v-model="paqueteUsuario.contrasena"  label="contraseña"></v-text-field>
              <v-text-field v-model="paqueteUsuario.email" :error-messages="email" label="E-mail"></v-text-field>
              <v-text-field v-model="paqueteUsuario.nombre"  label="Nombre"></v-text-field>
              <v-text-field v-model="paqueteUsuario.edad"  label="Digite su edad"></v-text-field>
              <v-text-field v-model="paqueteUsuario.peso"  label="Digite su peso"></v-text-field>
              <v-text-field v-model="paqueteUsuario.altura"  label="Digite su altura"></v-text-field>
              <v-select v-model="paqueteUsuario.id_rol"   label="seleccione su rol"></v-select>

              

              <v-btn class="me-6 " type="submit">
                submit
              </v-btn>
              
            </form>



          </v-card>

        </v-col>
      </v-row>



    </v-responsive>
  </v-container>
</template>

<script>
export default{
   data() {
    return {
      paqueteUsuario:{
        usuario:null,
        contrasena:null,
        email:null,
        nombre:null,
        edad:null,
        peso:null,
        altura:null,
        id_rol:null,

      }
      
    }
   },

}

</script>

<style>
.inicio {
  width: 100%;
  height: auto;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  text-align: center;
  color: black;
}

.contenedor {
  background-color: rgb(90, 155, 185);
}
</style>
