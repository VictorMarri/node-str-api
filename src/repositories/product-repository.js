'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAllProducts = () => {
    return Product
    .find({
        active: true
    }, 'title price slug');
}

exports.getProductBySlug = (slug) => {
    return Product
    .findOne({ 
        slug: slug, 
        active: true 
    }, 'title description price slug tags');
}

exports.getProductById = (id) => {
    Product
    .findById(id);
}

exports.getProductByTag = (tag) => {
    return Product
    .find({
        tags: tag,
        active:true
    }, 'title description price slug tags')
}

exports.create = (body) => {
    var product = new Product(body);
    return product.save();
} 

exports.update = (id, data) => {
    return Product
    .findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
}

exports.delete = (id) => {
    return Product
    .findOneAndRemove(id);
}