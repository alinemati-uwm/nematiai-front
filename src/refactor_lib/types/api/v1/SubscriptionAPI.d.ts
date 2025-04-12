export interface SubscriptionAPIResponse {
  getAllPlans: {
    plans: Array<{
      id: number;
      title: string;
      description: string;
      price: number;
      is_monthly: boolean;
      credit: number;
      isActive?: boolean;
      features: {
        title: string;
        description: string;
      }[];
      active: boolean;
    }>;
  };

  createPayment: {
    url: string;
    amount: number;
  };

  getUserSubscription: {
    subscriptions: [
      {
        plan: {
          id: number;
          title: string;
          description: string;
          price_monthly: number;
          price_annual: number;
          credit: number;
        };
        active: boolean;
        start_date: Date;
        end_date: Date;
        credit: number;
        credit_used: number;
        annual: boolean;
        price: number;
      },
    ];
  };
  getReferralCode: {
    referral_code: string;
    referral_bonus: string;
  };
}

export interface SubscriptionAPIRequest {
  createPayment: {
    plan_id: number;
    payment_type: string;
    annual: boolean;
    price: number;
  };
  applyReferralCode: {
    referral_code: string;
    email: string;
  };
}
