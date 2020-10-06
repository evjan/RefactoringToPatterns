import {HomeTypes} from './types'
import {HomePayload} from '../models/Home'

interface IHomeAction {
  type: HomeTypes
  payload?: HomePayload
  error?: Error
}

class HomeActions {
  static HomeDataUpdating(): IHomeAction {
    return {
      type: HomeTypes.HOME_DATA_UPDATING,
    }
  }
  static HomeDataUpdated(data: HomePayload): IHomeAction {
    return {
      type: HomeTypes.HOME_DATA_UPDATED,
      payload: data,
    }
  }
  static HomeDataFailedToUpdate(error: Error): IHomeAction {
    return {
      type: HomeTypes.HOME_DATA_FAILED_TO_UPDATE,
      error: error,
    }
  }
}

export {HomeActions, IHomeAction}
