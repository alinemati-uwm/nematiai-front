export interface UserAPIRequest {
  updateMe: Partial<{
    first_name: string;
    last_name: string;
    phone_number: string;
    description: string;
  }>;
  changePassword: {
    old_password: string;
    new_password: string;
    confirm_password: string;
  };
  changeProfileImage: {
    file: File;
  };
  changeEmailToken: {
    email: string;
  };
  changeEmailConfirm: {
    email: string;
    token: string;
  };
  invite: {
    email: string;
  };
}

export interface UserAPIResponse {
  getMe: {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    date_joined: Date;
    phone_number: string;
    description: string;
    is_verified: boolean;
    profile_image: string;
    plan: {
      id: number;
      title: string;
      description: string;
      price_monthly: number;
      price_annual: number;
      credit: number;
    };
    subscription: {
      active: true;
      start_date: Date;
      end_date: Date;
      daily_bonus: number;
      base_daily_bonus: number;
      referral_bonus: number;
      base_credit: number;
      credit: number;
      annual: boolean;
      price: number;
      status: string;
      total_credit: number;
    };
  };
  updateMe: {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    date_joined: Date;
    phone_number: string;
    description: string;
    is_verified: boolean;
    profile_image: string;
  };

  changePassword: string;
  changeProfileImage: {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    date_joined: Date;
    phone_number: string;
    description: string;
    is_verified: boolean;
    profile_image: string;
  };
  changeEmailToken: {
    message: string;
  };
  changeEmailConfirm: {
    message: string;
  };
  deactivateAccount: {
    message: string;
  };
}
