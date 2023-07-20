import { ticketModel } from "../db/models/ticket.model.js";

class Ticketrepository{
    create = async(ticket) => {
        const newTicket = new ticketModel(ticket);
        const saveTicket = await newTicket.save();
        return saveTicket;
    }
}

export default Ticketrepository;