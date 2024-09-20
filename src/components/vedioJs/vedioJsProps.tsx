import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";   
 // Ensure the YouTube plugin is included

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure the video element exists before initialization
    if (videoRef.current) {
      const player = videojs(videoRef.current, {
        controls: true,
        width: 700,
        height: "auto",
        preload: "auto",
        loop: false,
        autoplay: false,
        techOrder: ["youtube"], // Prioritize YouTube playback using the plugin
      });

      player.src({
        type: "video/youtube",
        src: videoId,
      });

      return () => player.dispose();
    }
  }, [videoId]);

  return (
    <div>
      {/* Make sure the video element is rendered before this point */}
      <video
        ref={videoRef}
        id="my-video"
        className="video-js"
        controls
        width={700}
        height="auto"
        preload="auto"
        loop={false}
        data-setup="{}" // (Optional) Additional video.js configuration
        autoPlay={false}
      />
    </div>
  );
};

export default VideoPlayer;