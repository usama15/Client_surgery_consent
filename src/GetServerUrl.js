const GetServerUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return ``;
  } else {
    return `http://54.147.158.84:5000`;
  }
};

export default GetServerUrl;

