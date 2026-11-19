# Publishing to the VS Code Marketplace

Step by step guide to publish and update **Agy Button** on the Visual Studio Marketplace. Steps 1 and 2 are done once and need your account; the project already provides the rest.

## Checklist before publishing

- [x] `package.json` with `publisher`, `repository`, `license`, `icon`, `keywords` and `engines`
- [x] `LICENSE` (MIT) and `README.md`
- [x] Icon `media/icon.png` (128x128). It uses the Antigravity logo to identify the product the button opens, so check the trademark rules (see Notes)
- [x] `CHANGELOG.md` with the current version
- [x] `.vscodeignore` keeping the package small
- [x] Publisher created (step 1)
- [ ] Package tested locally (step 3)
- [ ] Package uploaded or published (step 4)

## 1. Create the publisher (once)

1. Sign in at <https://marketplace.visualstudio.com/manage> with a Microsoft account.
2. Create a publisher with the ID **`alissonpef`**. The ID must be **identical** to the `publisher` field in `package.json`. It cannot be changed later.

## 2. Create an access token (only for command line publishing)

Not needed if you upload the `.vsix` on the website.

1. At <https://dev.azure.com>, open **User settings → Personal access tokens → New Token**.
2. Under **Organization**, choose **All accessible organizations**.
3. Under **Scopes**, choose **Custom defined → Marketplace → Manage**.
4. Copy the token right away: it is shown only once. Never store it in a repository file.

## 3. Test the package first

```bash
npm install
npm run check
npm run package
code --install-extension agy-button-0.1.0.vsix --force
```

Reload VS Code and confirm that the button appears in the editor toolbar, that clicking it opens the Antigravity panel, and that **Agy Button: Open Agy Panel** works in the command palette.

## 4. Publish

**Option A: upload on the website (no token).** On the publisher page, click **New extension → Visual Studio Code** and drag the `.vsix` file in.

**Option B: command line (needs the token).**

```bash
npx @vscode/vsce login alissonpef   # paste the token when asked
npm run publish
```

The extension takes a few minutes to pass validation and show up on the Marketplace. Its address will be `https://marketplace.visualstudio.com/items?itemName=alissonpef.agy-button`.

## 5. Publish an update

1. Describe the change in `CHANGELOG.md` under `[Unreleased]`, then move it to the new version with the date.
2. Bump the version and publish in one go (this also creates the git tag):

   ```bash
   npx @vscode/vsce publish patch   # or minor / major
   git push --follow-tags
   ```

## Notes

- **Trademark:** the name and logo of "Antigravity" belong to a third party. The extension is named "Agy Button" and the README states the project is not affiliated, but the icon is the Antigravity logo, which can get the listing rejected or reported. Read the Marketplace naming and trademark rules before publishing; if there is a problem, replace `media/icon.png` and the two SVGs and publish a patch release.
- **Dependency:** the extension declares `google.google-antigravity` in `extensionDependencies`. If that ID changes, update `package.json`.
- **Versions:** the Marketplace does not accept the same version twice.
