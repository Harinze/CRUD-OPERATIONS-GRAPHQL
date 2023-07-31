import { comparePassWord, decode, genToken, hashPassword } from "../helper/helper-functions";
import { UserModel } from "../mongoose-schema/userModel";
import { GraphQLError } from "graphql";




const graphQlError = (message:string) => {
  throw new GraphQLError(message, {
    extensions: {
      code: "BAD_USER_INPUT",
    },
  });
};


export const authenticateUser = async (token: string) => {
  const { id } = decode(token);

  const user = await UserModel.findById(id);

  return user;
};


export interface usersLogic {
  
  email: string,
  name: string,
  password: string
}

export const insertUser = async ({ email, name, password }:usersLogic) => {
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
     return graphQlError(`${user} is already in use`);
    }

    const newUser: any = new UserModel({
      email,
      name,
      password,
    });

    const hashedPassword = await hashPassword(newUser.password);
    newUser.password = hashedPassword;
    

    const savedUser = await newUser.save();
    return savedUser;

  } catch (error) {
    console.log(error);
    return error;
  }
};


export const getAllUsers = async () => {
  const users = await UserModel.find();
  return users;
};


export const getSingleUser = async (id:string) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
     return graphQlError("User not found");
    }
    return user;

  } catch (error) {
    return error;
  }
};



export const logUserIn = async ({ email, password }:{email:string,password:string}) => {
  try {
    const aUser = await UserModel.findOne({ email });
   
    if (!aUser) {
      return graphQlError("Email does not exist. Please register");
    }
    const verifyPassword = await comparePassWord(aUser, password);
    

    if (!verifyPassword) {
      return graphQlError("Invalid Login");
    }
    const token = genToken({ email, id: aUser?._id?.toString() as string });
   
    aUser.token = token;
    return aUser;

  } catch (error) {
    return error;
  }
};

export interface userId extends usersLogic {
  _id: string
}

export const editUser = async ({
  _id,
  email,
  password,
  name
}:userId) => {
  try {
    const update = {
      email,
      password,
      name
    };


    const editedUser = await UserModel.updateOne({_id}, update);
    return editedUser.modifiedCount;
  } catch (error) {
    return error;
  }
};

export const removeUser = async (id:string) => {
  try {
    const user =  await UserModel.findById(id)

    if(!user) {
     return graphQlError("User not found")
    }

    const removedUser = await UserModel.findByIdAndDelete(id)
    return {message: "User deleted successfully"}

  } catch (error) {
    return error
  }
}

