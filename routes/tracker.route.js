const { Router } = require('express')
const shortid = require('shortid')
const DateFnsUtils = require('date-fns')
const Group = require('../models/Group')
const Statistic = require('../models/Statistic')
const userInfo = require('../tracker/userInfo')
const stream = require('../tracker/stream')
const redirect = require('../tracker/redirect')
const getUrl = require('../utils/url.utils')

const router = Router()

const redirectTrash = (res) => {
  if (global.trash === 'notFound') {
    return redirect('404', global.trashUrl, res)
  }
  return res.redirect(global.trashUrl)
}

router.get('/', async (req, res) => {
  try {
    return redirectTrash(res)
  } catch (e) {
    return res.status(500).json('Something went wrong')
  }
})

router.get('/:id', async (req, res) => {
  try {
    let count = 0
    let url
    const time = new Date()
    const group = await Group.findOne({
      name: req.params.id,
    }).populate('streams')
    if (!group) {
      return redirectTrash(res)
    }
    if (!group.isActive) {
      return redirectTrash(res)
    }
    const user = userInfo(req)
    let unique = true
    if (group.checkUnic && group.timeUnic > 0) {
      const candidate = await Statistic.find({
        ip: user.ip,
        date: { $gte: DateFnsUtils.subHours(time, group.timeUnic) },
      })
      if (candidate.length) {
        count = candidate.length
        unique = false
      }
    }
    const streams = group.streams.sort((a, b) =>
      a.position > b.position ? 1 : -1,
    )
    const subid = shortid.generate().toLowerCase()
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < streams.length; i++) {
      if (streams[i].isActive) {
        // eslint-disable-next-line no-await-in-loop
        const isUsed = await stream(user, streams[i])
        if (isUsed) {
          // eslint-disable-next-line no-await-in-loop
          url = await getUrl(
            streams[i].typeRedirect,
            streams[i].code,
            subid,
            user.query,
            count,
          )
          if (group.useLog && streams[i].useLog) {
            const statistic = new Statistic({
              group: group._id,
              stream: streams[i]._id,
              out: url,
              keyword: user.query,
              redirect: streams[i].typeRedirect,
              device: user.device,
              country: user.geo.country,
              city: user.geo.city,
              language: user.lang,
              unique,
              isBot: streams[i].isBot,
              ip: user.ip,
              referer: user.refer,
              useragent: user.useragent.source,
              expireAt: DateFnsUtils.addDays(
                time,
                global.clearDayStatistic,
              ),
              subid,
            })
            statistic.save()
          }
          return redirect(streams[i].typeRedirect, url, res)
        }
      }
    }
    url = await getUrl(
      group.typeRedirect,
      group.code,
      subid,
      user.query,
      count,
    )
    if (group.useLog) {
      const statistic = new Statistic({
        group: group._id,
        out: url,
        keyword: user.query,
        redirect: group.typeRedirect,
        device: user.device,
        country: user.geo.country,
        city: user.geo.city,
        language: user.lang,
        unique,
        ip: user.ip,
        referer: user.refer,
        useragent: user.useragent.source,
        expireAt: DateFnsUtils.addDays(
          time,
          global.clearDayStatistic,
        ),
        subid,
      })
      statistic.save()
    }
    return redirect(group.typeRedirect, url, res)
  } catch (e) {
    return res.status(500).json('Something went wrong')
  }
})

module.exports = router
