export interface WorkspaceAPIRequest {
  createWorkspace: {
    name: string;
  };
  updateWorkspaceName: {
    name: string;
  };
  transferOwnership: {
    workspace_id: number;
    member_id: number;
  };
  inviteToWorkspace: {
    workspace_id: number;
    email: string;
    role: string;
  };
  confirmInviteToWorkspaceWithRegister: {
    email: string;
    username: string;
    password: string;
    token: string;
  };
  confirmInviteToWorkspaceWithoutRegister: {
    email: string;
    token: string;
  };
  addAppToWorkspace: {
    app_id: number;
  };
  changeMemberRole: {
    member_id: number;
    role: string;
  };
  moveAppToAnotherWorkspace: {
    app_id: number;
    workspace_id: number;
  };
  moveDocumentToAnotherWorkspace: {
    document_id: number;
    workspace_id: number;
  };
  deleteWorkspaceHistory: {
    historyId: number;
    app_type?: AppsType;
  };
  getWorkspaceDocuments: {
    appType: string;
    page: number;
    page_size: number;
    search?: string;
  };
  getWorkspaceApps: {
    page: number;
    page_size: number;
    search?: string;
  };
  moveAppToAnotherWorkspace: {
    workspaceId: number;
    data: WorkspaceAPIRequest["moveAppToAnotherWorkspace"];
    requestConfig?: AxiosRequestConfig;
  };
}

export interface WorkspaceAPIResponse {
  createWorkspace: {
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
  getUserWorkspace: Array<{
    id: number;
    role: {
      title: string;
      access_level: Array<{
        title: string;
      }>;
    };
    workspace: {
      name: string;
      id: number;
    };
    is_base: boolean;
    is_default: boolean;
  }>;
  updateWorkspaceName: {
    name: string;
    id: number;
  };

  getWorkspaceDocuments: {
    id: number;
    workspace: {
      name: string;
    };
    history: {
      urls?: string[];
      id: number;
      answer_text: string;
      created_at: Date;
      updated_at: Date;
      uuid: string;
    };
    name: string;
  }[];
  getWorkspaceMembers: Array<{
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
      access_level: Array<{
        title: string;
      }>;
    };
    workspace: {
      name: string;
      id: number;
    };
    is_base: boolean;
    is_default: boolean;
  }>;
  deleteWorkspace: {
    name: string;
    id: number;
  };
  confirmInviteToWorkspaceWithRegister: {
    tokens: {
      access_token: string;
      refresh_token: string;
    };
    workspace_member: {
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
    };
  };
  confirmInviteToWorkspaceWithoutRegister: {
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
  };

  getWorkspaceApps: {
    id: number;
    app: {
      id: number;
      topic: string;
      task: string;
      prompt: string;
      params: any;
      status: string;
      template_type: string;
      is_favorite: true;
    };
  }[];
  getUserApps: Array<{
    id: number;
    topic: string;
    task: string;
    prompt: string;
    params: object[];
    status: string;
  }>;
  addAppToWorkspace: {
    id: number;
    app: {
      id: number;
      topic: string;
      task: string;
      prompt: string;
      params: object[];
      status: string;
    };
    workspace: {
      name: string;
      id: number;
    };
  };
  changeWorkspaceToDefault: {
    name: string;
    id: number;
  };
  changeMemberRole: {
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
    };
    workspace: {
      name: string;
      id: number;
    };
  };
  addPersonalDoc: {
    id: number;
    name: string;
    workspace_id: number;
    history: {
      urls?: string[];
      id: number;
      answer_text: string;
      created_at: Date;
      updated_at: Date;
      uuid: string;
    };
  };
  getPersonalDoc: {
    id: number;
    name: string;
    workspace_id: number;
  }[];
  changePersonalDocument: {
    id: number;
    name: string;
    history: {
      urls?: string[];
      id: number;
      answer_text: string;
      created_at: Date;
      updated_at: Date;
    };
  };
}
