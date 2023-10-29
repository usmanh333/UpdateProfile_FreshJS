
import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import {db} from '../connection.ts'
import { Profile } from "./schema.ts";

const userCollection = db.collection<Profile>('users')

export async function createUser(params:Profile) {
    try {
        const createUser = await userCollection.insertOne(params);
        return createUser.toString();
    } catch (error) {
        throw new Error(error);
    }
}

export async function fetchUsers() {
    try {
        const users = await userCollection.find();
        return users.toArray();
    } catch (error) {
        console.error(error);
    }
}

export async function fetchUser(id:string) {
    try {
        const user = await userCollection.findOne({_id:new ObjectId(id)});
        return user;
    } catch (error) {
        console.error(error);
    }
}

export async function updateUser(id:string, params:Profile) {
    try {
        const updateUser = await userCollection.updateOne(
            {_id:new ObjectId(id)}, 
            {$set:params}
        );
        return updateUser;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteUser(id:string) {
    try {
        const deleteUser = await userCollection.deleteOne({_id:new ObjectId(id)});
        return deleteUser;
    } catch (error) {
        console.error(error);
    }
}