<template>
  <div class="calendar-mast" @click="_toParentDate">
    <div class="calendar-wrapper" @click.stop>
      <div class="header-wrapper">
        <div class="date">
            <span class="month">
              <span v-html="calendarCurrent.month"></span>
              <span v-if="!!calendarCurrent.month">月</span>
            </span>
          <span class="year"><span v-html="calendarCurrent.year"></span></span>
        </div>
        <div class="change-month">
          <img class="icon prev" @click="prevMonth" src="/src/static/icon/icon-back.png">
          <img class="icon next"
               :class="{'disable':calendarToday.year === calendarCurrent.year && calendarToday.month === calendarCurrent.month}"
               @click="nextMonth" src="/src/static/icon/icon-back.png">
        </div>
      </div>
      <div class="content-wrapper">
        <div class="box">
          <div class="title-wrapper">
            <div class="day-box" v-for="week in weekList">
              <div class="day">
                <span v-html="week"></span>
              </div>
            </div>
          </div>
          <div class="day-wrapper">
            <div class="day-box" v-for="day in daysList">
              <div class="day" @click="chooseDay(day.text,day.canChoose,day.choosed)"
                   :class="{'disable-choose':!day.canChoose,'choosed':day.choosed}">
                <span v-html="day.text"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import moment from 'moment'

  export default {
    data() {
      return {
        calendarCurrent: {},
        calendarSelect: '',
        weekList: ['日', '一', '二', '三', '四', '五', '六'],
        daysList: [],
        calendarToday: {}
      }
    },
    created() {
      var selectMonent
      if (!this.calendarSelect) {
        selectMonent = moment()
      } else {
        selectMonent = moment(this.calendarSelect.year + '-' + this.calendarSelect.month, 'YYYY-MM')
      }
      this.calendarSelect = {
        year: selectMonent.year(),
        month: selectMonent.month() + 1,
        day: selectMonent.date(),
        week: '星期' + this.weekList[selectMonent.day()]
      }
      this.calendarCurrent = {
        year: moment().year(),
        month: moment().month() + 1,
        day: moment().date()
      }
      this.calendarToday = {
        year: moment().year(),
        month: moment().month() + 1,
        day: moment().date()
      }
      this._initCalendar()
      this._toParentDate()
    },
    methods: {
      prevMonth() {
        this._prevMonth()
      },
      nextMonth() {
        this._nextMonth()
      },
      chooseDay(day, canChoose, choosed) {
        if (choosed) return
        if (!canChoose) return
        if (day === this.calendarSelect.day) return
        if (day === '今天') day = moment().date()
        this.calendarSelect.day = day
        this.calendarSelect.month = this.calendarCurrent.month
        this.calendarSelect.year = this.calendarCurrent.year
        this.calendarSelect.week = '星期' + this.weekList[moment(this.calendarSelect.year + '-' + this.calendarSelect.month + '-' + this.calendarSelect.day, 'YYYY-MM-DD').day()]
        this._toParentDate()
        this._initCalendar()
      },
      _toParentDate() {
        this.$emit('calendarChoose', this.calendarSelect)
      },
      _prevMonth() {
        if (this.calendarCurrent.month === 1) {
          this.calendarCurrent.year -= 1
          this.calendarCurrent.month = 12
        } else {
          this.calendarCurrent.month -= 1
        }
        this._initCalendar()
      },
      _nextMonth() {
        if (this.calendarCurrent.year === moment().year() && this.calendarCurrent.month === moment().month() + 1) {
          return
        }
        if (this.calendarCurrent.month === 12) {
          this.calendarCurrent.year += 1
          this.calendarCurrent.month = 1
        } else {
          this.calendarCurrent.month += 1
        }
        this._initCalendar()
      },
      _initCalendar() {
        this.currentMonent = moment(this.calendarCurrent.year + '-' + this.calendarCurrent.month, 'YYYY-MM')
        this.prevMonent = this.currentMonent.clone().subtract(1, 'M')
        this.nextMonent = this.currentMonent.clone().add(1, 'M')
        this._initDays()
      },
      _initDays() {
        var daysList = []
        var daysInMonth = this.currentMonent.daysInMonth()
        var dayStartWeek = this.currentMonent.date(1).day()
        var dayEndWeek = this.currentMonent.date(daysInMonth).day()
        var prevDaysInMonth = this.prevMonent.daysInMonth()
        for (let i = dayStartWeek; i > 0; i--) {
          var oneDay = {}
          oneDay.text = prevDaysInMonth - i + 1
          oneDay.canChoose = false
          oneDay.choosed = false
          daysList.push(oneDay)
        }
        for (let i = 1; i <= daysInMonth; i++) {
          let oneDay = {}
          if (this.calendarCurrent.month === this.calendarToday.month && this.calendarCurrent.year === this.calendarToday.year) {
            if (this.calendarToday.day === i) {
              oneDay.text = '今天'
              oneDay.canChoose = true
            } else {
              oneDay.text = i
              if (this.calendarToday.day >= i) {
                oneDay.canChoose = true
              } else {
                oneDay.canChoose = false
              }
            }
          } else {
            oneDay.text = i
            oneDay.canChoose = true
          }
          if (this.calendarSelect.day === i && this.calendarCurrent.month === this.calendarSelect.month && this.calendarCurrent.year === this.calendarSelect.year) {
            oneDay.choosed = true
          }
          daysList.push(oneDay)
        }
        for (let i = 1; i <= 6 - dayEndWeek; i++) {
          let oneDay = {}
          oneDay.text = i
          oneDay.canChoose = false
          oneDay.choosed = false
          daysList.push(oneDay)
        }
        this.daysList = daysList
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/variable";

  .calendar-mast {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 100;
    overflow: hidden;
    background-color: rgba(7, 17, 27, 0.4);
    .calendar-wrapper {
      position: fixed;
      top: 40px;
      left: 50%;
      width: 300px;
      margin-left: -150px;
      z-index: 100;
      border-radius: 6PX;
      overflow: hidden;
      box-shadow: 0 0 2px 0px rgba(7, 17, 27, 0.5);
      .header-wrapper {
        display: flex;
        display: -webkit-flex;
        height: 54px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 0;
        background-color: rgb(244, 244, 244);
        .date {
          flex: 1;
          -webkit-flex: 1;
          text-align: left;
          .month {
            display: inline-block;
            margin-right: 6px;
            font-size: 18px;
            font-weight: bold;
          }
          .year {
            line-height: 24px;
            vertical-align: bottom;
            font-size: 13px;
            font-weight: bold;
          }
        }
        .change-month {
          flex: 1;
          -webkit-flex: 1;
          text-align: right;
          line-height: 24px;
          .icon {
            width: 16px;
            vertical-align: middle;
          }
          .prev {
            margin-right: 6px;

          }
          .next {
            transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
            &.disable {
              opacity: 0.3;
            }
          }
        }
      }
      .content-wrapper {
        background: #fff;
        .box {
          padding: 6px 8px 12px 8px;
          text-align: center;
          .title-wrapper {
            display: flex;
            display: -webkit-flex;
            .day-box {
              flex: 0 0 14.28%;
              -webkit-flex: 0 0 14.28%;
              margin-bottom: 6px;
              .day {
                margin: 0 auto;
                width: 32px;
                height: 32px;
                line-height: 32px;
                font-weight: bold;
                font-size: 13px;
                color: @orange-color;
              }
            }
          }
          .day-wrapper {
            display: flex;
            display: -webkit-flex;
            flex-wrap: wrap;
            .day-box {
              flex: 0 0 14.28%;
              -webkit-flex: 0 0 14.28%;
              .day {
                margin: 6px auto;
                width: 32px;
                height: 32px;
                line-height: 32px;
                border: 0.5px solid rgba(7, 17, 27, 0.15);
                &.disable-choose {
                  color: #ddd;
                  border: 0.5px solid @border-color;
                }
                &.choosed {
                  border: 0.5px solid @blue-color;
                  background-color: @blue-color;
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
