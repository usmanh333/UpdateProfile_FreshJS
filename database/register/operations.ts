import { db } from "../connection.ts";
import { Register } from "./schema.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { create } from "https://deno.land/x/djwt@v2.9.1/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { key } from "../../utils/key.ts";


const userCollection = db.collection<Register>('registerUsers')

export async function createRegisterUser(params:Register) {
    try {
        const {username, email, password, image} = params
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);
        const resp = {
            username,
            email,
            password:hashedPassword,
            image,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        }
        const createUser:any = await userCollection.insertOne(resp);
        return createUser.toString();
    } catch (error) {
        throw new Error(error);
    }
}

export async function loginUser(email: string, password: string) {
    try {
        const user = await userCollection.findOne({ email });
        if (!user) {
            throw new Error("Invalid username or password");
        }
        const confirmPassword = await bcrypt.compare(password, user.password);
        if (!confirmPassword) {
            throw new Error("Invalid username or password");
        }
        //authenticate a user
        const payload = {
            id: user._id,
            email: email
        };
        const jwt =  await create({ alg: "HS512", typ: "JWT" }, { payload }, key);
        if (jwt) {
            // If the JWT is successfully created, send a response
            return {
              status: 200,
              body: {
                userId: user._id,
                username: user.username,
                token: jwt,
              },
            };
          } else {
            // If there was an issue creating the JWT, send an error response
            return {
              status: 500,
              body: {
                message: "Internal server error",
              },
            };
          }
    
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}