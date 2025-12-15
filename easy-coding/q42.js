// 42. Parse query params into an object.

function deserialiseParams(queryParams) {
  if (queryParams.startsWith("?")) {
    queryParams = queryParams.slice(1);
  }

  const objArr = queryParams.split("&");

  const queryObj = {};

  for (let obj of objArr) {
    let a = decodeURIComponent(obj);
    const [key, value] = a.split("=");
    queryObj[key] = value;
  }

  return queryObj;
}

const queryParams = "?name=John%20Doe&age=30&city=New%20York";

console.log(deserialiseParams(queryParams), queryParams);
