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
            text: "**Translate your Code and share message or notification to channel**",
            type: TextObjectType.MARKDOWN,
        },
    });

    block.addDividerBlock();
 
    block.addSectionBlock({
        text: {
            text: "**Select Languages**",
            type: TextObjectType.MARKDOWN,
        },
    });


    block.addActionsBlock({
        blockId: "From",
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
            block.newStaticSelectElement({
                placeholder: block.newPlainTextObject("Python"),
                actionId: "dest",
                initialValue: "python",
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
        element: block.newPlainTextInputElement({
            actionId: "Code",
            placeholder: {
                text: "paste your code here",
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
        title: block.newMarkdownTextObject("Translate Code :free:"),
    };
}
