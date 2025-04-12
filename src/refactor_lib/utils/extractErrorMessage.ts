const extractErrorMessage = (err: any, fallbackMessage: string = "") => {
  if (err?.response?.data?.detail) return err.response.data.detail as string;
  if (err?.response?.data?.message) return err.response.data.message as string;
  return fallbackMessage;
};

export default extractErrorMessage;
