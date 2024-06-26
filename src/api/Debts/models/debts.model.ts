import mongoose from 'mongoose';

const DebtSchema = new mongoose.Schema({

  type: {
    type: mongoose.Types.ObjectId,
    ref: 'debtsTypes',
    require: true
  },
  money: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  }

});

export const DebtModel = mongoose.model('debts', DebtSchema)