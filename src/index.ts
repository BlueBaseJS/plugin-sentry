import { BootOptions, createPlugin } from "@bluebase/core";

const Raven = require("raven-js");

export default createPlugin({
  name: "Sentry Plugin",
  key: "sentry-plugin",

  defaultConfigs: {
    "plugin.sentry.url": null
  },
  filters: {
    "bluebase.boot.end": (bootOptions: BootOptions, _ctx: any, BB) => {
      const url = BB.Configs.getValue("plugin.sentry.url");
      if (url !== null) {
        Raven.config(url).install();
      }
      return bootOptions;
    },
    "bluebase.logger.log": (message: string, data: any) => {
      Raven.captureMessage(message, data);
    },
    "bluebase.logger.info": (message: string, data: any) => {
      Raven.captureMessage(message, data);
    },
    "bluebase.logger.debug": (message: string, data: any) => {
      Raven.captureMessage(message, data);
    },
    "bluebase.logger.error": (message: string, data: any) => {
      Raven.captureMessage(message, data);
    },
    "bluebase.logger.warn": (message: string, data: any) => {
      Raven.captureMessage(message, data);
    }
  }
});
