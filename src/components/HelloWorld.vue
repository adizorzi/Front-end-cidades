<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <div class="container">
      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="cidade.nome">
          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="cidade of cidades" :key="cidade.id">

            <td>{{cidade.nome}}</td>
            <td>
              <button @click="editar(cidade)" class="waves-effect btn-small blue darken-1"><i class="fas fa-cloud">Tempo</i></button>
              <button @click="editar(cidade)" class="waves-effect btn-small grenn darken-1"><i class="material-icons">create</i></button>
              <button @click="excluir(cidade)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>
<script>
import Cidade from './services/cidades'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      cidade: {
        id:'',
        nome:''
      },
      cidades: []
    }
  },

  mounted(){
    this.listar()
  },
  
  methods: {

    listar() {
      Cidade.listar().then(resposta =>{
        this.cidades = resposta.data
      })
    },

    salvar() {

      if(!this.cidade.id){
        Cidade.salvar(this.cidade).then(resposta => {
          this.cidade = {}
          alert("Salvo com sucesso!")
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }else{
        console.log(Cidade)
        Cidade.atualizar(this.cidade).then(resposta => {
          this.cidade = {}
          alert("Atualizado com sucesso!")
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
    },

    editar(cidade) {
      this.cidade = cidade
    },

    excluir(cidade) {
      if(confirm('Deseja excluir a cidade?')){
        Cidade.deletar(cidade).then(resposta => {
            this.listar();
          this.excluir = []
        }).catch(e => {
          this.errors - e.response.data.errors
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
