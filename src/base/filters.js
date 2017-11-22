/**
 * Created by LX on 2017/9/4.
 */
import formatDate from 'base/format'

export default {
  formatDate (time) {
    let date = new Date(time)
    return formatDate(date, 'yyyy-MM-dd hh:mm')
  }
}
