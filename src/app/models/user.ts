export interface User {
  id?: number;
  email?: string;
  username?: string;
  unsubscribe?: boolean;
  ban?: boolean;
  ban_until?: string;
}
