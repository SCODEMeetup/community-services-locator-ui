## Adding Icons

1. Go to https://icomoon.io/app/#/select
2. Click the "Import Icons" button near the top left of the window
3. Select the **material_icons.svg** file located at _app/renderer/utils/fonts/MaterialIcons_
4. Click "Yes" for using the same font metrics and metadata _(might not show up)_
5. Add your icon to this set (you can drag-n-drop)
6. Select all the icons
7. Click "Generate Font" at the bottom right of the window
8. Make sure that both **U+** & **fi** buttons on the left side of the toolbar are toggled on.
9. Give your newly added icon a ligature (text field next to **fi** under the icon in the Glyph section)
10. Click "Download" button
11. Place all three files material_icons.svg, material_icons.ttf, & material_icons.woff into the _app/renderer/utils/fonts/MaterialIcons_ folder.

---

## Troubleshooting steps

1. Make sure preferences before downloading are set to the following:
   - No check boxes under Class Prefix are checked
   - No class prefix is set
   - Toggle **Use i (for selecting < i >)**
   - Font Name is material_icons
