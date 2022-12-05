// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { beamerInitialize } from "react-beamer";
import { useEffect } from "react";
import { User } from "../model";
import { defaultLanguage } from "./i18n/MenuIntlProvider";

export const BEAMER_ID = "wCWRrvwa50706";
export const BEAMER_URL = null;

export const BEAMER_CONFIG = {
  selector: ".beamer-icon",
  top: -8,
  right: -8,
  language: defaultLanguage,
};

interface NotificationProp {
  user: User;
}

export const Notifications = ({ user }: NotificationProp) => {
  useEffect(() => {
    // Title: How to Install Beamer on your Website or App
    // Date: Apr 17, 2018 · Last updated on Nov 03, 2022
    // Availability: https://www.getbeamer.com/blog/tutorial-how-to-use-beamer-in-your-website-or-app
    beamerInitialize(BEAMER_ID, BEAMER_URL, {
      ...BEAMER_CONFIG,
      //---------------Visitor Information---------------
      user_firstname: user.fullname,
      user_email: user.email,
      language: user.lang,
    });
  }, [user]);

  return (
    <li>
      <span className="user-menu--open active">
        <span className="ms-icon icon-notification beamer-icon" />
      </span>
    </li>
  );
};
