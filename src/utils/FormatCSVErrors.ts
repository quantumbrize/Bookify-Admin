const formatCSVErrors = (errorArray: any) => {
    return errorArray
      .map((error: { row: any; header: any; message: any; }) => `• Row ${error.row}, Column "${error.header}": ${error.message}`)
      .join('<br>');
  };
  export default formatCSVErrors;
  