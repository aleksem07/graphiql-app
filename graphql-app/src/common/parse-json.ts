export const parseJson = (json: string) => {
  let parsedJson = {};
  try {
    parsedJson = JSON.parse(json);
  } catch (error) {
    parsedJson = {};
  }

  return parsedJson;
};
