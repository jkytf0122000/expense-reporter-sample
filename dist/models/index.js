"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_generator_1 = require("../../utils/model_generator");
const db_1 = __importDefault(require("../../config/db"));
const schema_1 = __importDefault(require("./schema"));
const setModel = (sequelize) => {
    const db = {};
    Object.keys(schema_1.default).forEach(tableName => {
        db[tableName] = schema_1.default[tableName].factory(sequelize);
    });
    // associationを貼るのは各Modelのinit()が全て終わってから
    // (全モデルのinit()が終わる前にassociationを貼るとそんなモデル知らないみたいなエラーで死ぬ）
    Object.keys(schema_1.default).forEach(tableName => {
        if ('associate' in db[tableName]) {
            db[tableName].associate(db);
        }
    });
    return db;
};
const modelGenerator = model_generator_1.hogeModelGenerate(db_1.default.service);
const db = modelGenerator(setModel);
exports.default = db;
