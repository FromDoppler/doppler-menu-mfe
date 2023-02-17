// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { beamerInitialize } from "react-beamer";
import { useEffect } from "react";
import { User } from "../model";
import { defaultLanguage } from "./i18n/MenuIntlProvider";
import { useAppConfiguration } from "../AppConfiguration";

// this is a temporary beamer account with limited functions
const BEAMER_URL = null;

const BEAMER_CONFIG = {
  selector: ".beamer-icon",
  top: -8,
  right: -8,
  language: defaultLanguage,
};
interface NotificationProp {
  user: User;
}

export const Notifications = ({ user }: NotificationProp) => {
  const { beamerId } = useAppConfiguration();

  useEffect(() => {
    if (beamerId) {
      // Title: How to Install Beamer on your Website or App
      // Date: Apr 17, 2018 · Last updated on Nov 03, 2022
      // Availability: https://www.getbeamer.com/blog/tutorial-how-to-use-beamer-in-your-website-or-app
      beamerInitialize(beamerId, BEAMER_URL, {
        ...BEAMER_CONFIG,
        user_firstname: user.fullname,
        user_email: user.email,
        language: user.lang,
        user_id: user.idUser,
      });
    }
  }, [user, beamerId]);

  return (
    <li>
      <span className="user-menu--open active">
        <span className="ms-icon dpicon iconapp-notification beamer-icon" />
      </span>
    </li>
  );
};
