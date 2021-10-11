/* Your Code Here */
const allEmployees = [];

function createEmployeeRecord([String1, String2, String3, Number]) {
    const employeeRecord = {
        firstName: String1,
        familyName: String2,
        title: String3,
        payPerHour: Number,
        timeInEvents: [],
        timeOutEvents: []
    }
    allEmployees.push(employeeRecord)
    return employeeRecord
}

function createEmployeeRecords(arrays) {
  const arrOfObjs = []
  arrays.forEach((array) => {
    const newObj = createEmployeeRecord(array)
    arrOfObjs.push(newObj)
  })
  return arrOfObjs
}

function createTimeInEvent(datestamp) {
    const hour = datestamp.split(" ")[1]
    const date = datestamp.split(" ")[0]
    const timeInEmployee = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }
    const timeInEvents = this.timeInEvents
    timeInEvents.push(timeInEmployee)
    return this
}

function createTimeOutEvent(datestamp) {
    const hour = datestamp.split(" ")[1]
    const date = datestamp.split(" ")[0]
    const timeOutEmployee = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }
    const timeOutEvents = this.timeOutEvents
    timeOutEvents.push(timeOutEmployee)
    return this
}

function hoursWorkedOnDate(datestamp) {
    let timeIn =""
    let timeOut =""
    this.timeInEvents.forEach((x) => {
        if (x.date === datestamp) {
            timeIn = x.hour
        }
    })
    this.timeOutEvents.forEach((x) => {
        if (x.date === datestamp) {
            timeOut = x.hour
        }
    })
    const hoursWorked = (timeOut - timeIn) / 100
    return hoursWorked
}

function wagesEarnedOnDate(datestamp) {
    const hoursWorked = hoursWorkedOnDate.call(this, datestamp)
    const paycheck = hoursWorked * this.payPerHour
    return paycheck
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(array) {
    const reducer = (previousValue, employee) => previousValue + allWagesFor.call(employee)
    return array.reduce(reducer, 0)
}