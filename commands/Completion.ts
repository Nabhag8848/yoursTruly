import {
    IRead,
    IModify,
    IHttp,
    IPersistence,
    IModifyCreator,
    IMessageBuilder,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { AppSetting } from "../config/Settings";
import {
    TextObjectType,
    UIKitSurfaceType,
} from "@rocket.chat/apps-engine/definition/uikit";
import { BlockElementType } from "@rocket.chat/apps-engine/definition/uikit";
import { ButtonStyle } from "@rocket.chat/apps-engine/definition/uikit";
import { CodeModal } from "../modals/CodeModal";
import { storeInteractionRoomData } from "../persistance/roomInteraction";

export class CompletionCommand implements ISlashCommand {
    public command: string = "ai";
    public i18nDescription: string = "Generates a predictive Completion";
    public i18nParamsExample: string = "";
    public providesPreview: boolean = false;

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persistence: IPersistence
    ): Promise<void> {
        // First of all open the Modal
        const modal = CodeModal(modify);
        const room = context.getRoom();
        const user = context.getSender();

        await storeInteractionRoomData(persistence, user.id, room.id);

        await modify.getUiController().openModalView(
            modal,
            {
                triggerId: context.getTriggerId() as string,
            },
            context.getSender()
        );
    }
}
