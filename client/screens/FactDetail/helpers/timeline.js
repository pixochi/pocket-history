import _ from 'lodash';

import { isString, addLeadingChars } from '../../../utils/string';


export const buildTimelineBorders = (timelineRange, factText, factCategory = 'Events') => {

  if (_.isEmpty(timelineRange) || !isString(factText) || !isString(factCategory) ) {
    return {};
  }

  const { start, end } = timelineRange;
  let timelineStart;
  let timelineEnd;

  if (factCategory === 'Events') {
    timelineStart = {
      date: `${start.year}/01/01`,
      description: `What else happened in ${start.year}?`
    }
    timelineEnd = {
      date: `${end.year}/12/31`,
      description: 'End of the year'
    }
  } else if (factCategory === 'Births') {
    const { year, month, day } = start;
    let note = end.approximate ? ' * The date of death is approximate.' : '';
    timelineStart = {
      date: `${year}/${month}/${day}`,
      description: `Birth: ${factText}`,
    }
    const isAlive = end.approximate && end.year === new Date().getFullYear();
    const description = isAlive ? 'TODAY' : `Death: ${factText} ${note}`;
    timelineEnd = {
      date: end.year,
      description
    }
  } else {
    const { year, month, day } = end;
    let note = start.approximate ? ' * The date of birth is approximate.' : '';
    timelineStart = {
      date: start.year,
      description:`Birth: ${factText} ${note}`,
    }
    timelineEnd = {
      date: `${year}/${month}/${day}`,
      description: `Death: ${factText}`,
    }
  }

  timelineStart.isBorder = true;
  timelineEnd.isBorder = true;

  return { start: timelineStart, end: timelineEnd }
}

export const getTimeRange = (lastFactDate, timelineEnd) => {
  // dates of timeline facts are from range 01/01/[YEAR] - 31/12/[YEAR]
  let [ year, month = 1, day = 1 ] = lastFactDate.split('/').map(d => parseInt(d));
  day += 1;
  if (day > 31) {
    day = 1;
    month += 1;
    year += month > 12 ? 1 : 0;
  }
  [month, day ] = [month, day ].map(d => addLeadingChars(d, 2, '0'));
  const start = {
    api: year + month + day,
    year,
    month,
    day
  }
  const range = {
    start,
    end: timelineEnd
  }

  return range;
}

export const getRangeFilterProps = (category = 'Events', timelineRange) => {

  if (_.isEmpty(timelineRange)) {
    return {}
  }

  let rangeKey = 'month';
  let labelMin = 'January';
  let labelMax = 'December';

  if (category !== 'Events') {
    rangeKey = 'year';
    labelMin = timelineRange.start.year;
    labelMax = timelineRange.end.year;
  }

  const min = timelineRange.start[rangeKey];
  const max = timelineRange.end[rangeKey];

  return { rangeKey, min, max, labelMin, labelMax }
}