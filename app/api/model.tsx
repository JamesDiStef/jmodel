import fs from 'fs';
import path from 'path';

// Read CSV from public/data at runtime (Node filesystem)
const trainingFilePath = path.join(process.cwd(), 'public', 'data', 'superbowloffensivestats.csv');
let TRAINING_DATA = '';
try {
	TRAINING_DATA = fs.readFileSync(trainingFilePath, 'utf8');
} catch (err) {
	console.error(`Failed to read training data at ${trainingFilePath}`, err);
	TRAINING_DATA = '';
}

// Function to convert CSV data to JSON
const csvToJson = (csvData: string) => {
	if (!csvData) return [];
	// Normalize line endings and ignore blank lines
	const lines = csvData.replace(/\r/g, '').split('\n').filter(Boolean);
	if (lines.length === 0) return [];
	const headers = lines[0].split(',').map(h => h.trim());
	return lines.slice(1).map(line => {
		const values = line.split(',').map(v => v.trim());
		return headers.reduce((acc, header, index) => {
			acc[header] = values[index] ?? '';
			return acc;
		}, {} as Record<string, string>);
	});
};

const INPUTS = csvToJson(TRAINING_DATA);

// Log the JSON data
console.log(INPUTS);

