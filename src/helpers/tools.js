const camelize = str => {
  return str.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase());
};

export { camelize };
