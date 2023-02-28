import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
    SlashCommandPreviewItemType,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { yoursTrulyApp } from "../yoursTrulyApp";
import {
    ISlashCommandPreview,
    ISlashCommandPreviewItem,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { AppSetting } from "../config/Settings";

export class GenerateCommand implements ISlashCommand {
    public command: string = "generate";
    public i18nParamsExample: string = "Generate Images from Prompt and Share";
    public i18nDescription: string = "";
    public providesPreview: boolean = true;

    constructor(private readonly app: yoursTrulyApp) {}

    async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {}
    // image generation init

    public async previewer(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<ISlashCommandPreview> {
        //handle error for more arguments

        const param = context.getArguments()[1];

        if (param == "search") {
            const prompt = context.getArguments()[0];

            const { value: Secret } = await read
                .getEnvironmentReader()
                .getSettings()
                .getById(AppSetting.SECRET_TOKEN);
            const response = await http.post(
                "https://api.openai.com/v1/images/generations",
                {
                    headers: {
                        Authorization: `Bearer ${Secret}`,
                        "Content-Type": "application/json",
                    },
                    data: {
                        prompt,
                        n: 10,
                        size: "256x256",
                    },
                }
            );

            let id = 1;

            const items: Array<ISlashCommandPreviewItem> =
                response?.data?.data.forEach((res) => {
                    id = id + 1;
                    return {
                        id: id.toString(),
                        type: SlashCommandPreviewItemType.IMAGE,
                        value: res.url,
                    };
                });
            return {
                i18nTitle: "title of preview",
                items,
            };
        } else {
            return {
                i18nTitle: "title of preview",
                items: [
                    {
                        id: "ROCKETCHAT.PREVIEW",
                        type: SlashCommandPreviewItemType.IMAGE,
                        value: "https://res.cloudinary.com/dim2ekub1/image/upload/c_scale,h_136,w_256/v1677604385/RocketChat_rsb1ya.png",
                    },
                ],
            };
        }
    }

    public async executePreviewItem(
        item: ISlashCommandPreviewItem,
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const imageUrl: string = item.value;
        const room = context.getRoom();
        const sender = context.getSender();

        const messageBuilder = modify
            .getCreator()
            .startMessage()
            .setRoom(room)
            .setSender(sender)
            .setAttachments([
                {
                    title: {
                        value: "This is value of image",
                    },
                    imageUrl,
                },
            ]);

        await modify.getCreator().finish(messageBuilder);
    }
}
