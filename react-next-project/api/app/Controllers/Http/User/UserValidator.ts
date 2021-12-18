import { schema,rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class UserValidator{

    public async validateCreateUser(ctx : HttpContextContract){
      const userSchema = schema.create({
        email: schema.string({}, [
          rules.email({
            sanitize: true,
            ignoreMaxLength: false,
          }),
          rules.unique({ table: 'users', column: 'email' }),
        ]),
        name : schema.string({
          escape: true,
          trim: true
        }),
        title : schema.string({
          escape: true,
          trim: true
        }),
        image : schema.string({
          escape: true,
          trim: true
        }),


      })
      const msg =  {
        'email.required': 'Email is required',
        'email.unique': 'Email is already in use',
        'email.email': 'Invalid email address',
      }
      //return await ctx.request.validate({ schema: userSchema, messages : msg })
      try {
        const payload = await ctx.request.validate({ schema: userSchema, messages : msg })
        return payload
      } catch (error) {
         return ctx.response.status(422).send(error.messages)
      }



    }
    public async validateLoginSchema(ctx : HttpContextContract){
      const userSchema = schema.create({
        email: schema.string({trim: true}, [
          rules.email({
            sanitize: true,
          }),

        ]),
        password: schema.string({trim: true,}),


      })
      const msg =  {
        'email.required': 'Email is required',
        'password.required': 'Password is required',

      }
      try {
        const payload = await ctx.request.validate({ schema: userSchema, messages : msg })
        return payload
      } catch (error) {
         return ctx.response.status(422).send(error.messages)
      }



    }


}
