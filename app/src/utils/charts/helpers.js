function formateDate(date) {
  return (date ? date.slice(5) : "").replace("-", "/");
}

export { formateDate };
