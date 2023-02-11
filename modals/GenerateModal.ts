import { IModify } from "@rocket.chat/apps-engine/definition/accessors";
import {
    BlockElementType,
    ButtonStyle,
    TextObjectType,
} from "@rocket.chat/apps-engine/definition/uikit";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";
export function generateModal(modify: IModify): IUIKitModalViewParam {
    const block = modify.getCreator().getBlockBuilder();

    block.addSectionBlock({
        text: {
            text: "Generate, Output or get Explaination of your Code and share to channel.",
            type: TextObjectType.PLAINTEXT,
        },
    });

    block.addDividerBlock();
    block.addSectionBlock({
        text: {
            text: "**What you want to do :question:**",
            type: TextObjectType.MARKDOWN,
        },
    });

    block.addActionsBlock({
        blockId: "Select",
        elements: [
            block.newStaticSelectElement({
                placeholder: block.newPlainTextObject("Generate"),
                actionId: "type",
                initialValue: "generate",
                options: [
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
            text: "**Select Language :rocket:**",
            type: TextObjectType.MARKDOWN,
        },
    });

    block.addActionsBlock({
        blockId: "Language",
        elements: [
            block.newStaticSelectElement({
                placeholder: block.newPlainTextObject("JavaScript"),
                actionId: "source",
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
            text: "**Input your prompt/code here :man_technologist:**",
            type: TextObjectType.MARKDOWN,
        },
        element: block.newPlainTextInputElement({
            actionId: "InputPrompt",
            placeholder: {
                text: "paste here",
                type: TextObjectType.PLAINTEXT,
            },
            multiline: true,
        }),
        optional: false,
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
        submit: {
            actionId: "share",
            type: BlockElementType.BUTTON,
            style: ButtonStyle.PRIMARY,
            text: {
                text: "**:rocket: Share**",
                type: TextObjectType.MARKDOWN,
            },
        },
        blocks: block.getBlocks(),
        title: block.newMarkdownTextObject(
            "Generation / Explanation of Code :rainbow:"
        ),
    };
}
