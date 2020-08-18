import {
    IFilterValues,
    IGroupValues,
    IMenuStatsValues,
    IStreamValues,
    StatisticType,
    typeInterval
} from "../intrefaces/interface"

export interface IStats {
    hits: number
    uniques: number
    sales: number
    amount: number
    value: string
}

export interface IStatisticState {
    type: StatisticType
    groups: string[]
    streams: string[]
    startDate: Date
    endDate: Date
    loading: boolean
    country: string[]
    ignoreBot: boolean
    stats: IStats[]
    interval: typeInterval
    setType:(t: StatisticType) => void
    fetchStats: () => void
    startLoading: () => void
    updateLocalStorage: (menuStats: IMenuStatsValues) => void
}

export type ActionStatistic =
    | {type: 'START_LOADING'}
    | {type: 'SET_TYPE', t: StatisticType}
    | {type: 'CLEAR_STATS'}
    | {type: 'FETCH_STATS', stats: IStats[]}
    | {type: 'ERROR'}
    | {type: 'UPDATE_LOCAL_STORAGE', menu: IMenuStatsValues}

export interface IGroupState {
    groups: IGroupValues[]
    loading: boolean
    group: IGroupValues | null
    streams: IStreamValues[]
    stream: IStreamValues | null
    filters: IFilterValues[]
    filter: IFilterValues | null
    error: string | null
    fetchGroups: () => void
    fetchGroup: (id: string) => void
    clearGroup: () => void
    clearStream: () => void
    addGroup: (group: IGroupValues) => void
    editGroup: (group: IGroupValues) => void
    removeGroup: (id: string) => void
    addStream: (stream: IStreamValues) => void
    findStream: (id: string) => void
    editStream: (stream: IStreamValues) => void
    removeStream: (id: string) => void
    addFilter: (filter: IFilterValues) => void
    updateFilters: (filters: IFilterValues[]) => void
    stateError: (msg: string) => void
    clearStateError: () => void
    sortedStreams: () => void
    updateStreams: (stream: IStreamValues) => void
    editPositionStreams: (streams: IStreamValues[]) => void
    clearFilters: () => void
    updateFilter: (filter: IFilterValues) => void
    findFilter: (position: number) => void
    editFilter: (filter: IFilterValues) => void
    editPositionFilters: (filters: IFilterValues[]) => void
    removeFilter: (id: number) => void
    saveEditGroup: () => void
}
export type ActionGroup =
    | {type: 'START_LOADING'}
    | {type: 'FETCH_GROUPS_SUCCESS', groups: IGroupValues[]}
    | {type: 'FETCH_GROUP_SUCCESS', group: IGroupValues}
    | {type: 'FETCH_STREAMS', streams: IStreamValues[]}
    | {type: 'FIND_STREAM', stream: IStreamValues}
    | {type: 'CLEAR_STREAM'}
    | {type: 'CLEAR_STREAMS'}
    | {type: 'CLEAR_GROUP'}
    | {type: 'ADD_GROUP', group: IGroupValues}
    | {type: 'ADD_STREAM', stream: IStreamValues}
    | {type: 'ERROR'}
    | {type: 'CLEAR_ERROR'}
    | {type: 'EDIT_GROUP', group: IGroupValues}
    | {type: 'EDIT_STREAM', stream: IStreamValues}
    | {type: 'SORTED_STREAMS', streams: IStreamValues[]}
    | {type: 'UPDATE_STREAMS', streams: IStreamValues[]}
    | {type: 'EDIT_POSITION_STREAMS', streams: IStreamValues[]}
    | {type: 'GET_FILTERS', filters: IFilterValues[]}
    | {type: 'CLEAR_FILTERS'}
    | {type: 'ADD_FILTER', filter: IFilterValues}
    | {type: 'UPDATE_FILTERS', filters: IFilterValues[], streams: IStreamValues[]}
    | {type: 'CLEAR_FILTER'}
    | {type: 'UPDATE_FILTER', filter: IFilterValues}
    | {type: 'EDIT_FILTER', filters: IFilterValues[]}
    | {type: 'EDIT_POSITION_FILTERS', filters: IFilterValues[]}
    | {type: 'REMOVE_FILTER', filters: IFilterValues[]}
    | {type: 'SAVE_EDIT_GROUP'}
    | {type: 'REMOVE_STREAM', streams: IStreamValues[]}
