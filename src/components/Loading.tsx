interface LoadingProp {
  page?: boolean;
}

export const Loading = ({ page }: LoadingProp) => {
  if (page) {
    return (
      <div data-testid="wrapper-loading" className="wrapper-loading">
        <div data-testid="loading-page" className="loading-page" />
      </div>
    );
  }
  return <div data-testid="loading-box" className="loading-box" />;
};
