# Doppler Menu Micro-Frontend

This MFE renders Doppler user's nav bar and related components.

## Public API

### Configuration

See [AppConfiguration interface](./src/AppConfiguration.tsx) for updated information.

The global object `"doppler-menu-mfe-configuration"` could be used to configure the behavior of this application.

- `dopplerMenuElementId?: string`: where the menu will be rendered.
- `useDummies?: boolean`: when it is true, dummy data will be used, in place of the real backend.
- `dopplerLegacyBaseUrl?: string`: it is required to connect with the Doppler Legacy backend, for example to submit EAV Form.
- `onStatusUpdate?: (status: "unknown" | "non-authenticated" | "authenticated") => void;`: Function to be executed when the session status is updated.

Example:

```javascript
window["doppler-menu-mfe-configuration"] = {
  dopplerMenuElementId: "doppler-menu-mfe",
  dopplerLegacyBaseUrl: "https://app2.fromdoppler.com",
  onStatusUpdate: (status) => {
    if (status === "authenticated") {
      // Only show the page content after Menu is ready
      document
        .getElementsByClassName("dp-hidden-page")[0]
        ?.classList.add("dp-show-page");
    } else if (status === "non-authenticated") {
      // When the status change to non-authenticated, redirect to Login page
      window.top.location =
        "https://app.fromdoppler.com/login" +
        "?redirect=" +
        window.location.pathname +
        window.location.search;
    }
  },
};
```

### Connection with Session MFE

Menu MFE consumes [Session MFE](https://github.com/FromDoppler/doppler-session-mfe/blob/main/README.md),
so we read the global variable `window.dopplerSessionState` and listen to `doppler-session-state-update`,
see [doppler-session-mfe-conventions](./src/session/doppler-session-mfe-conventions.ts).

It is the source of the menu data.

### Communication with Doppler Legacy Backend

We are trying to decouple it from Doppler Legacy Backend, but we still uses it a little bit, see
[dopplerLegacyClient.ts](./src/client/dopplerLegacyClient.ts) for details.

### Override active menu item

Active menu item is identified based on the URL but it is possible modify the behavior including elements
in the DOM.

**_Set default menu item_**

```html
<meta
  name="doppler-menu-mfe:default-active-item"
  content="listCustomFieldMenu"
/>
```

If the DOM contains a _meta_ tag with the name `doppler-menu-mfe:default-active-item`, the _IdHTML_
referenced by content value is used when the current URL does not match with a menu item.

**_Force default menu item_**

```html
<meta name="doppler-menu-mfe:force-active-item" content="listCustomFieldMenu" />
```

If the DOM contains a _meta_ tag with the name `doppler-menu-mfe:force-active-item`, the _IdHTML_
referenced by content value is used to select the menu item whatever the current URL is.
