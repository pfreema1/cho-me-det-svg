// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('chomedetsvg.choMeDetSvg', () => {
		// create and show a new webview
		const panel = vscode.window.createWebviewPanel(
			'choMeDetSvg', // identifies the type of the webview - used internally
			'CHO ME DET SVG', // title of the panel displayed to user
			vscode.ViewColumn.Two, // editor column to show the new webview panel in.
			{} // webview options
		);

		console.log(vscode.window.activeTextEditor.document);
		const editor = vscode.window.activeTextEditor;
		const selection = editor.selection;
		const text = editor.document.getText(selection);
		panel.webview.html = getWebviewContent(text);


	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(selection) {
	return `
	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cho Me Dat SVG</title>
</head>
<style>
.svg-container {
	width: 300px;

	background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);
	background-size: 20px 20px;
	background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.svg-container svg {
	width: 100%;
}
</style>
<body>
	<div class="svg-container">
		${selection}
	</div>
</body>
</html>
	`;
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
