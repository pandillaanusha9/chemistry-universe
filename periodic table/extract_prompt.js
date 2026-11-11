const fs = require('fs');
const path = require('path');

const transcriptPath = 'C:\\Users\\ANUSHA\\.gemini\\antigravity\\brain\\f2f196c2-7cdf-4c22-be0e-88938619965c\\.system_generated\\logs\\transcript.jsonl';
const outputPath = 'C:\\Users\\ANUSHA\\.gemini\\antigravity\\brain\\f2f196c2-7cdf-4c22-be0e-88938619965c\\full_s_block_prompt.md';

const fileContent = fs.readFileSync(transcriptPath, 'utf8');
const lines = fileContent.split('\n');

// Find the line that contains the first occurrence of "FUTURISTIC S-BLOCK"
let targetLine = '';
for (const line of lines) {
  if (line.includes('FUTURISTIC S-BLOCK') && line.includes('USER_INPUT')) {
    targetLine = line;
    break;
  }
}

if (targetLine) {
  const parsed = JSON.parse(targetLine);
  fs.writeFileSync(outputPath, parsed.content, 'utf8');
  console.log('Successfully wrote full prompt to:', outputPath);
} else {
  console.log('Could not find the target line in transcript.');
}
