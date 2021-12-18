import Route from '@ioc:Adonis/Core/Route'
Route.group(()=>{

 Route.post('/createUser', 'User/UserController.createUser')
 Route.get('/getUsers', 'User/UserController.getUsers')
 Route.post('/deleteUser', 'User/UserController.deleteUser')
 Route.post('/editUser', 'User/UserController.editUser')
 Route.post('/uploadImage', 'User/UserController.upload')

}).prefix('user')
