const fs = require('fs');

// Read the .txt file
fs.readFile('locations.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the file content into sections based on the category
  const sections = data.split(/\r?\n(?=[A-Za-z ]+- United States)/);

  // Initialize an empty object to store categorized locations
  const categorizedLocations = {};

  // Iterate over each section and parse the details
  sections.forEach(section => {
    // Extract category and locations
    const [category, ...locations] = section.trim().split('\n');
    // Extract state-wise locations
    const stateLocations = locations.reduce((acc, location, index, arr) => {
      if (location.trim().includes('-')) {
        const [state, ...address] = location.trim().split('-');
        acc[state.trim()] = address.join('-').trim();
      } else {
        const prevState = Object.keys(acc).pop();
        acc[prevState] += `\n${location.trim()}`;
      }
      return acc;
    }, {});
    // Add to categorizedLocations
    categorizedLocations[category.trim()] = stateLocations;
  });

  // Display the JSON object
  console.log(JSON.stringify(categorizedLocations, null, 2));
});
