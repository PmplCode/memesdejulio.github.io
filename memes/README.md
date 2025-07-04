# Memes Organization

This directory contains the local meme files organized by day of July.

## Directory Structure

```
public/memes/
├── 1/           # July 1st memes
├── 2/           # July 2nd memes
├── ...
├── 31/          # July 31st memes
└── README.md    # This file
```

## How to Add Memes

### Option 1: Using Manifest Files (Recommended)

For each day, create a `manifest.json` file that lists all available memes:

**Example: `public/memes/1/manifest.json`**
```json
{
  "memes": [
    {
      "filename": "1.jpg",
      "title": "Título del meme",
      "submittedBy": "Nombre del usuario"
    },
    {
      "filename": "funny-cat.png",
      "title": "Gato gracioso",
      "submittedBy": "Usuario2"
    }
  ]
}
```

Then place your image files in the same directory:
```
public/memes/1/
├── manifest.json
├── 1.jpg
└── funny-cat.png
```

### Option 2: Using Common Filenames (Fallback)

If no manifest.json exists, the system will automatically look for files with common names:

- `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`
- `1.png`, `2.png`, `3.png`, `4.png`, `5.png`
- `meme.jpg`, `meme.png`, `image.jpg`, `image.png`

Simply place your images with these names in the day's directory:
```
public/memes/1/
├── 1.jpg
├── 2.png
└── meme.jpg
```

## Supported Image Formats

- JPG/JPEG
- PNG
- GIF
- WebP

## Tips

1. **Use manifest files** for better control over titles and attribution
2. **Optimize your images** for web to improve loading performance
3. **Use descriptive filenames** when possible
4. **Keep file sizes reasonable** (under 5MB recommended)

## Example Directory

```
public/memes/1/
├── manifest.json
├── morning-coffee.jpg
├── monday-mood.png
└── weekend-plans.gif
``` 