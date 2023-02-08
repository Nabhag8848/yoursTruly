import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
    IModifyCreator,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import {
    IUIKitResponse,
    UIKitViewSubmitInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";
import { CompletionCommand } from "./commands/Completion";
import { settings } from "./config/Settings";
import { AppSetting } from "./config/Settings";
import { TextObjectType } from "@rocket.chat/apps-engine/definition/uikit";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { UIKitBlockInteractionContext } from "@rocket.chat/apps-engine/definition/uikit";
import { UIKitViewCloseInteractionContext } from "@rocket.chat/apps-engine/definition/uikit";
import {
    RocketChatAssociationModel,
    RocketChatAssociationRecord,
} from "@rocket.chat/apps-engine/definition/metadata";
import { getInteractionRoomData } from "./persistance/roomInteraction";
export class AppsAiApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async executeViewSubmitHandler(
        context: UIKitViewSubmitInteractionContext,
        read: IRead,
        http: IHttp,
        persistance: IPersistence,
        modify: IModify
    ): Promise<IUIKitResponse> {
        const { actionId, appId, triggerId, user, view } =
            context.getInteractionData();

        const creator: IModifyCreator = modify.getCreator();

        const state: any = context.getInteractionData().view.state;
        const prompt: string = state.inputBlock.Code;

        console.log(state);

        const { value: Secret } = await read
            .getEnvironmentReader()
            .getSettings()
            .getById(AppSetting.SECRET_TOKEN);
        const persistenceRead = read.getPersistenceReader();
        const { roomId } = await getInteractionRoomData(
            persistenceRead,
            user.id
        );
        const room: IRoom = (await read
            .getRoomReader()
            .getById(roomId)) as IRoom;

        const completion = await http.post(
            "https://api.openai.com/v1/completions",
            {
                data: {
                    model: "code-davinci-002",
                    prompt,
                    temperature: 0,
                    max_tokens: 64,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Secret}`,
                },
            }
        );

        const text: string = completion.data.choices[0].text.trim();
        this.getLogger().info(room, user, actionId);
        const block = creator.getBlockBuilder();

        block.addSectionBlock({
            text: {
                type: TextObjectType.MARKDOWN,
                text: `\`\`\`${text}\`\`\``,
            },
        });

        const message = creator
            .startMessage()
            .setSender(user)
            .setRoom(room)
            .setBlocks(block);

        await creator.finish(message);

        return {
            success: true,
        };
    }

    public async executeBlockActionHandler(
        context: UIKitBlockInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ): Promise<IUIKitResponse> {
        const value = context.getInteractionData().message;

        console.log(value);

        return {
            success: true,
        };
    }

    public async executeViewClosedHandler(
        context: UIKitViewCloseInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ): Promise<IUIKitResponse> {
        console.log("modal closed");
        return {
            success: true,
        };
    }

    protected async extendConfiguration(
        configuration: IConfigurationExtend,
        environmentRead: IEnvironmentRead
    ): Promise<void> {
        await Promise.all(
            settings.map((setting) => {
                configuration.settings.provideSetting(setting);
            })
        );

        const completionCommand: CompletionCommand = new CompletionCommand();
        configuration.slashCommands.provideSlashCommand(completionCommand);
    }
}
