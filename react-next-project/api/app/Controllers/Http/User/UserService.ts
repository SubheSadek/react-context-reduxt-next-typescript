
import UserQuery from './UserQuery';

export default class UserService {
    private userQuery : UserQuery
    constructor(){
      this.userQuery = new UserQuery
    }

    public async createUser(ctx){
      let data = ctx.request.all();
      return this.userQuery.createUser(data)
    }

    public async getUsers(){
      return this.userQuery.getUsers();
    }

    public async deleteUser(ctx){
      return this.userQuery.deleteUser(ctx);
    }

    public async editUser(ctx){
      return this.userQuery.editUser(ctx);
    }

    public async upload(ctx){
      return this.userQuery.upload(ctx);
    }



};
