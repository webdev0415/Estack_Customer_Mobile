import moment from 'moment';

export default function(unix_timestamp) {
  const date = new Date(unix_timestamp * 1000);
  return moment(date).format('DD MMM YYYY');
};
