import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from './UserService';
import UserValidator from './UserValidator';


export default class UserController {
  private userService : UserService
  private userValidator : UserValidator

  constructor () {
    this.userService =  new UserService()
    this.userValidator =  new UserValidator()
  }

  async createUser(ctx : HttpContextContract){
    await this.userValidator.validateCreateUser(ctx)
    return this.userService.createUser(ctx);
  }


  async getUsers(){
    return this.userService.getUsers();
  }

  async deleteUser(ctx : HttpContextContract){
    return this.userService.deleteUser(ctx);
  }

  async editUser(ctx : HttpContextContract){
    return this.userService.editUser(ctx);
  }

  async upload(ctx : HttpContextContract){
    return this.userService.upload(ctx);
  }




}
