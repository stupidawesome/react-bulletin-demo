export default function (delay) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, delay)
  })
}
