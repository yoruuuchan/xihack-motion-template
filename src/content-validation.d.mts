export type ContentIssue = {
  path: string;
  message: string;
};

export type ContentValidationOptions = {
  expectedMembers?: number;
};

export const validateContent: (value: unknown, options?: ContentValidationOptions) => ContentIssue[];
