# GitHub Workflows & Configuration

This directory contains GitHub Actions workflows and configurations for the AI Voice Cloner repository.

## Workflows

### 📝 README Generation

This repository uses an automated README generation system that creates the main README.md from a JSON data source.

- **Source Data**: `assets/data.json` (on `assets` branch)
- **Generator Script**: `scripts/generate-readme.js` (on `main` branch)
- **Output**: `README.md` (on `main` branch)

#### Workflows in this directory:

1. **`workflows/generate-readme-from-json.yml`**
   - Reusable workflow that performs the actual README generation
   - Can be called from other repositories
   - Supports cross-branch operations

2. **`caller-workflows/call-generate-readme-from-json.yml`**
   - Calls the reusable workflow
   - Triggers automatically when `assets/data.json` changes on the `assets` branch
   - Can be manually triggered from Actions tab

#### How to trigger README generation:

**Automatic**: 
- Edit `assets/data.json` on the `assets` branch
- Push changes
- README will auto-update on `main` branch

**Manual**:
- Go to Actions tab
- Select "Generate README from JSON"
- Click "Run workflow"

## Documentation

For detailed documentation about the README generation system, see:
- [README Generator Documentation](../docs/README-GENERATOR.md)

## Reusable Workflows

These workflows are designed to be reusable across the serpapps organization. The main reusable workflow should be moved to the [`serpapps/.github`](https://github.com/serpapps/.github) repository for organization-wide use.

## Directory Structure

```
.github/
├── workflows/
│   ├── generate-readme-from-json.yml    # Reusable workflow (should go to serpapps/.github)
│   └── update-readme.yml                 # Old workflow (can be removed)
├── caller-workflows/
│   └── call-generate-readme-from-json.yml # Caller workflow for this repo
└── README.md                              # This file
```

## Contributing

When modifying workflows:
1. Test changes locally when possible
2. Use the workflow_dispatch trigger for testing
3. Check Actions tab for run logs if issues occur