'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');

//Rota Get dos produtos cadastrados
exports.getAllProducts = (req,res,next) => {
    Product
    .find({ 
        active: true 
    }, 'title price slug') //Mostrar exatamente oq eu quero na resposta do json
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

//Rota Get dos produtos pelo codigo Slug
exports.getProductBySlug = (req,res,next) => {
    Product
    .findOne({ 
        slug: req.params.slug, 
        active: true 
    }, 'title description price slug tags') //Mostrar exatamente oq eu quero na resposta do json
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getProductByTag = (req,res,next) =>{
    Product
    .find({
        tags: req.params.tags,
        active:true
    }, 'title description price slug tags')
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
    
}

//Rota get dos produtos pelo Id
exports.getProductById = (req,res,next) => {
    Product
    .findById(req.params.id) //Mostrar exatamente oq eu quero na resposta do json
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

//Rota Post para cadastro de produto
exports.post = (req,res,next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3,'Título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3,'Slug deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3,'Descrição deve conter pelo menos 3 caracteres.');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    var product = new Product(req.body);
    product
    .save()
    .then(x => {
        res.status(201).send({ 
            message: 'Produto Cadastrado com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({ 
            message: 'Falha ao cadastrar o Produto', 
            data: e
        });
    });
    
}

//Rota Put para atualização de dados de um produto
exports.put = (req,res,next) => {
    Product
    .findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(x => {
        res.status(200).send({
            message: 'Produto Atualizado com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao atualizar o produto',
            data: e
        });
    });
}

//Rota Delete para exclusão de um produto
exports.delete = (req,res,next) => {
    Product
    .findOneAndRemove(req.params.id)
    .then(x => {
        res.status(200).send({
            message: 'Produto Removido com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao remover o produto',
            data: e
        });
    });
}