import {IHomeAction} from './actions/HomeActions'
import {HomeTypes} from './actions/types'
import {IDailyAverage, IDashboardWeek, HomePayload, IMinutesPoint, IDailyAveragesGraph, IDailyAveragesPoint, IHomeHeaderStats} from './models/Home'

const WELLNESS_LINK = 'https://www.smilingmind.com.au/wellbeing-support'

type SessionData = {
  minutesGraph: IMinutesPoint[]
  homeHeaderStats: IHomeHeaderStats
}

interface IHomeDataMapper {
  calculateHeaderStats: (dashboard: IDashboardWeek[]) => SessionData
  calculateAveragesGraph: (dashboard: IDailyAverage[]) => IDailyAveragesGraph[]
}

function onlyUnique<T>(value: T, index: number, self: Array<T>) {
  return self.indexOf(value) === index
}

const DayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

class HomeDataMapper implements IHomeDataMapper {
  private last30Dates: Date[]

  constructor() {
    this.last30Dates = this.getLast30Dates()
  }

  private getLast30Dates = () => {
    const today = new Date()

    const last30Dates = []
    for (let offset = 0; offset < 30; offset += 1) {
      const newDay = new Date(today.getTime() - (offset * 24 * 60 * 60 * 1000))

      last30Dates.push(newDay)
    }

    return last30Dates
  }

  private getEmptyPoint(theme: string, date: string, displayDate: string, day: string) {
    return {themeName: theme, date, displayDate, day, dailyAverage: null}
  }

  public calculateAveragesGraph(averages: IDailyAverage[]): IDailyAveragesGraph[] {
    // TODO: fix this mapping, guessing at values for now
    const ThemeMap = ['Relationships', 'Sleep', 'Awareness', 'Focus', 'Responding', 'Stress']

    const relaventThemes = averages.filter(({date}) => {
      const thisDate = new Date(date)
      const referenceDate = this.last30Dates[7]

      return thisDate > referenceDate
    }).map(({themeId}) => (ThemeMap[themeId] || `${themeId}`)).filter(onlyUnique)

    const nonNullPoints = averages.map((average) => {
      const {date, themeId, dailyAverage} = average

      const themeName = ThemeMap[themeId] || `${themeId}`
      const thisDate = new Date(date)

      return {
        themeName,
        date: thisDate.toISOString().substr(0, 10),
        displayDate: `${thisDate.getDate()}/${thisDate.getMonth() + 1}`,
        day: DayMap[thisDate.getDay()],
        dailyAverage,
      }
    })

    const allGraphs: IDailyAveragesGraph[] = []

    relaventThemes.forEach(theme => {
      // Make all points for theme
      const mappedThemePoints = nonNullPoints.filter(point => point.themeName === theme)

      const themePoints: IDailyAveragesPoint[] = []

      this.last30Dates.forEach(date => {
        const thisDateString = date.toISOString().substr(0, 10)

        const graphPoint = mappedThemePoints.find(point => point.date === thisDateString) ||
          this.getEmptyPoint(theme, thisDateString, `${date.getDate()}/${date.getMonth() + 1}`, DayMap[date.getDay()])

        themePoints.push(graphPoint)
      })
      const sortedPoints = themePoints.sort((aveA, aveB) => (new Date(aveA.date).getTime() - new Date(aveB.date).getTime()))

      // Add redline data if needed
      const meetsRedlineConditions: boolean = sortedPoints.slice(-7).filter(point => {
        if (point.dailyAverage === null) { return false }

        return point.dailyAverage < 2
      }).length > 2

      let redlineData
      if (meetsRedlineConditions) {
        // TODO: add actual copy here
        redlineData = {
          redlineMessage: 'We care about you & noticed you might be struggling.',
          redlineUrl: WELLNESS_LINK,
          redlineLinkText: 'See these resources for help.',
        }
      }

      allGraphs.push({themeName: theme, dataPoints: sortedPoints, redlineData})
    })

    return allGraphs
  }

  public calculateHeaderStats(dashboard: IDashboardWeek[]) {
    // Note: the BE data model currently sends back an array, but we only want
    // the first item. Unsure of why it was designed like this
    const {sessionCount, streak, graph: responseGraph, weekEnding} = dashboard[0]

    const referenceDate = new Date(weekEnding)
    const maxTimeValue = Math.max(...responseGraph.map(res => res.timeValue))

    const minutesGraph = responseGraph.map((graph, index) => {
      const dayOffset = responseGraph.length - 1 - index
      const thisDate = new Date(referenceDate.getTime() - (dayOffset * 24 * 60 * 60 * 1000))
      const timePercentage = Math.round((graph.timeValue / maxTimeValue) * 100)

      return {
        date: thisDate.toISOString().substr(0, 10),
        displayDate: `${thisDate.getDate()}/${thisDate.getMonth() + 1}`,
        day: DayMap[thisDate.getDay()],
        timePercentage,
        timeValue: graph.timeValue,
      }
    })

    return {minutesGraph, homeHeaderStats: {sessionCount, streak}}
  }
}

interface IHomeState {
  minutesGraph?: IMinutesPoint[]
  homeHeaderStats?: IHomeHeaderStats
  averagesGraph?: IDailyAveragesGraph[]
  error?: Error
}

const HomeReducer = (mapper: IHomeDataMapper) => {
  return (
    state: IHomeState = {},
    action: IHomeAction
  ): IHomeState => {
    state
    action
    switch (action.type) {
      case HomeTypes.HOME_DATA_UPDATED:
        const {weeks, dailyAverages} = action.payload as HomePayload

        const sessionData = mapper.calculateHeaderStats(weeks)
        const averagesGraph = mapper.calculateAveragesGraph(dailyAverages)

        return {...sessionData, averagesGraph}
      case HomeTypes.HOME_DATA_FAILED_TO_UPDATE:
        return {error: action.error}
      default:
        return state
    }
  }
}

export {IHomeState, HomeReducer, IHomeDataMapper, HomeDataMapper}
