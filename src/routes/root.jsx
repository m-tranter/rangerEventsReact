import { Outlet, useLoaderData } from "react-router-dom";
import { Client } from "contensis-delivery-api";

const rxDate = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2})?(?:\.\d*)?Z?$/;

const createDates = (arr) => {
  return arr.map((e) => {
    return Object.fromEntries(
      Object.entries(e).map(([k, v]) => {
        if (k.toLowerCase().includes("date")) {
          if (typeof v === "string" && v.match(rxDate)) {
            return [k, new Date(v)];
          } else if (typeof v === "object") {
            try {
              return [k, { from: new Date(v["from"]), to: new Date(v["to"]) }];
            } catch (err) {
              return [k, v];
            }
          }
        } else {
          return [k, v];
        }
      })
    );
  });
};

const accessToken = "QCpZfwnsgnQsyHHB3ID5isS43cZnthj6YoSPtemxFGtcH15I";
const projectId = "website";
const contentType = "rangerEvents";

const config = {
  rootUrl: "https://cms-chesheast.cloud.contensis.com/",
  accessToken: accessToken,
  projectId: projectId,
  language: "en-GB",
  versionStatus: "latest",
  pageSize: 500,
};

export async function loader() {
  let items;
  const getEntries = () => {
    const client = Client.create(config);
    client.entries
      .list({
        contentTypeId: contentType,
        orderBy: ["sys.id"],
      })
      .then((res) => {
        items = createDates([...res.items]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getEntries();
  console.log(items);
  return { items };
}

const Root = () => {
  return (
    <div className="container mt-4">
      <Outlet />
    </div>
  );
};

export default Root;
