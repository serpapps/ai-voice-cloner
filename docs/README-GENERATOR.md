# README Generator Documentation

## Overview

This system automatically generates a `README.md` file from a JSON data source. It's designed to keep product information centralized in a single JSON file while automatically maintaining an up-to-date README on the main branch.

## Architecture

### Branch Structure

The system uses a multi-branch approach to keep the repository organized:

- **`main` branch**: Contains the generated README.md and the generator script
- **`assets` branch**: Contains the source data (JSON file) and any related assets

This separation keeps the main branch clean while allowing easy updates to the product data without cluttering the primary codebase.

## Components

### 1. Data Source (`assets/data.json`)

Located on the `assets` branch, this JSON file contains all product information:

```json
{
  "name": "Product Name",
  "tagline": "Product tagline",
  "description": "Full description",
  "features": ["Feature 1", "Feature 2"],
  "installation_instructions": "Installation steps...",
  "usage_instructions": ["Step 1", "Step 2"],
  // ... other fields
}
```

### 2. Generator Script (`scripts/generate-readme.js`)

Located on the `main` branch, this Node.js script:
- Reads the JSON data
- Transforms it into Markdown format
- Generates a complete README.md file

Key features:
- Handles both string and array formats for instructions
- Conditionally includes sections based on data availability
- Supports markdown within JSON fields

### 3. GitHub Actions Workflows

#### Reusable Workflow (`generate-readme-from-json.yml`)

This is the core workflow that can be called from any repository. It:

1. Checks out three separate branches:
   - The branch containing the JSON data
   - The branch containing the generator script
   - The branch where the README will be committed

2. Creates a workspace and combines files from different branches

3. Runs the generator script

4. Commits and pushes changes if the README has been updated

**Inputs:**
- `json_path`: Path to the JSON file (default: `assets/data.json`)
- `json_branch`: Branch containing the JSON (default: `assets`)
- `script_path`: Path to the generator script (default: `scripts/generate-readme.js`)
- `script_branch`: Branch containing the script (default: `main`)
- `output_filename`: Name of generated file (default: `README.md`)
- `output_branch`: Branch to commit to (default: `main`)
- `commit_message`: Custom commit message

#### Caller Workflow (`call-generate-readme-from-json.yml`)

This workflow lives in individual repositories and calls the reusable workflow. It:

- Automatically triggers when `assets/data.json` changes on the `assets` branch
- Can be manually triggered with custom parameters
- Passes configuration to the reusable workflow

## How It Works

### Automatic Generation

1. **Edit the data**: Update `assets/data.json` on the `assets` branch
2. **Push changes**: Commit and push to the `assets` branch
3. **Workflow triggers**: GitHub Actions detects the change
4. **README generated**: The workflow runs the generator script
5. **Auto-commit**: Updated README.md is committed to the `main` branch

### Manual Generation

You can manually trigger the workflow from the GitHub Actions tab:

1. Go to Actions → "Generate README from JSON"
2. Click "Run workflow"
3. Optionally customize parameters
4. Click "Run workflow" button

### Local Generation

To generate the README locally:

```bash
# Make sure you're on the branch with the script
git checkout main

# Run the generator
node scripts/generate-readme.js
```

## Setting Up in a New Repository

### 1. Copy the Caller Workflow

Copy `.github/workflows/call-generate-readme-from-json.yml` to your repository.

### 2. Create the Assets Branch

```bash
git checkout -b assets
# Add your data.json file
git add assets/data.json
git commit -m "Add product data"
git push -u origin assets
```

### 3. Add the Generator Script

On your main branch:
```bash
git checkout main
# Copy scripts/generate-readme.js to your repo
git add scripts/generate-readme.js
git commit -m "Add README generator"
git push
```

### 4. Configure the Workflow

The workflow will now automatically generate your README whenever you update the data.json file on the assets branch.

## Customization

### Modifying the Template

Edit `scripts/generate-readme.js` to change how the README is generated:

```javascript
// Add new sections
if (project.custom_field) {
  readme += `## Custom Section\n\n${project.custom_field}\n\n`;
}
```

### Using Different Branches

Modify the caller workflow to use different branch names:

```yaml
json_branch: 'data'  # Instead of 'assets'
output_branch: 'development'  # Instead of 'main'
```

### Multiple Data Sources

You can create multiple workflows for different README files:

```yaml
json_path: 'docs/api-data.json'
output_filename: 'API-README.md'
```

## Benefits

1. **Single Source of Truth**: All product information in one JSON file
2. **Clean Main Branch**: Assets and data separated from code
3. **Automatic Updates**: README always reflects latest data
4. **Version Control**: Full history of both data and README changes
5. **Flexible**: Easy to customize for different projects
6. **Reusable**: Workflow can be shared across multiple repositories

## Troubleshooting

### Workflow Not Triggering

- Ensure the JSON file path matches the workflow trigger
- Check that you're pushing to the correct branch (`assets`)
- Verify GitHub Actions are enabled for the repository

### README Not Updating

- Check the Actions tab for workflow run logs
- Ensure the generator script has the correct file paths
- Verify branch permissions allow workflow writes

### Script Errors

- Test locally first: `node scripts/generate-readme.js`
- Check JSON syntax is valid
- Ensure all required fields are present

## Example Data Structure

See `assets/data.json` on the `assets` branch for a complete example of the expected data structure.