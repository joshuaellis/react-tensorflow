module.exports = {
  loadGraphModel: () =>
    new Promise((res, _) => res({ name: 'TF Graph Model' })),
  loadLayersModel: () =>
    new Promise((res, _) => res({ name: 'TF Layer Model' }))
}
