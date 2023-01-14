import ffmpeg from 'fluent-ffmpeg'
import { ManyVideosConfigs, VideoConfigs } from '../types/VideoConfigs'

export function getVideoName(path: string) {
  return path.split('/').slice(-1)[0].split('.')[0]
}

export async function generateVideoWithNewResolution(configs: VideoConfigs) {
  let middleName = '-' 

  const id = (new Date()).valueOf().toString()
  const video = ffmpeg(configs.originalVideoPath)

  if (configs.fps) {
    middleName += 'FPS' + configs.fps + '-'
    video.FPS(configs.fps)
  }

  if (configs.resolution) {
    middleName += configs.resolution + '-'
    video.size(configs.resolution)
  }

  const newFileName = `${configs.destinationVideoPath}${middleName}${id}.mp4`
  
  video
    .save(newFileName)
    .on('start', () => console.log(`Starting - ${getVideoName(newFileName)}`))
    .on("end", () => console.log(`Finished - ${getVideoName(newFileName)}`));
}

export function generateMabyVideoWithNewResolution(configs: ManyVideosConfigs) {
  Promise.all(
    configs.resolutions.map((resolution) => {
      generateVideoWithNewResolution({
        destinationVideoPath: configs.destinationVideoPath,
        originalVideoPath: configs.originalVideoPath,
        fps: 60,
        resolution: resolution.toString(),
      });
    })
  );
   
}