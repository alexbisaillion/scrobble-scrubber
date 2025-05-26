import { ValidationError } from "./types";

type LastFmCredentials = {
  LAST_FM_API_KEY: string;
};

type ValidateEnvResult = ValidationError | LastFmCredentials;

export const validateEnv = (): ValidateEnvResult => {
  const { LAST_FM_API_KEY } = process.env;
  if (!LAST_FM_API_KEY) {
    return {
      error: "Internal server error: API key not found.",
      status: 500,
    };
  }
  return { LAST_FM_API_KEY };
};
