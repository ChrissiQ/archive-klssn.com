let logOptions = {
  logging: false
};

let findOptions = {
  include: [{ all: true }]
}

export default {
  logOptions: logOptions,
  findOptions: Object.assign(findOptions, logOptions)
};