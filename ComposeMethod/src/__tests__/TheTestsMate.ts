import {IHomeAction} from '../actions/HomeActions'

import {IHomeState, HomeReducer as CreateHomeReducer, HomeDataMapper} from '../TheCode'

import {IDailyAverage, IDashboardWeek, IDailyAveragesGraph, IMinutesPoint, IHomeHeaderStats} from '../models/Home'

describe('IGraphMapper: transforms home data from service into params for components in Home Page', () => {
  const mapper = new HomeDataMapper()

  describe('calculateHeaderStats', () => {
    it('transforms dashboard data to home header stats and minutes graph', () => {
      const mockDashboard: IDashboardWeek[] = [{
        weekEnding: '2020-09-21T02:05:35+00:00',
        sessionCount: 3,
        duration: 31,
        streak: 2,
        graph: [{
          date: 0,
          timeValue: 1,
          moodValue: 0.0,
        }, {
          date: 1,
          timeValue: 2,
          moodValue: 0.0,
        }, {
          date: 2,
          timeValue: 3,
          moodValue: 0.0,
        }],
      }]

      const expectedResponse = {
        homeHeaderStats: {
          streak: 2,
          sessionCount: 3,
        },
        minutesGraph: [{
          date: '2020-09-19',
          displayDate: '19/9',
          day: 'Sat',
          timePercentage: 33,
          timeValue: 1,
        }, {
          date: '2020-09-20',
          displayDate: '20/9',
          day: 'Sun',
          timePercentage: 67,
          timeValue: 2,
        }, {
          date: '2020-09-21',
          displayDate: '21/9',
          day: 'Mon',
          timePercentage: 100,
          timeValue: 3,
        }],
      }

      expect(mapper.calculateHeaderStats(mockDashboard)).toEqual(expectedResponse)
    })
  })

  describe('calculateAveragesGraph', () => {
    const dayMiliSec = 24 * 60 * 60 * 1000
    const date = new Date()
    const dateToday = date.toISOString().substr(0, 10)
    const dateYesterday = new Date(date.getTime() - (1 * dayMiliSec)).toISOString().substr(0, 10)
    const date2DaysAgo = new Date(date.getTime() - (2 * dayMiliSec)).toISOString().substr(0, 10)
    const dateBeforeThisWeek = new Date(date.getTime() - (8 * dayMiliSec)).toISOString().substr(0, 10)
    const mockAverages: IDailyAverage[] = [{
      // Currently a Relationships
      themeId: 0,
      date: `${dateToday}T00:00:00Z`,
      dailyAverage: 3.0,
    }, {
      // Currently a Sleep theme, should be excluded from graphs
      themeId: 1,
      date: `${dateBeforeThisWeek}T00:00:00Z`,
      dailyAverage: 3.0,
    }, {
      // Currently a Awareness theme, should be redlined
      themeId: 2,
      date: `${dateToday}T00:00:00Z`,
      dailyAverage: 1.0,
    }, {
      themeId: 2,
      date: `${dateYesterday}T00:00:00Z`,
      dailyAverage: 1.0,
    }, {
      themeId: 2,
      date: `${date2DaysAgo}T00:00:00Z`,
      dailyAverage: 1.0,
    }]

    let response: IDailyAveragesGraph[]
    describe('when theme name for a given id is found', () => {
      beforeAll(() => {
        response = mapper.calculateAveragesGraph(mockAverages)
      })

      it('sorts points increasing by date', () => {
        const firstGraph = response.find(graph => graph.dataPoints.length > 0) as IDailyAveragesGraph
        const points = firstGraph.dataPoints

        const sorted =  [...points].sort((aveA, aveB) => (new Date(aveA.date).getTime() - new Date(aveB.date).getTime()))

        expect(sorted).toEqual(points)
      })

      it('does not have data points when themes do not have points from this week', () => {
        const sleepGraph = response.find((average: IDailyAveragesGraph) => average.themeName === 'Sleep') || {dataPoints: []}

        expect(sleepGraph.dataPoints.length).toEqual(0)
      })

      it('returns 30 days of data for a theme', () => {
        const relationshipPoints = response.find(point => point.themeName === 'Relationships') || {dataPoints: []}

        expect(relationshipPoints.dataPoints.length).toEqual(30)
      })

      it('does not add redline data when there are less than two scores of 1 point', () => {
        const relationshipPoints = response.find(point => point.themeName === 'Relationships') as IDailyAveragesGraph

        expect(relationshipPoints.redlineData).toBeFalsy()
      })

      it('adds redline data link https://www.smilingmind.com.au/wellbeing-support when there are two or more scores of 1 point', () => {
        const relationshipPoints = response.find(point => point.themeName === 'Awareness') as IDailyAveragesGraph
        const link = relationshipPoints.redlineData?.redlineUrl

        expect(link).toEqual('https://www.smilingmind.com.au/wellbeing-support')
      })
    })

    describe('when theme name for a given id is not found', () => {
      const mockAverage: IDailyAverage[] = [{
        themeId: 19,
        date: `${dateToday}T00:00:00Z`,
        dailyAverage: 3.0,
      }]

      beforeAll(() => {
        response = mapper.calculateAveragesGraph(mockAverage)
      })

      it('creates a theme of themeId if we can not find that theme name', () => {
        expect(response[0].themeName).toEqual('19')
      })
    })
  })
})

