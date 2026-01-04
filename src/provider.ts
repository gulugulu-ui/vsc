import * as vscode from 'vscode';

export class BisheTreeProvider implements vscode.TreeDataProvider<TreeItem> {
    
    getTreeItem(element: TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: TreeItem): Thenable<TreeItem[]> {
        return Promise.resolve([
            new TreeItem('启动仿真引擎 (Start)', 'my-bishe.startSimulator', vscode.TreeItemCollapsibleState.None, 'play'),
            new TreeItem('停止仿真 (Stop)', 'my-bishe.stopSimulator', vscode.TreeItemCollapsibleState.None, 'debug-stop'),
            new TreeItem('生成分析报告 (Report)', 'my-bishe.showReport', vscode.TreeItemCollapsibleState.None, 'graph'),
            new TreeItem('系统说明 (About)', 'my-bishe.showDocs', vscode.TreeItemCollapsibleState.None, 'book')
        ]);
    }
}

class TreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly commandId: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly iconName: string
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label}`;
        
        // 使用 VS Code 内置图标
        this.iconPath = new vscode.ThemeIcon(iconName);

        this.command = {
            command: commandId,
            title: label,
        };
    }
}
