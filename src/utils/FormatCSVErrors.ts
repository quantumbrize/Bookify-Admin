const formatCSVErrors = (errorArray: any) => {
    return errorArray
      .map((error: { row: any; column: any; message: any; }) => `• Row ${error.row}, Column "${error.column}": ${error.message}`)
      .join('<br>');
  };
  export default formatCSVErrors;
  