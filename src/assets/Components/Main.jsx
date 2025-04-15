export default function Main({ data }) {
  return (
    <div className="imgContainer">
      {data.media_type === "image" ? (
        <img src={data.hdurl} alt={data.title || "NASA Image"} className="bgImage" />
      ) : (
        <iframe
          src={data.url}
          title={data.title || "NASA Video"}
          className="bgVideo"
          allowFullScreen
        />
      )}
    </div>
  );
}
