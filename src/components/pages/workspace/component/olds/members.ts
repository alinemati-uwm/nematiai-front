export type WorkspaceMember = {
  id: number;
  user: {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    date_joined: Date | string;
    phone_number: null | string;
    description: null | string;
    is_verified: boolean;
    profile_image: string | null;
  };
  role: {
    title: string;
    access_level: { title: string }[];
  };
  workspace: {
    name: string;
    id: number;
  };
  is_base: boolean;
  is_default: boolean;
};
