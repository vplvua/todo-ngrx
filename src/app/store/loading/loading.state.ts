export interface LoadingState {
  isLoading: boolean;
  pendingRequests: number;
}

export const initialLoadingState: LoadingState = {
  isLoading: false,
  pendingRequests: 0,
};
