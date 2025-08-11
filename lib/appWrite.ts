import SignIn from "@/app/(auth)/SignIn";
import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";


export const appWriteConfig={
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform:"com.jsm.fast-food",
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId:"68996d6a0035ba972819",
    userCollectionId:"68996d97000d8dabd1b9",
}

export const client  = new Client();

client
    .setEndpoint(appWriteConfig.endpoint)
    .setProject(appWriteConfig.projectId)
    .setPlatform(appWriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);

const avatars = new Avatars(client);

export const createUser = async ({email,password,name}: CreateUserParams)=>{
    try {
        const newAccount = await account.create(ID.unique(), email , password ,name)
        if(!newAccount) throw Error;

        await SignIn({email,password});

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            {
                email,name,
                accountId : newAccount.$id,
                avatar : avatarUrl
            }
        )
        
    } catch (error) {
        throw new Error(error as string)
    }
}


export const signIn = async ({email,password}: SignInParams )=>{
    try {
        
        const session = await account.createEmailPasswordSession(email,password)

    } catch (error) {
            throw new Error(error as string)
    }
}