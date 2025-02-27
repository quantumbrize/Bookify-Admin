interface ErrorType {
    serverEnv: string;
    username: string;
    password: string;
  }
  
  export const validateLogin = (
    serverEnv: string,
    username: string,
    password: string,
    setError: React.Dispatch<React.SetStateAction<ErrorType>>
  ): boolean => {
    const newErrors: ErrorType = {
      serverEnv: '',
      username: '',
      password: ''
    };
  
    let isValid = true;
  
    // Check if serverEnv is empty
    if (!serverEnv.trim()) {
      newErrors.serverEnv = 'Server Environment is required';
      isValid = false;
    }
  
    // Check if username is empty
    if (!username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }
  
    // Check if password is empty or less than 6 characters
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }
  
    setError(newErrors);
    return isValid;
  };
  