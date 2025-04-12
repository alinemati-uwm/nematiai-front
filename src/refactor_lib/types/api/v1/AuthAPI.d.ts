export interface AuthAPIRequest {
  register: {
    email: string;
    username: string;
    password: string;
  };
  registerConfirm: {
    token: string;
    email: string;
  };
  sendItAgain: {
    email: string;
  };
  login: {
    email: string;
    password: string;
  };
  refresh: {
    refresh_token: string;
  };
  forgetPassword: {
    email: string;
  };
  validateForgetPasswordToken: {
    token: string;
    email: string;
  };
  setNewPassword: {
    token: string;
    email: string;
    new_password: string;
    confirm_password: string;
  };
  oauthGoogle: {
    user_id: string;
    name: string;
    email: string;
    picture: string;
  };
}

export interface AuthAPIResponse {
  register: {
    message: string;
    workspace: {
      id: number;
      is_base: boolean;
      is_default: boolean;
      workspace: {
        name: string;
        id: number;
      };
      user: {
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
      role: {
        title: string;
      };
    };
  };
  registerConfirm: {
    access_token: string;
    refresh_token: string;
  };
  login: {
    access_token: string;
    refresh_token: string;
    workspace: {
      id: number;
      is_base: boolean;
      is_default: boolean;
      workspace: {
        name: string;
        id: number;
      };
      user: {
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
      role: {
        title: string;
      };
    };
  };
  refresh: {
    access_token: string;
    refresh_token: string;
  };
  forgetPassword: {
    message: string;
  };
  validateForgetPasswordToken: {
    token: string;
    email: string;
  };
  setNewPassword: {
    message: string;
  };
  oauthGoogle: {
    access_token: string;
    refresh_token: string;
    workspace: {
      id: number;
      is_base: boolean;
      is_default: boolean;
      workspace: {
        name: string;
        id: number;
      };
      user: {
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
      role: {
        title: string;
      };
    };
  };
}
