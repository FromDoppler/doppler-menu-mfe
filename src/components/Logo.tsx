export const Logo = ({ url }: { url: string }) => {
  return (
    <div className="logo" aria-label="company logo">
      <a href={url}>
        <span
          className="ms-icon icon-doppler-logo"
          role="img"
          aria-label="logo image"
        />
      </a>
    </div>
  );
};
