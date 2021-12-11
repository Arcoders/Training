function sortByDate(array) {
  let getTimestamp = (str) => +new Date(str);
  return array.sort(
    (a, b) => getTimestamp(a.fetch_datetime) - getTimestamp(b.fetch_datetime)
  );
}

export default sortByDate;
