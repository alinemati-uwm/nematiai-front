export const credits = [
  {
    id: "1",
    transaction: "Early bird reward",
    credits: "100.00",
    balance: "100.00",
    date: "2024-01-16",
    time: "18:43:56",
  },
  {
    id: "2",
    transaction: "Refral reward",
    credits: "80.00",
    balance: "80.00",
    date: "2024-04-26",
    time: "14:20:56",
  },
] as const;

export const expenses = [
  {
    id: "1",
    app: "AI Writer",
    workspace: "My Workspace",
    consumption: "168",
    unit: "tokens",
    credits: "2.20",
    date: "2024-01-16",
    time: "18:43:56",
  },
  {
    id: "2",
    app: "Article Wizard",
    workspace: "My Workspace",
    consumption: "200",
    unit: "tokens",
    credits: "3.40",
    date: "2024-01-16",
    time: "18:43:56",
  },
  {
    id: "3",
    app: "AI Image",
    workspace: "My Workspace",
    consumption: "1",
    unit: "1344x768",
    credits: "2.20",
    date: "2024-01-16",
    time: "18:43:56",
  },
] as const;
