import Userrepository from '../service/repositories/users.repository.js'
import moment from 'moment/moment.js'
import nodemailer from 'nodemailer'
import { userModel } from '../service/db/models/user.model.js'

const controller = new Userrepository

export const deleteUser = async(req, res) => {
    try {
        const deletedUser = await controller.delete(req.params.email)
        req.logger.info('Usuario eliminado')
        res.status(200).send(deletedUser)
    } catch (error) {
        req.logger.error(error)
        return res.status(500).send({status: "error", message : error.message});
    }
}

export const updateUser = async(req, res) => {
    try {
        //se promueve el rol del usuario a administrador
        const updatedUser = await controller.update(req.params.email)
        req.logger.info('usuario promovido a administrador')
        res.status(200).send(updatedUser)
    } catch (error) {
        req.logger.error(error)
        return res.status(500).send({status: "error", message : error.message});
    }
}

export const deleteMany = async(req, res) => {
  try {
      //se elimina a todos los uauarios que no se loguean hace mas de 2 dias
      const twoDaysAgo = moment().subtract(2, 'days').toDate();

      let deletedUsers = []
      const users = await userModel.find();
      
      for(let i = 0; i<users.length; i++ ){
        if(users[i].lastLogin < twoDaysAgo){
          deletedUsers.push(users[i]);
        }
      }
      
      const result = await userModel.deleteMany({ lastLogin: { $lt: twoDaysAgo } })

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 587,
        auth: {
          user: '61k4r16@gmail.com',
          pass: 'mbfucnhibzjxniik',
        },
      });

      //se envia un mail a cada usuario eliminado
      for (const user of deletedUsers) {
        const mailOptions = {
          from: '61k4r16@gmail.com',
          to: user.email, 
          subject: 'notificacion: eliminacion de usuario',
          text: 'Su usuario se ha dado de baja debido a inactividad.',
        };
      
        await transporter.sendMail(mailOptions);
      }



      if (result.deletedCount > 0) {
        return res.status(200).json({
          message: `${result.deletedCount} usuarios inactivos eliminados correctamente.`,
        });
      } else {
        return res.status(404).json({ message: 'No hay usuarios inactivos en este momento.' });
      }

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }

}
