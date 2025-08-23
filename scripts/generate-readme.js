#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateReadme(data) {
  const project = data[0];
  
  let readme = '';
  
  if (project.name) {
    readme += `# ${project.name}\n\n`;
  }
  
  if (project.tagline) {
    readme += `${project.tagline}\n\n`;
  }
  
  if (project.featured_image) {
    readme += `![${project.name}](${project.featured_image})\n\n`;
  }
  
  if (project.description) {
    readme += `${project.description}\n\n`;
  }
  
  readme += `## 🔗 Links\n\n`;
  if (project.purchase_url) {
    readme += `- 🎁 Get it [here](${project.purchase_url})\n`;
  }
  readme += `- ❓ Check FAQs [here](https://github.com/orgs/serpapps/discussions/categories/faq)\n`;
  if (project.github_url) {
    // Extract the repo name from github URL (e.g., "serpapps/ai-voice-cloner" from "https://github.com/serpapps/ai-voice-cloner/")
    const repoPath = project.github_url.replace('https://github.com/', '').replace(/\/$/, '');
    readme += `- 🐛 Report bugs [here](https://github.com/${repoPath}/issues)\n`;
    readme += `- 🆕 Request features [here](https://github.com/${repoPath}/issues)\n`;
  }
  if (project.release_url) {
    readme += `- 📦 [Latest Release](${project.release_url})\n`;
  }
  readme += '\n';
  readme += `### Resources\n\n`;
  readme += `- 💬 [Community](https://serp.ly/@serp/community)\n`;
  readme += `- 💌 [Newsletter](https://serp.ly/@serp/email)\n`;
  readme += `- 🛒 [Shop](https://serp.ly/@serp/store)\n`;
  readme += `- 🎓 [Courses](https://serp.ly/@serp/courses)\n\n`;
  
  if (project.features && project.features.length > 0) {
    readme += `## Features\n\n`;
    project.features.forEach(feature => {
      readme += `- ${feature}\n`;
    });
    readme += '\n';
  }
  
  if (project.installation_instructions) {
    readme += `## Installation Instructions\n\n`;
    if (typeof project.installation_instructions === 'string') {
      readme += `${project.installation_instructions}\n\n`;
    } else if (Array.isArray(project.installation_instructions) && project.installation_instructions.length > 0) {
      project.installation_instructions.forEach((instruction, index) => {
        readme += `${index + 1}. ${instruction}\n\n`;
      });
    }
  }
  
  if (project.usage_instructions && project.usage_instructions.length > 0) {
    readme += `## Usage Instructions\n\n`;
    project.usage_instructions.forEach((instruction, index) => {
      readme += `${index + 1}. ${instruction}\n`;
    });
    readme += '\n';
  } else if (project.instructions && project.instructions.length > 0) {
    readme += `## Usage\n\n`;
    project.instructions.forEach((instruction, index) => {
      readme += `${index + 1}. ${instruction}\n`;
    });
    readme += '\n';
  }
  
  if (project.technologies && project.technologies.length > 0) {
    readme += `## Technologies\n\n`;
    project.technologies.forEach(tech => {
      readme += `- ${tech}\n`;
    });
    readme += '\n';
  }
  
  if (project.faqs && project.faqs.length > 0) {
    readme += `## FAQs\n\n`;
    project.faqs.forEach(faq => {
      readme += `### ${faq.question}\n\n${faq.answer}\n\n`;
    });
  }
  
  if (project.troubleshooting_instructions && project.troubleshooting_instructions.length > 0) {
    readme += `## Troubleshooting\n\n`;
    project.troubleshooting_instructions.forEach(item => {
      readme += `### ${item.title}\n\n${item.markdown}\n\n`;
    });
  }
  
  if (project.changelog) {
    readme += `## Changelog\n\n${project.changelog}\n\n`;
  }
  
  if (project.related_videos && project.related_videos.length > 0) {
    readme += `## Related Videos\n\n`;
    project.related_videos.forEach(video => {
      readme += `- [${video.title}](${video.url})\n`;
    });
    readme += '\n';
  }
  
  if (project.version) {
    readme += `## Version\n\nVersion: ${project.version}\n`;
    if (project.updated_at) {
      const date = new Date(project.updated_at);
      readme += `Last Updated: ${date.toLocaleDateString()}\n`;
    }
    readme += '\n';
  }
  
  // More Info section at the bottom
  const hasMoreInfo = project.github_url || project.main_gist || 
    (project.gists && project.gists.length > 0) || 
    (project.related_articles && project.related_articles.length > 0);
  
  if (hasMoreInfo) {
    readme += `## More Info\n\n`;
    
    if (project.github_url) {
      readme += `- 📁 Repository [here](${project.github_url})\n`;
    }
    if (project.main_gist) {
      readme += `- 📝 Gist [here](${project.main_gist})\n`;
    }
    
    if (project.gists && project.gists.length > 0) {
      project.gists.forEach(gist => {
        readme += `- [${gist.title || 'Code Example'}](${gist.url})\n`;
      });
    }
    
    if (project.related_articles && project.related_articles.length > 0) {
      project.related_articles.forEach(article => {
        readme += `- [${article.title}](${article.url})\n`;
      });
    }
    
    readme += '\n';
  }
  
  return readme;
}

function main() {
  try {
    const jsonPath = path.join(__dirname, '..', 'data', 'readme.json');
    const readmePath = path.join(__dirname, '..', 'README.md');
    
    if (!fs.existsSync(jsonPath)) {
      console.error(`Error: Could not find ${jsonPath}`);
      process.exit(1);
    }
    
    const jsonContent = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(jsonContent);
    
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Error: JSON data should be a non-empty array');
      process.exit(1);
    }
    
    const readmeContent = generateReadme(data);
    
    fs.writeFileSync(readmePath, readmeContent);
    console.log(`✅ README.md has been generated successfully!`);
    console.log(`📄 Output: ${readmePath}`);
    
  } catch (error) {
    console.error('Error generating README:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { generateReadme };