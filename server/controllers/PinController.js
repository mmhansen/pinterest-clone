import Pin from '../models/Pin'

// this creates a new pin by image url and title
export function createPin (req, res, next) {
  let { user_id, title, image_url } = req.body

  const newPin = new Pin({ owner: user_id, title, image_url })
  newPin.save((err, pin) => {
    if (err) { return next(err) }
    res.created({pin})
  })
}

export function deletePin (req, res, next) {
  let { pin_id } = req.params
  Pin.findByIdAndRemove(pin_id, (err, pin) => {
    if (err) { return next(err) }
    res.okay({
      "response": "deleted"
    })
  })
}
// this is for changing image url or title
export function updatePin (req, res, next) {
  let { title, url } = req.body
  let { pin_id } = req.params
  Pin.findByIdAndUpdate(
    pin_id,
    {$set: {title, url}},
    { new: true },
    (err, pin) => {
      if (err) { return next(err) }
      res.okay({pin})
    }
  )
}

export function fetchUserPins (req, res, next) {
  let { user_id } = req.params
  Pin.find({ owner: user_id }, (err, pins) => {
    if (err) { return next(err) }
    res.okay({pins})
  })
}

export function likePin (req, res, next) {
  let { pin_id } = req.params
  Pin.findByIdAndUpdate(
    pin_id,
    {$inc: {likes: 1}},
    {new:true},
    (err, pin) => {
      if (err) { return next(err) }
      res.okay({pin})
    })
}

export function sharePin (req, res, next) {
  let { pin_id, user_id } = req.params

  Pin.findByIdAndUpdate(
    pin_id,
    {$inc: {shares: 1}},
    {new: true},
    (err, pin) => {
      if (err) { return next(err) }

      const newPin = new Pin({ owner: user_id, title: pin.title, image_url: pin.image_url })
      newPin.save((err, newPin) => {
        if (err) { return next(err) }
        res.okay({
          pin: newPin
        })
      })
  })
}
