import {
  MdLink,
  MdWebAsset,
  MdTimeline,
  MdOutlineArticle,
} from 'react-icons/md'
import { GrAppleAppStore } from 'react-icons/gr'
import { FaGooglePlay, FaGithub, FaTwitter } from 'react-icons/fa'
import { IoAppsSharp } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { BsCalendar, BsCalendarPlus, BsCalendarCheck } from 'react-icons/bs'

export const LinkIcon = () => {
  return <MdLink />
}

export const WebIcon = () => {
  return <MdWebAsset />
}

export const AppStoreIcon = () => {
  return <GrAppleAppStore />
}

export const GooglePlayIcon = () => {
  return <FaGooglePlay />
}

export const GithubIcon = () => {
  return <FaGithub />
}

export const AppIcon = () => {
  return <IoAppsSharp />
}

export const TimelineIcon = () => {
  return <MdTimeline />
}

export const ArticleIcon = () => {
  return <MdOutlineArticle />
}

export const ProfileIcon = () => {
  return <CgProfile />
}

export const TwitterIcon = () => {
  return <FaTwitter />
}

export const CalendarIcon = () => {
  return <BsCalendar />
}

export const CalendarPlusIcon = () => {
  return <BsCalendarPlus />
}

export const CalendarCheckIcon = () => {
  return <BsCalendarCheck />
}
