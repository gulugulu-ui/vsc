"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BisheTreeProvider = void 0;
const vscode = __importStar(require("vscode"));
class BisheTreeProvider {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return Promise.resolve([
            new TreeItem('启动仿真引擎 (Start)', 'my-bishe.startSimulator', vscode.TreeItemCollapsibleState.None, 'play'),
            new TreeItem('停止仿真 (Stop)', 'my-bishe.stopSimulator', vscode.TreeItemCollapsibleState.None, 'debug-stop'),
            new TreeItem('生成分析报告 (Report)', 'my-bishe.showReport', vscode.TreeItemCollapsibleState.None, 'graph'),
            new TreeItem('系统说明 (About)', 'my-bishe.showDocs', vscode.TreeItemCollapsibleState.None, 'book')
        ]);
    }
}
exports.BisheTreeProvider = BisheTreeProvider;
class TreeItem extends vscode.TreeItem {
    label;
    commandId;
    collapsibleState;
    iconName;
    constructor(label, commandId, collapsibleState, iconName) {
        super(label, collapsibleState);
        this.label = label;
        this.commandId = commandId;
        this.collapsibleState = collapsibleState;
        this.iconName = iconName;
        this.tooltip = `${this.label}`;
        // 使用 VS Code 内置图标
        this.iconPath = new vscode.ThemeIcon(iconName);
        this.command = {
            command: commandId,
            title: label,
        };
    }
}
//# sourceMappingURL=provider.js.map