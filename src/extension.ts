import * as vscode from 'vscode';
import * as path from 'path';
import { BisheTreeProvider } from './provider';

// 记录当前的终端
let simulatorTerminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('人车交互系统插件已激活');

    // 1. 注册侧边栏
    const treeProvider = new BisheTreeProvider();
    vscode.window.registerTreeDataProvider('bisheView', treeProvider);

    // 2. 命令：启动仿真
    let startCmd = vscode.commands.registerCommand('my-bishe.startSimulator', () => {
        if (simulatorTerminal) {
            vscode.window.showWarningMessage('模拟器已经在运行中了！');
            simulatorTerminal.show();
            return;
        }
        vscode.window.showInformationMessage('正在初始化仿真环境...');
        const scriptPath = path.join(context.extensionPath, 'src', 'simulator', 'main.py');
        simulatorTerminal = vscode.window.createTerminal('HUTB Simulator Console');
        simulatorTerminal.show();
        simulatorTerminal.sendText(`python "${scriptPath}"`);

        vscode.window.onDidCloseTerminal(t => {
            if (t === simulatorTerminal) {
                simulatorTerminal = undefined;
            }
        });
    });

    // 3. 命令：停止仿真
    let stopCmd = vscode.commands.registerCommand('my-bishe.stopSimulator', () => {
        if (simulatorTerminal) {
            simulatorTerminal.dispose();
            simulatorTerminal = undefined;
            vscode.window.showInformationMessage('仿真已终止');
        } else {
            vscode.window.showErrorMessage('当前没有运行中的仿真任务');
        }
    });

    // 4. 命令：生成报告 (新增的)
    let reportCmd = vscode.commands.registerCommand('my-bishe.showReport', () => {
        const panel = vscode.window.createWebviewPanel(
            'bisheReport',
            '仿真分析报告',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );
        panel.webview.html = getWebviewContent();
    });

    // 5. 命令：系统说明
    let docCmd = vscode.commands.registerCommand('my-bishe.showDocs', () => {
        vscode.window.showInformationMessage('毕设题目：人车交互模拟系统 | 版本 v1.0');
    });

    // 加入订阅
    context.subscriptions.push(startCmd);
    context.subscriptions.push(stopCmd);
    context.subscriptions.push(reportCmd);
    context.subscriptions.push(docCmd);
}

export function deactivate() {
    if (simulatorTerminal) {
        simulatorTerminal.dispose();
    }
}

// 生成 HTML 的辅助函数
function getWebviewContent() {
    const score = Math.floor(Math.random() * (100 - 80) + 80);
    const duration = Math.floor(Math.random() * 30) + 10;
    const events = Math.floor(Math.random() * 5);

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>仿真分析报告</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; padding: 20px; color: var(--vscode-editor-foreground); background-color: var(--vscode-editor-background); }
        h1 { border-bottom: 1px solid #ccc; padding-bottom: 10px; }
        .card { background: var(--vscode-editor-selectionBackground); padding: 15px; margin: 10px 0; border-radius: 5px; }
        .score { font-size: 48px; font-weight: bold; color: #4CAF50; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    </style>
</head>
<body>
    <h1>🚗 人车交互系统 - 仿真分析报告</h1>
    <p>生成时间：${new Date().toLocaleString()}</p>
    <div class="card">
        <h3>本次驾驶安全评分</h3>
        <div class="score">${score}</div>
        <p>驾驶评价：表现优秀，系统介入及时。</p>
    </div>
    <div class="grid">
        <div class="card">
            <h3>⏱ 模拟时长</h3>
            <p style="font-size: 24px">${duration} 分 12 秒</p>
        </div>
        <div class="card">
            <h3>⚠ 风险干预次数</h3>
            <p style="font-size: 24px">${events} 次</p>
        </div>
    </div>
</body>
</html>`;
}
