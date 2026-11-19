const vscode = require("vscode");

/**
 * Opens or focuses the Antigravity panel, wherever it lives (left or right side bar).
 * Tries the panel focus command first and, if the installed version does not have it,
 * falls back to the command that toggles the chat focus.
 */
async function openAgyPanel() {
  const commands = ["antigravity.panel.focus", "antigravity.toggleChatFocus"];
  for (const command of commands) {
    try {
      await vscode.commands.executeCommand(command);
      return;
    } catch {
      // try the next command
    }
  }
  vscode.window.showErrorMessage(
    "Agy Button: could not find the Antigravity panel. Make sure the Antigravity extension is installed and enabled."
  );
}

function activate(context) {
  context.subscriptions.push(vscode.commands.registerCommand("agyButton.open", openAgyPanel));
}

function deactivate() {}

module.exports = { activate, deactivate };
