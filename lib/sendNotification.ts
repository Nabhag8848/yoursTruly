import { IModify } from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export async function sendNotification(
    modify: IModify,
    room: IRoom,
    sender: IUser,
    message: string,
    attachements?: boolean
): Promise<void> {
    let msg = modify.getCreator().startMessage().setRoom(room);

    if (attachements) {
        msg.setAttachments([
            {
                imageUrl:
                    "https://res.cloudinary.com/dim2ekub1/image/upload/c_scale,w_128/v1677881322/yoursTrulyLogo_ufdc1x.png",
            },
        ]);
    }

    msg.setText(message);

    const block = modify.getCreator().getBlockBuilder();

    block.addSectionBlock({
        text: block.newMarkdownTextObject(message),
    });

    msg.setBlocks(block);

    return await modify.getNotifier().notifyUser(sender, msg.getMessage());
}
