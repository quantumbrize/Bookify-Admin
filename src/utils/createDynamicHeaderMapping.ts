const createDynamicHeaderMapping = (data: any[]): Record<string, string> => {
    if (!data.length) return {};
    const firstItem = data[0];
    const headerMapping: Record<string, string> = {};
  
    Object.keys(firstItem).forEach((key) => {
      // Convert key to a more readable label
      const label = key
        .replace(/([A-Z])/g, " $1") // Add space before capital letters
        .replace(/_/g, " ") // Replace underscores with space
        .toLowerCase() // Convert to lower case
        .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize first letter
  
      headerMapping[key] = label;
    });
  
    return headerMapping;
  };
  export default createDynamicHeaderMapping
  