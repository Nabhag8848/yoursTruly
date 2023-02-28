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
    ISlashCommandPreview,
    ISlashCommandPreviewItem,
    SlashCommandContext,
    SlashCommandPreviewItemType,
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
import { OptionModal } from "../modals/Option";
import { yoursTrulyApp } from "../yoursTrulyApp";
import { sendNotification } from "../lib/sendNotification";

export class YoursTrulyCommand implements ISlashCommand {
    public command: string = "yourstruly";
    public i18nDescription: string = "Generates a predictive Completion";
    public i18nParamsExample: string = "";
    public providesPreview: boolean = false;

    constructor(private readonly app: yoursTrulyApp) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persistence: IPersistence
    ): Promise<void> {
        // First of all open the Modal
        const params = context.getArguments()[0];

        switch (params) {
            case "code": {
                const modal = OptionModal(modify);
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

                break;
            }
            case "sql": {

                break;
            }
            case "help": {
                const user = context.getSender();
                const helperText =
                    "You can run:\n" +
                    "`/yourstruly code` to translate, generate, get output or explanation of code\n" +
                    "`/yourstruly sql` to generate sql queries\n" +
                    "`/yourstruly help` to get the help about using commands\n";

                await sendNotification(
                    modify,
                    context.getRoom(),
                    user,
                    helperText
                );
                break;
            }
            default: {
                const user = context.getSender();
                const helperText =
                    "You can run:\n" +
                    "`/yourstruly code` to translate, generate, get output or explanation of code\n" +
                    "`/yourstruly sql` to generate sql queries\n" +
                    "`/yourstruly help` to get the help about using commands\n";

                await sendNotification(
                    modify,
                    context.getRoom(),
                    user,
                    helperText
                );
            }
        }
    }
    
}
