class AxiosError {
  constructor(axiosError) {
    console.log(axiosError);
    // Falls out of 2xx range
    if (axiosError.body) {
      this.statusCode = axiosError.statusCode;
      this.errorType = "api-error";
      this.message =  axiosError.error_description;
    }
  }
}

export { AxiosError };
