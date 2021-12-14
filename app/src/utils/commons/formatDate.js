function formatDate(date) {
  return (date ? date.slice(5) : "").replace("-", "/");
}

export default formatDate;
