import { http } from "./config";

export default {

    listar:() => {
        return http.get('cidades')
    },

    salvar:(cidade) => {
        return http.post('cidade', cidade)
    },

    atualizar:(cidade) =>{
        return http.put('cidade', cidade)
    },

    deletar:(cidade) => {
        return http.delete('cidade', {data: cidade})
    },
    
    previsao:(cidade) => {
        return http.get('previsao', {params: {id: cidade.id}})
    }
}