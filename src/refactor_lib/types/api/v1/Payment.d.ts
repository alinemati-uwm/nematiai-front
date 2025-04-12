export interface PaymentAPIResponse {
  stripeSuccessCallback: {
    message: string;
  };
  blockbeeSuccessCallback: {
    message: string;
  };
}
