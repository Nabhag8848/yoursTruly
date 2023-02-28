import { IModify } from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export async function sendNotification(
    modify: IModify,
    room: IRoom,
    sender: IUser,
    message: string
): Promise<void> {
    let msg = modify.getCreator().startMessage().setRoom(room).setText(message);

    const block = modify.getCreator().getBlockBuilder();

    block.addSectionBlock({
        text: block.newMarkdownTextObject(message),
    });

    msg.setBlocks(block);
    
    return await modify.getNotifier().notifyUser(sender, msg.getMessage());
}
