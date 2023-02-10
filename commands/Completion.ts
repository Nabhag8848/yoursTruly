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

export class CompletionCommand implements ISlashCommand {
    public command: string = "ai";
    public i18nDescription: string = "Generates a predictive Completion";
    public i18nParamsExample: string = "";
    public providesPreview: boolean = true;

    constructor(private readonly app: yoursTrulyApp) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persistence: IPersistence
    ): Promise<void> {
        // First of all open the Modal
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
    }
    // image generation init
    public async previewer(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<ISlashCommandPreview> {
        return {
            i18nTitle: "title of preview",
            items: [
                {
                    id: "id of preview",
                    type: SlashCommandPreviewItemType.IMAGE,
                    value: "https://images.meesho.com/images/products/94705368/0mxfw_256.webp",
                },
            ],
        };
    }

    public async executePreviewItem(
        item: ISlashCommandPreviewItem,
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {}
}
