const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const formatDate = (value) => {
  return value.toLocaleString("en-GB", dateOptions);
};
const getTime = (value) => {
  let time = value.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  if (time === "0:00 pm") {
    return "12 noon";
  } else if (time.startsWith("0")) {
    time = `12${time.slice(1)}`;
  }
  return time.replace(" ", "");
};

const elem = (item) => {
  return (
    <div
      key={item.title + item.dateStartEnd.from.toLocaleString()}
      className="ranger-event-card card card-item flex-md-row align-items-center"
    >
      <div className="col-12 col-md-4 thumbnail-container d-flex justify-content-center px-2">
        {item.image !== null && (
          <img
            className="img-thumbnail img-fluid mt-4 m-md-2"
            src={`https://www.cheshireeast.gov.uk/${item.image.asset.sys.uri}?width=225&height=150&fit=crop,center`}
            alt={item.title}
          />
        )}
      </div>
      <div className="card-body col-12 col-md-8 text-center text-md-start ps-md-4 ps-xl-2">
        <button
          onClick={() => console.log("View details")}
          role="button"
          className="ranger-event-title-link-button mb-3"
        >
          {item.entryTitle}
        </button>
        {formatDate(item.dateStartEnd.from) ===
        formatDate(item.dateStartEnd.to) ? (
          <>
            <p>{formatDate(item.dateStartEnd.from)}.</p>
            <p>
              <strong>Time:</strong> {getTime(item.dateStartEnd.from)} -
              {getTime(item.dateStartEnd.to)}.
            </p>
          </>
        ) : (
          <>
            <p>
              From {getTime(item.dateStartEnd.from)} on
              {formatDate(item.dateStartEnd.from)}.
            </p>
            <p>
              Until {getTime(item.dateStartEnd.to)} on
              {formatDate(item.dateStartEnd.to)}.
            </p>
          </>
        )}
        <p>{item.excerpt}</p>
      </div>
    </div>
  );
};

const Listing = ({ items }) => {
  return items.map((item) => elem(item));
};

export default Listing;
