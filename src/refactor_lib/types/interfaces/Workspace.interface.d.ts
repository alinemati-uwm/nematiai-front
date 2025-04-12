export interface WorkspaceShape {
  id: number;
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
    access_level: [
      {
        title: string;
      },
    ];
  };
  workspace: {
    name: string;
    id: number;
  };
  is_base: boolean;
  is_default: boolean;
}
