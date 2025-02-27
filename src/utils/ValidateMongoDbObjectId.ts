const validateMongoDbObjectId = (id:string, setError: (value: string) => void) => {
    // Regex to check for 24 hex characters
    const objectIdPattern = /^[a-fA-F0-9]{24}$/;
    
    // If ID is not valid, set error and return false
    if (!objectIdPattern.test(id)) {
      setError("Invalid ID format");
      return false;
    }
  
    // If ID is valid, return true without setting any error
    return true;
  };
  export default validateMongoDbObjectId