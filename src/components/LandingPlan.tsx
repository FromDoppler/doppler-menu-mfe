interface LandingPack {
  packageQty: number;
  landingsQty: number;
}

export const LandingPlan = ({
  planName,
  buttonUrl,
  buttonText,
  landingPacks,
}: {
  planName?: string;
  buttonUrl?: string;
  buttonText?: string;
  landingPacks: Array<LandingPack>;
}) => (
  <>
    <div className="user-plan--type">
      <p className="user-plan--monthly-text">
        <strong>{planName}</strong>
        {landingPacks?.length > 0 &&
          landingPacks.map((lp, index) => (
            <span
              key={`package-${index}`}
            >{`${lp.packageQty} Pack de ${lp.landingsQty} landings c/u`}</span>
          ))}
      </p>
      <a type="button" href={`${buttonUrl}?buyType=3`} className="user-plan">
        {buttonText}
      </a>
    </div>
  </>
);
