import "dotenv/config";

export const EnvConfig ={
  DATABASE: {
    HOST_DB: process.env.HOST_DB,
    PORT_DB: +process.env.PORT_DB,
    USER_DB: process.env.USER_DB,
    PASSWORD_DB: process.env.PASSWORD_DB,
    NAME_DB: process.env.NAME_DB,
    URL: process.env.URL_DATABASE,        
}, 
   JWT_SECRET: process.env.JWT_SECRET

}