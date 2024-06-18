"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_models_1 = require("../domain/product.models");
const send_res_1 = require("../../../helpers/send.res");
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = (yield product_models_1.ProductModel.find())
                .filter(product => product.inStock !== 0);
            return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', products);
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            if (!productId)
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            const product = yield product_models_1.ProductModel.findById(productId);
            if (!product)
                return (0, send_res_1.sendRes)(res, 200, false, 'Producto no encontrado', '');
            return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', product);
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function saveProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prod = req.body;
            const Product = new product_models_1.ProductModel(prod);
            yield Product.save();
            return (0, send_res_1.sendRes)(res, 200, true, 'Producto guardado con éxito', '');
        }
        catch (error) {
            console.log(error);
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function editProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prod = req.body;
            const product = yield product_models_1.ProductModel.findById(prod._id);
            if (!product)
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            const product_obj = Object.assign(product, prod);
            yield product_models_1.ProductModel.findByIdAndUpdate(prod._id, product_obj);
            return (0, send_res_1.sendRes)(res, 200, true, 'Producto Editado', '');
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
function deleteProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            if (!productId)
                return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
            yield product_models_1.ProductModel.deleteOne({ _id: productId });
            return (0, send_res_1.sendRes)(res, 200, true, 'Producto Eliminado', '');
        }
        catch (error) {
            return (0, send_res_1.sendRes)(res, 200, false, 'Ha ocurrido algo grave', '');
        }
    });
}
exports.ProductControllers = {
    deleteProductById,
    getAllProducts,
    getProductById,
    saveProduct,
    editProduct,
};
