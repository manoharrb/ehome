import { RequestHandler } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import User from "../model/User";
import Product from "../model/Product";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { FRONTEND_URL, JWT_KEY, transporter } from "../config";
import nodemailer from "nodemailer";

export const createProduct: RequestHandler = async (req, res, next) => {
  const { location,category,recommended,newlyAdded } = req.body;
  console.log(location,category,recommended,newlyAdded);
  try {
    const product = new Product({location:location, category:category, recommended:recommended,newlyAdded:newlyAdded  });
    await product.save();
    res.json({ message: "Product details have been added!!" });
  } catch (error) {
    console.log(error);
    return next(InternalServerError);
  }
};


export const getProduct: RequestHandler = async (req, res, next) => {
      const { location} = req.body;
    //const location:string = req.query.location!; 
    console.log(location);
    try {   
        const productDetails = await Product.find({location:location});
        console.log(productDetails );
        if (productDetails) {
          return res.status(200).send(productDetails);
        }
    
        res.status(404).send("Product details not found"); 
     
    } catch (error) {
      return next(InternalServerError);
    }
  };

  export const addFavourite: RequestHandler = async (req, res, next) => {
    var { productId} = req.body;
  //const location:string = req.query.location!;
 
  console.log(productId);

  try {   
      const productDetails = await Product.findById(productId);
      var query = {'_id': productId};

      console.log(productDetails );
      if (!productDetails) {
        return  next(createHttpError(404, "product details  not found"));
      }
      await Product.findOneAndUpdate(query,{isFavourite:true} , {upsert: true});

      res.status(200).send("Product has been added to favourites"); 
   
  } catch (error) {
    return next(InternalServerError);
  }
};

export const getFavourites: RequestHandler = async (req, res, next) => {
try {   
  const productDetails = await Product.find({isFavourite:true});
  console.log(productDetails );
  if (productDetails) {
    return res.status(200).send(productDetails);
  }else{
  res.status(404).send("Product details not found"); 
  }
} catch (error) {
  return next(InternalServerError);
}
};
