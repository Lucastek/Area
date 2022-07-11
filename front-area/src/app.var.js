const host = process.env.NODE_ENV === "development" ? process.env.REACT_APP_LOCAL_HOST : process.env.REACT_APP_SERVER_HOST;
export default host;
