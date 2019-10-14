<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <span href="#" class="brand-logo center">Previsão do tempo</span>
      </div>
    </nav>
    <div class="container" id="cad-cidades" >
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
              <button title="Previsão" @click="prev(cidade)" class="waves-effect btn-small blue darken-1"><i class="material-icons">beach_access</i></button>
              <button title="Editar" @click="editar(cidade)" class="waves-effect btn-small grenn darken-1"><i class="material-icons">create</i></button>
              <button title="Deletar" @click="excluir(cidade)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
        </tbody>
      </table>
    
    </div>
    <div  class="container" id="block-previsao">
      <h4>
        {{city}}
        <button @click="voltar(cidade)" title="Voltar" class="waves-effect btn-small blue darken-1">
          <i class="material-icons">chevron_left</i>
        </button>
      </h4>
      <div v-for="pr of previ" :key="pr.id" id="previsao">
          <div class="previsao-tempo col-sm-6">
            <div class="bloco">
              <img class="img-previsao" v-bind:src="`http://openweathermap.org/img/wn/${pr.weather[0].icon}.png`" alt="">
              <div>{{ day(pr.dt) }}</div>
            </div>
            <div class="bloco">
              <div class="descricao">Tempo: {{pr.weather[0].description}}</div>
              <div class="maxima">Máxima: {{pr.temp.max}}º</div>
              <div class="minima">Minima: {{pr.temp.min}}º</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import Cidade from './services/cidades'
  import moment from 'moment'
  import 'moment/locale/pt-br';

  export default {
    data(){
      return{
        cidade: {
          id:'',
          nome:''
        },
        cidades: [],
        previ: [],
        city:[],
      }
    },

    mounted(){
      this.listar()
    },
    
    methods: {
      day(date){
        return moment.unix(date).format('dddd, DD/MM/YYYY')
      },

      moment: function() {
        moment.locale('pt-BR');
        return moment();
      },

      listar() {
        Cidade.listar().then(resposta =>{
          this.cidades = resposta.data
        })
      },

      salvar() {
        if(!this.cidade.id){
          Cidade.salvar(this.cidade).then(resposta => {
            alert(resposta.data)
            this.cidade = {}
            this.listar()
          })
        }else{
          Cidade.atualizar(this.cidade).then(resposta => {
            this.cidade = {}
            alert(resposta.data)
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
          }).catch(e => {
            this.errors - e.response.data.errors
          })
        }
      },
      prev(cidade) {
        Cidade.previsao(cidade).then(resposta =>{
          this.previ = resposta.data.list
          this.city = resposta.data.city.name + '-' + resposta.data.city.country
        })
          path = "previsao"
          this.setTemplate()
      },
      setTemplate(){
        if(path == 'cidade'){
          document.getElementById ('block-previsao').style.display = "none"
          document.getElementById ('cad-cidades').style.display = "block"
        }else{
          document.getElementById ('block-previsao').style.display = "block"
          document.getElementById ('cad-cidades').style.display = "none"
        }
      },

      voltar(){
        path = "cidade"
        this.setTemplate()
      }
    },
  }
  var path = "cidade"
</script>
<style scoped>
  #block-previsao {
    display: none;
  }
  .previsao-tempo {
    width: 60%;
    margin-left: 15%;
  }
  #previsao {
    border: 1px #e9ebee solid;
    padding: 11px 28px;
    margin-top:10px;
  }

  .bloco {
    display: inline-block;
    padding: 0px 10px;
  }

  .img-previsao {
    width: 72px;
  }
</style>