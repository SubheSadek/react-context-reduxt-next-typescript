import User from '../../../Models/User'

import { cuid } from '@ioc:Adonis/Core/Helpers'
import Application from '@ioc:Adonis/Core/Application'
export default class UserQuery{

  async createUser(data){
    return User.create(data);
  }

  async getUsers(){
    return User.all();
  }

  async deleteUser(ctx){
    let id = ctx.request.all().user_id;
    return User.query().where('id', id).delete();
  }

  async editUser(ctx){
    let data = ctx.request.all();
    let uid = data.id;
    delete data.id;
    delete data.isShow;
    return User.query().where('id', uid).update(data);
  }

  async upload(ctx){
    const images = ctx.request.files('image')

    for(let image of images){

      let fileName = `${cuid()}.${image.extname}`;
      await image.move(Application.tmpPath('uploads'),{
        name: fileName,
      })

      fileName = process.env.UPLOAD_URL+ '/uploads/'+fileName ;
      return fileName;

    }






    // return image.type;
      // let fileName = `${cuid()}.${image.extname}`;
      // await image.move(Application.publicPath('uploads'),{
      //   name: fileName,
      // })
      // let d= await  Drive.getSignedUrl('cdn')

    //  await image.move(Application.tmpPath('uploads'),{
    //     name: fileName,
    //   })
      // let imgObj = {
        //  fileLoc : process.env.UPLOAD_URL+ '/uploads/'+fileName,
        //  fileLoc : 'https://cdn.socialnetworkstage.com/cdn/'+fileName,
        //  fileLoc : process.env.UPLOAD_URL+fileName,
        //  originalName: image.clientName,
        //  extname: image.extname,
        //  size: image.size,
        //  type:  ctx.request.all().uploadType
      // }

    //   fileName = process.env.UPLOAD_URL+ '/uploads/'+fileName ;

    // return fileName;
  }



}
