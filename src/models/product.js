'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criando schema para delimitarmos o que irá compor nossa entidade
const schema = new Schema({
    //Id vai ser criado automaticamente, sem necessidade de inseri-lo.
    title:{ //Titulo da entidade
        type: String, // => é do tipo string
        required : true, // => É requerido, ou seja, eu devo passar
        trim : true // => Titulo vai ser trim, ou seja, não terá espaço entre palavras/nome
    },
    slug: { //Item do produto que vai compor a URL => Cadeira Gamer = cadeira-gamer
        type: String,
        required: true,
        trim: true,
        index: true,
        unique:true
    },
    description:{ //Descrição do produto
        type: String,
        required : true,
        trim: true
    },
    price: { //Preço do produto
      type: Number,
      required: true  
    },
    active: { //Se o produto ta ativo ou nao
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{ //Tags do produto.
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('Product', schema);