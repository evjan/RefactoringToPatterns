interface IDashboardWeek {
  weekEnding: string
  sessionCount: number
  duration: number
  streak: number
  graph: IDashboardWeekGraph[]
}

interface IDashboardWeekGraph {
  date: number
  timeValue: number
  moodValue: number
}

interface IDailyAverage {
  themeId: number
  date: string
  dailyAverage: number
}


type HomePayload = {
  weeks: IDashboardWeek[]
  dailyAverages: IDailyAverage[]
}

interface IGraphPoint {
  date: string
  displayDate: string
  day: string
}

interface IDailyAveragesPoint extends IGraphPoint {
  themeName: string
  dailyAverage: number | null
}

interface IDailyAveragesGraph {
  themeName: string
  dataPoints: IDailyAveragesPoint[]
  redlineData?: {
    redlineMessage: string
    redlineUrl: string
    redlineLinkText: string
  }
}

interface IMinutesPoint extends IGraphPoint {
  timeValue: number
  timePercentage: number
}

interface IHomeHeaderStats {
  sessionCount: number
  streak: number
}

export {
  IDailyAverage,
  IDailyAveragesGraph,
  IDailyAveragesPoint,
  IMinutesPoint,
  IHomeHeaderStats,
  HomePayload,
  IDashboardWeek,
  IDashboardWeekGraph,
}
