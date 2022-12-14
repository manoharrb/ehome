import { RequestHandler } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import Ad from "../model/Ad";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { FRONTEND_URL, JWT_KEY, transporter } from "../config";
import nodemailer from "nodemailer";

export const postAd: RequestHandler = async (req, res, next) => {
  const { location,category,recommended,newlyAdded } = req.body;
  try {
    const ad = new Ad(req.body);
    await ad.save();
    res.json({ message: "Advertise details have been added successfully!" });
  } catch (error) {
    console.log(error);
    return next(InternalServerError);
  }
};


export const getAds: RequestHandler = async (req, res, next) => {
    
   
    console.log('req',req.query);
    try {   
      let adsList = [];
      if(req.query){
        adsList = await Ad.find(req.query);
      }else{
        adsList = await Ad.find();
      }
        
     
        if (adsList) {
          return res.status(200).send(adsList);
        }
        res.status(404).send("Ads details not found"); 
    } catch (error) {
      return next(InternalServerError);
    }
  };