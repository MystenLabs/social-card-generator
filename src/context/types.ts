export interface User {
  id: string;
  username: string;
  name: string;
  profileImageUrl?: string;
  verified?: boolean;
  publicMetrics?: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
  };
  token?: string; // JWT token for API authentication
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}
