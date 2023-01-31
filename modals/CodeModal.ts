import { IModify } from "@rocket.chat/apps-engine/definition/accessors";
import {
    BlockElementType,
    ButtonStyle,
    TextObjectType,
} from "@rocket.chat/apps-engine/definition/uikit";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";
export function CodeModal(modify: IModify): IUIKitModalViewParam {
    const block = modify.getCreator().getBlockBuilder();

    block.addSectionBlock({
        text: {
            text: "Generate, Translate, Output or get Explaination of your Code and share notifications to Rocket Chat channel.",
            type: TextObjectType.PLAINTEXT,
        },
    });

    block.addDividerBlock();
    block.addSectionBlock({
        text: {
            text: "**What you want to do?**",
            type: TextObjectType.MARKDOWN,
        },
    });

    block.addActionsBlock({
        elements: [
            block.newStaticSelectElement({
                placeholder: block.newPlainTextObject("Translate"),
                actionId: "type",
                initialValue: "translate",
                options: [
                    {
                        text: block.newPlainTextObject("Translate"),
                        value: "translate",
                    },
                    {
                        text: block.newPlainTextObject("Generate"),
                        value: "generate",
                    },
                    {
                        text: block.newPlainTextObject("Output"),
                        value: "output",
                    },
                    {
                        text: block.newPlainTextObject("Explain"),
                        value: "explain",
                    },
                ],
            }),
        ],
    });

    block.addSectionBlock({
        text: {
            text: "**From**",
            type: TextObjectType.MARKDOWN,
        },
    });

    block.addActionsBlock({
        elements: [
            block.newStaticSelectElement({
                placeholder: block.newPlainTextObject("JavaScript"),
                actionId: "type",
                initialValue: "javascript",
                options: [
                    {
                        text: block.newPlainTextObject("JavaScript"),
                        value: "javascript",
                    },
                    {
                        text: block.newPlainTextObject("Python"),
                        value: "python",
                    },
                    {
                        text: block.newPlainTextObject("TypeScript"),
                        value: "typescript",
                    },
                    {
                        text: block.newPlainTextObject("Java"),
                        value: "java",
                    },
                ],
            }),
        ],
    });

    block.addSectionBlock({
        text: {
            text: "**To**",
            type: TextObjectType.MARKDOWN,
        },
    });

    block.addActionsBlock({
        elements: [
            block.newStaticSelectElement({
                placeholder: block.newPlainTextObject("JavaScript"),
                actionId: "type",
                initialValue: "javascript",
                options: [
                    {
                        text: block.newPlainTextObject("JavaScript"),
                        value: "javascript",
                    },
                    {
                        text: block.newPlainTextObject("Python"),
                        value: "python",
                    },
                    {
                        text: block.newPlainTextObject("TypeScript"),
                        value: "typescript",
                    },
                    {
                        text: block.newPlainTextObject("Java"),
                        value: "java",
                    },
                ],
            }),
        ],
    });

    block.addDividerBlock();

    block.addInputBlock({
        blockId: "inputBlock",
        label: {
            text: "**Enter Code**",
            type: TextObjectType.MARKDOWN,
        },
        element: {
            actionId: "Code",
            placeholder: {
                text: "paste your code here",
                type: TextObjectType.PLAINTEXT,
            },
            type: BlockElementType.PLAIN_TEXT_INPUT,
        },
    });

    return {
        close: {
            actionId: "close",
            type: BlockElementType.BUTTON,
            style: ButtonStyle.DANGER,
            text: {
                text: "**Close**",
                type: TextObjectType.MARKDOWN,
            },
        },
        submit: {
            actionId: "share",
            type: BlockElementType.BUTTON,
            style: ButtonStyle.PRIMARY,
            text: {
                text: "**Share**",
                type: TextObjectType.MARKDOWN,
            },
        },
        blocks: block.getBlocks(),
        title: block.newPlainTextObject("Translate and Generate Code"),
    };
}
