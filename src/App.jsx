import axios from "axios";
import { useRef, useState } from "react";
import { MdDownload } from "react-icons/md";
import { getIDfromURL } from "./parseUrl";
import { Audio, ColorRing } from "react-loader-spinner";
import toast from "react-hot-toast";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const [loading, setLoading] = useState(false);

  axios.defaults.timeout = 10000;

  const handleSubmit = async (e) => {
    const youtubeId = getIDfromURL(inputUrlRef.current.value);

    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      params: {
        id: youtubeId,
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
    };
    setLoading(true);
    try {
      const response = await axios.request(options);
      setUrlResult(response.data);
      if (response.data.status === "fail") {
        toast.error("Please try a different URL");
      }
      if (response.data.status === "ok") {
        toast.success("Your link is ready to download", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
      }

      if (urlResult?.filesize === null) {
        setLoading(false);
      }
    } catch (error) {
      toast.error("Please try a different URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <span className="logo">Youtube MP3 Downloader</span>
      <section className="content">
        <h1 className="content_title">Youtube to MP3 Downloader</h1>
        <p className="description">
          {urlResult && urlResult.filesize
            ? "Video details"
            : "Change Youtube video links to MP3 in a second"}
        </p>

        {urlResult && urlResult.filesize ? (
          <div className="link_info">
            <h1>Title</h1>
            <p>{urlResult.title}</p>
            <h1>File Size </h1>
            <p>{(urlResult.filesize / 1024 / 1024).toFixed(2)} Mb</p>
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
                }}
              >
                Search Again
              </button>
            </div>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
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