describe('HomeReducer', () => {
  const NewHeaderResults = 'NewHeaderResults' as unknown as IHomeHeaderStats
  const NewMinutesResults = 'NewMinutesResults' as unknown as IMinutesPoint[]
  const NewAveragesResults = 'NewAveragesResults' as unknown as IDailyAveragesGraph[]
  const mockHomeDataMapper = {
    calculateHeaderStats: jest.fn(() => ({homeHeaderStats: NewHeaderResults, minutesGraph: NewMinutesResults})),
    calculateAveragesGraph: jest.fn(() => NewAveragesResults),
  }
  const HomeReducer = CreateHomeReducer(mockHomeDataMapper)

  describe('when initialising', () => {
    it('returns an empty object', () => {
      expect(HomeReducer(undefined, {} as IHomeAction)).toEqual({})
    })
  })

  describe('when it receives an action stating home data has been updated', () => {
    const mockDashboardData = 'mockDashboardData'
    const mockAveragesData = 'mockAveragesData'
    const mockHomePayload = {
      weeks: mockDashboardData as unknown as IDashboardWeek[],
      dailyAverages: mockAveragesData as unknown as IDailyAverage[],
    }

    let newState: IHomeState
    beforeAll(() => {
      const stateWithError = {
        error: 'any',
      } as unknown as IHomeState

      const updatedAction = {
        type: 'HOME_DATA_UPDATED',
        payload: mockHomePayload,
      }

      newState = HomeReducer(stateWithError, updatedAction)
    })

    it('passes dashboard data to graph mapper to calculate minutes', () => {
      expect(mockHomeDataMapper.calculateHeaderStats).toHaveBeenCalledWith(mockDashboardData)
    })

    it('passes averages data to graph mapper to calculate averages', () => {
      expect(mockHomeDataMapper.calculateAveragesGraph).toHaveBeenCalledWith(mockAveragesData)
    })

    it('returns a state with graph mapper results', () => {
      const expectedState = {
        minutesGraph: NewMinutesResults,
        homeHeaderStats: NewHeaderResults,
        averagesGraph: NewAveragesResults,
      }

      expect(newState).toEqual(expectedState)
    })
  })

  describe('when it receives an action stating home data failed to update', () => {
    const mockError = 'mockError' as unknown as Error
    const errorAction = {
      type: 'HOME_DATA_FAILED_TO_UPDATE',
      error: mockError,
    }
    const expectedState = {
      error: mockError,
    }

    it('returns an error with the home data', () => {
      expect(HomeReducer(undefined, errorAction)).toEqual(expectedState)
    })

    it('returns a state with out previous home data', () => {
      const stateWithData = {
        weeks: 'any',
        dailyAverages: 'any',
      } as unknown as IHomeState

      expect(HomeReducer(stateWithData, errorAction)).toEqual(expectedState)
    })
  })
})
