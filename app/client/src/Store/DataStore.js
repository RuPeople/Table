import {makeAutoObservable} from "mobx"

export default class DataStore{
    constructor() {
        this._rows = []

        this._sortedRows = []

        this._rowsPerPage = 5
        this._currentPage = 1

        this._filterColumn = ""
        this._filterCondition = ""
        this._filterValue = ""

        makeAutoObservable(this)
    }

    setRows(rows){
        this._rows = rows
    }
    get rows(){
        return this._rows
    }
    setSortedRows(sortedRows){
        this._sortedRows = sortedRows
    }
    get sortedRows(){
        return this._sortedRows
    }


    setfilterColumn(filterColumn){
        this._filterColumn = filterColumn
    }
    setfilterCondition(filterCondition){
        this._filterCondition = filterCondition
    }
    setfilterValue(filterValue){
        this._filterValue = filterValue
    }
    setRowsPerPage(rowsPerPage){
        this._rowsPerPage = rowsPerPage
    }
    setCurrentPage(currentPage){
        this._currentPage = currentPage
    }

    get filterColumn(){
        return this._filterColumn
    }
    get filterCondition(){
        return this._filterCondition
    }
    get filterValue(){
        return this._filterValue
    }
    get rowsPerPage(){
        return this._rowsPerPage
    }
    get currentPage(){
        return this._currentPage
    }
}