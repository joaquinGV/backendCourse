import { messagesModel } from "../dbManagers/models/messages.model.js";

export default class Messages {
  constructor() {
    console.log("Working messages with DB");
  }

  getAll = async () => {
    const messages = await messagesModel.find().lean();
    return messages;
  };

  save = async (message) => {
    const result = await messagesModel.create(message);
    return result;
  };
}
