import React from "react";
import "video.js/dist/video-js.css";
import "videojs-youtube"; // Ensure the YouTube plugin is included

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  console.log("vedioLink", videoId);

  return (
      <video
        id="my-video"
        className="video-js"
        controls
        width={'700px'}
        height={"auto"}
        preload="auto"
        loop={false}
        data-setup="{}"
        autoPlay={false}
      >
        <source width={'400px'} src={"https://www.youtube.com/watch?v=Xj3gU3jACe8"} type="video/youtube" />
      </video>
  );
};

export default VideoPlayer;
