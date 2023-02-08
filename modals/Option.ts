import { IModify } from "@rocket.chat/apps-engine/definition/accessors";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";
import {
    AccessoryElements,
    BlockElementType,
    TextObjectType,
} from "@rocket.chat/apps-engine/definition/uikit";
import { ButtonStyle } from "@rocket.chat/apps-engine/definition/uikit";

export function OptionModal(modify: IModify): IUIKitModalViewParam {
    const block = modify.getCreator().getBlockBuilder();
    block.addSectionBlock({
        text: {
            text: "```Looking for Translation?```",
            type: TextObjectType.MARKDOWN,
        },
        blockId: "Selection",
        accessory: {
            actionId: "translate-button",
            style: ButtonStyle.PRIMARY,
            text: block.newMarkdownTextObject(":recycle: Translate"),
            type: BlockElementType.BUTTON,
        } as AccessoryElements,
    });

    block.addSectionBlock({
        text: {
            text: "```Generate or Get Explanation of Code```",
            type: TextObjectType.MARKDOWN,
        },
        blockId: "Selection",
        accessory: {
            actionId: "generate-button",
            style: ButtonStyle.PRIMARY,
            text: block.newMarkdownTextObject(":arrow_forward: Other"),
            type: BlockElementType.BUTTON,
        } as AccessoryElements,
    });

    return {
        close: {
            actionId: "close",
            type: BlockElementType.BUTTON,
            style: ButtonStyle.DANGER,
            text: {
                text: "**:x: Close**",
                type: TextObjectType.MARKDOWN,
            },
        },
        blocks: block.getBlocks(),
        title: block.newMarkdownTextObject("What you wanna do? :thinking:"),
    };
}
