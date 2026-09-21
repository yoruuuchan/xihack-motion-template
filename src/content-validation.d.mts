export type ContentIssue = {
  path: string;
  message: string;
};

export const validateContent: (value: unknown) => ContentIssue[];
