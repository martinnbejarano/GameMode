import mongoose, { Schema, Document } from 'mongoose';

export interface IPurchase extends Document {
  game: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  company: mongoose.Types.ObjectId;
  price: number;
  cardDetails: {
    number: string;
    expiryDate: string;
    cvv: string;
    holderName: string;
  };
  purchaseDate: Date;
}

const purchaseSchema = new Schema({
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  cardDetails: {
    number: {
      type: String,
      required: true
    },
    expiryDate: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true
    },
    holderName: {
      type: String,
      required: true
    }
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

export const Purchase = mongoose.model<IPurchase>('Purchase', purchaseSchema); 