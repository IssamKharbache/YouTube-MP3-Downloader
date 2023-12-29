import axios from "axios";
import { useRef, useState } from "react";
import { MdDownload } from "react-icons/md";
import { getIDfromURL } from "./parseUrl";
import { Audio, ColorRing } from "react-loader-spinner";
function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/",
      params: {
        url: inputUrlRef.current.value,
      },
      headers: {
        "X-RapidAPI-Key": "b69c3a8773mshb331c41fd8cf0c5p1338f7jsn0667578c006b",
        "X-RapidAPI-Host": "youtube-mp3-downloader2.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setUrlResult(response.data);
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <span className="logo">Youtube MP3 Downloader</span>
      <section className="content">
        <h1 className="content_title">Youtube to MP3 Downloader</h1>
        <p className="description">
          {urlResult
            ? "Video details"
            : "Change Youtube video links to MP3 in a second"}
        </p>

        {urlResult ? (
          <div className="link_info">
            <h1>Title</h1>
            <p>{urlResult.title}</p>
            <h1>File Size </h1>
            <p>{urlResult.size}</p>
            <div className="button_area">
              <a
                href={urlResult.link}
                target="_blank"
                rel="noreferrer"
                className="download_link"
              >
                Download <MdDownload />
              </a>
              <button
                className="search_again"
                onClick={() => {
                  setUrlResult(null);
                  setError(null);
                }}
              >
                Search Again
              </button>
            </div>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            {error ? (
              <p className="errorMessage">
                {" "}
                Provide a correct link and Try again{" "}
              </p>
            ) : (
              ""
            )}
            <input
              className="link"
              ref={inputUrlRef}
              placeholder="Paste your Youtube video URL"
              required
            />
            <button type="submit" disabled={loading} className="form_button">
              {loading ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              ) : (
                "Search"
              )}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

export default App;
