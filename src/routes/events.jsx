export default function Events({ selectedItem }) {
  return (
    <>
      <button role="button" className="cec-button cec-button--back">
        Back to results
      </button>
      <h2 className="selected-item-details--title text-center">
        {selectedItem.title}
      </h2>
      {formatDate(selectedItem.dateStartEnd.from) ===
      formatDate(selectedItem.dateStartEnd.to) ? (
        <p className="text-center fs-5">
          {formatDate(selectedItem.dateStartEnd.from)}.
        </p>
      ) : (
        <p>
          {formatDate(selectedItem.dateStartEnd.from)} to
          {formatDate(selectedItem.dateStartEnd.to)}.
        </p>
      )}
      <div className="selected-item-details">
        <div className="row">
          <div className="col-12">
            {selectedItem.image != null} &&{" "}
            <img
              className="rounded mx-auto d-block featured-img"
              src={`https://www.cheshireeast.gov.uk/${selectedItem.image.asset.sys.uri}`}
              alt={selectedItem.title}
            />
            <hr />
          </div>
          <div className="col-lg-6 pb-lg-2">
            <h3>Description</h3>
            <div
              className="selected-item-details--description"
              dangerouslySetInnerHTML={{ __html: selectedItem.description }}
            ></div>
          </div>
          <div className="col-lg-6 pb-2">
            <h3>Details</h3>
            {formatDate(selectedItem.dateStartEnd.from) ===
            formatDate(selectedItem.dateStartEnd.to) ? (
              <p>
                <strong>Time:</strong> {getTime(selectedItem.dateStartEnd.from)}{" "}
                - {getTime(selectedItem.dateStartEnd.to)}.
              </p>
            ) : (
              <>
                <p>
                  <strong>From: </strong>
                  {getTime(selectedItem.dateStartEnd.from)},{" "}
                  {formatDate(selectedItem.dateStartEnd.from)}.
                </p>
                <p>
                  <strong>To: </strong>
                  {getTime(selectedItem.dateStartEnd.to)},{" "}
                  {formatDate(selectedItem.dateStartEnd.to)}.{" "}
                </p>
              </>
            )}
            <p>
              <strong>Leader(s):</strong> {selectedItem.leaders}
            </p>
            <p>
              <strong>More information:</strong>
              <span
                dangerouslySetInnerHTML={{
                  __html: selectedItem.eventInformation,
                }}
              ></span>
            </p>
            <p>
              <strong>Tags:</strong>
            </p>
            <ul>
              {selectedItem.tags.map((t) => (
                <li key={t.name}>{t.name}</li>
              ))}
            </ul>
            <h3>Meeting point</h3>
            <p
              dangerouslySetInnerHTML={{ __html: selectedItem.meetingPoint }}
            ></p>
            <div className="selected-item-details__map">
              <div id="map" ref="mapDiv">
                <a
                  target="_blank"
                  href={`https://maps.google.com/maps?q=${selectedItem.mapLocation.lat},${selectedItem.mapLocation.lon}`}
                  className="cec-button cec-button-forward"
                  role="button"
                  aria-pressed="true"
                >
                  Get Directions <small>(opens new window)</small>
                </a>
              </div>
              <div className="share">
                <div className="card">
                  <p id={selectedEventUrlElem}>
                    {prependUrl(selectedItem.sys.slug)}
                  </p>
                  <button
                    onClick={() => getShareableLink(selectedItem)}
                    type="button"
                    aria-pressed="true"
                    className="ranger-event-title-link-button cec-button"
                  >
                    <small>Copy URL to clipboard</small>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <hr />
            <button role="button" className="cec-button cec-button--back">
              Back to results
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
