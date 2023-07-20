import { userModel } from "../db/models/user.model.js";

class Usersrepository {

    update = async(email) => {
        const user = await userModel.findOne({ email: email});
        console.log(user)
        user.role = "admin"

        const updatedUser = await user.save();
        return updatedUser;
    }

    delete = async(email) => {
        const deletedUser = await userModel.deleteOne({ email: email});
        return deletedUser;
    }
}

export default Usersrepository