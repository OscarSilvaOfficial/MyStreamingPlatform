import { generateMabyVideoWithNewResolution } from './utils/video'

const BUCKET_VIDEO_PATH = '../bucket/videos'
const resolutions = ['1920x1080', '100x100', '200x200', '300x300']

generateMabyVideoWithNewResolution({
  resolutions,
  fps: 60,
  destinationVideoPath: `${BUCKET_VIDEO_PATH}/converted/video-test`,
  originalVideoPath: `${BUCKET_VIDEO_PATH}/originals/video-test.mp4`,
})