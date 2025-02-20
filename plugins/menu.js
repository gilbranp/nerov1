let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const chats = conn.chats.all()
const groups = chats.filter(v => v.jid.endsWith('g.us'))
const defaultMenu = {
  before: `
╭─〔  𝐈𝐍𝐅𝐎 𝐔𝐒𝐄𝐑  〕─⬣
┃➵͜͡✪ 𝚄𝚂𝙴𝚁 : *%name*
┃➵͜͡✪ 𝚃𝙴𝚁𝚂𝙸𝚂𝙰 : *%limit* 𝙻𝙸𝙼𝙸𝚃
┃➵͜͡✪ 𝚁𝙾𝙻𝙴 : *%role*
┃➵͜͡✪ 𝙻𝙴𝚅𝙴𝙻 : *%level (%exp / %maxexp)* 
┃➵͜͡✪ 𝚃𝙾𝚃𝙰𝙻 𝚇𝙿 : *%totalexp* 𝚇𝙿
┃
┃─〔 𝐓𝐈𝐌𝐄 𝐀𝐍𝐃 𝐃𝐀𝐓𝐄 〕
┃➵͜͡✪ 𝙷𝙰𝚁𝙸 : *%week %weton* 
┃➵͜͡✪ 𝚃𝙰𝙽𝙶𝙶𝙰𝙻 : *%date*
┃➵͜͡✪ 𝚃𝙰𝙽𝙶𝙶𝙰𝙻 𝙸𝚂𝙻𝙰𝙼 : *%dateIslamic*
┃➵͜͡✪ 𝚆𝙰𝙺𝚃𝚄 : *%time*
┃
┃─〔  𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄  〕
┃➵͜͡✪ 𝚄𝙿𝚃𝙸𝙼𝙴 : *%uptime*
┃➵͜͡✪ 𝙳𝙰𝚃𝙰𝙱𝙰𝚂𝙴 : %rtotalreg dari %totalreg 
┃➵͜͡✪ 𝙼𝙴𝙼𝙾𝚁𝚈 𝚄𝚂𝙴𝙳 : *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
╰──────────⬣
%readmore
───֍ 〔 𝗙𝗜𝗧𝗨𝗥 𝗕𝗢𝗧 〕 ֍───
` .trimStart(),
  header: '╭─֍ 〔 %category 〕 ֍─',
  body: '┃⬡ %cmd %islimit %isPremium',
  footer: '╰────────֍\n',
  after: `⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕.
               %me
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
	let bzz = './audio/robot.m4a'
	let { anon, anticall, antispam, antitroli, backup, jadibot, groupOnly, nsfw } = global.db.data.settings[conn.user.jid]
    let totaljadibot = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'edukasi', 'news', 'nsfw', 'xp', 'stiker', 'image', 'anime', 'kerangajaib', 'quotes', 'admin', 'rpg', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'vote', 'tanpakategori', 'owner', 'gift', 'vn']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'rpg': 'Epic Rpg',
    'xp': 'Exp & Limit',
    'fun': 'Fun',
    'jodoh': 'Jodoh',
    'gift': 'Gift',
    'anime': 'Anime',
    'hentai': `NSFW`,
    'premium': 'Premium',
    'anonymous': 'Anonymous Chat',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'absen': 'Absen',
    'voting': 'vote',
    'admin': `Admin`,
    'group': 'Grup',
    'news': 'News',
    'internet': 'Internet',
    'edukasi': 'Edukasi',
    'quran': 'Islam',
    'image': 'Random Image',
    'sticker': 'Stiker',
    'nulis': 'MagerNulis & Logo',
    'audio': 'Pengubah Suara',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'database': 'Database',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Tanpa Kategori',
    'vn': 'Vn',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'nsfw') tags = {
    'hentai': 'NSFW',
    'nsfw': 'HENTAI',
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Epic Rpg'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'image') tags = {
    'image': 'Random Image'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun',
    'jodoh': 'Jodoh'   
  }
  if (teks == 'jodoh') tags = {
    'jodoh': 'Jodoh'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
    if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'quran') tags = {
    'quran': 'Islam'
  }
  if (teks == 'gift') tags = {
    'gift': 'Gift'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'vn') tags = {
    'vn': 'Vn'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
			return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": `✧───···[ *DASHBROAD* ]···───✧`.trim(),
          "description": `${ucapan()}, ${name} !`.trim(),
          "footerText": `╭━━━━━━━━━━━━━━━━┈─✧
│⬡ Aktif Selama : ${uptime}
│⬡ Baterai Bot : ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
│⬡ Total Jadibot : ${totaljadibot.length}
│⬡ Pengguna : ${Object.keys(global.db.data.users).length}
│⬡ Terblok : ${conn.blocklist.length}
│⬡ chat Terbanned : ${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}
│⬡ Pengguna Terbanned : ${Object.entries(global.db.data.users).filter(user => user[1].banned).length}
┴
┬ 📌 𝗣𝗶𝗻𝗻𝗲𝗱 :
│ *Beri Jeda Ya Kak*
╰━━━━━━━━━━━━━━━━┈─✧
     ▌│█║▌║▌║║▌║▌║█│▌
     
     ${week}, ${date}`,
          "buttonText": "Klik Aku Kak!",
          "listType": "SINGLE_SELECT",
          "sections": [
                            {
                                "rows": [{
                                         "title": "📊 › 𐐪-『 Status 』-𐑂",
                                         "description": "Status Yanz Bot",
                                         "rowId": ".botstat"
                                    }, {
                                         "title": "⚡› 𐐪-『 Speed 』-𐑂",
                                         "description": "Menampilkann Kecepatan Respon Bot",
                                         "rowId": ".ping"
                                    }, {
                                         "title": "🗒️› 𐐪-『 Info 』-𐑂",
                                         "description": "Menampilkan Info Bot",
                                         "rowId": ".info"
                                    }, {
                                         "title": "🎐 › 𐐪-『 Creator 』-𐑂",
                                         "description": "Creator Bot",
                                         "rowId": ".nowner"
                                    }, {
                                         "title": "❗ › 𐐪-『 Rules 』-𐑂",
                                         "description": "Patuhi Rules Untuk Kenyamanan Bersama",
                                         "rowId": ".rules"
                                    }, {
                                         "title": "🪙 › 𐐪-『 Leaderboard 』-𐑂",
                                         "description": "Cek Posisi Mu",
                                         "rowId": ".lb"
                       }],
                    "title": "▮𝗦𝘁𝗮𝘁𝘂𝘀 」"
                }, {
                  "rows": [{
                  "title": "💬 〉 『 Menu 1 』",
                  "description": "All Fitur Yanz Bot",
                  "rowId": ".? all"
                }, {
                  "title": "🎮 〉 『 Menu 2 』",
                  "description": "Game",
                  "rowId": ".? game"
                }, {
                  "title": "🎁 〉 『 Menu 3 』",
                  "description": "Menu Gift",
                  "rowId": ".? Gift"
                }, {
                  "title": "🌱 〉 『 Menu 4 』",
                  "description": "Game Epic Rpg ! ",
                  "rowId": ".? rpg"
                }, {
                  "title": "📈 〉 『 Menu 5 』",
                  "description": "Exp & Limit",
                  "rowId": ".? xp"
                }, {
                  "title": "🧩 〉 『 Menu 6 』",
                  "description": "Fun",
                  "rowId": ".? fun"
                }, {
                  "title": "🔞 〉 『 Menu 7 』",
                  "description": "Nsfw",
                  "rowId": ".? nsfw"
                }, {
                  "title": "⛩️ 〉 『 Menu 8 』",
                  "description": "Anime Menu",
                  "rowId": ".? anime"
                }, {
                  "title": "📰 〉 『 Menu 9 』",
                  "description": "News",
                  "rowId": ".? News"
                },  {
                  "title": "☪️ 〉 『 Menu 10 』",
                  "description": "Islam Menu",
                  "rowId": ".? quran"
                }, {
                  "title": "📚 〉 『 Menu 11 』",
                  "description": "Edukasi",
                  "rowId": ".? edukasi"
                }, {
                  "title": "🖼️ 〉 『 Menu 12 』",
                  "description": "Radom Image",
                  "rowId": ".? image"
                },  {
                  "title": "🎫 〉 『 Menu 13 』",
                  "description": "Sticker Menu",
                  "rowId": ".? stiker"
                }, {
                  "title": "🐚 〉 『 Menu 14 』",
                  "description": "Kerang Ajaib",
                  "rowId": ".? kerangajaib"
                }, {
                  "title": "📑 〉 『 Menu 15 』",
                  "description": "Qoutes",
                  "rowId": ".? quotes"
                }, {
                  "title": "🏛️ 〉 『  Menu 16 』",
                  "description": "Admin",
                  "rowId": ".? admin"
                }, {
                  "title": "👥 〉 『 Menu 17 』",
                  "description": "Group",
                  "rowId": ".? grup"
                }, {
                  "title": "💻 〉 『 Menu 18 』",
                  "description": "Internet",
                  "rowId": ".? internet"
                }, {
                  "title": "🎭 〉 『 Menu 19 』",
                  "description": "Anonymous",
                  "rowId": ".? anonymous"
                }, {
                  "title": "🖊️ 〉 『 Menu 20 』",
                  "description": "Menulis dan Membuat Logo, dll...",
                  "rowId": ".? nulis"
                }, {
                  "title": "🎧 〉 『 Menu 21 』",
                  "description": "Vn Imut",
                  "rowId": ".? vn"
                }, {
                  "title": "📥 〉 『 Menu 22 』",
                  "description": "Download Sesuatu diBot!",
                  "rowId": ".? downloader"
                }, {
                  "title": "🧰 〉 『 Menu 23 』",
                  "description": "Tools Yg Biasa Dipakai Oleh Bot",
                  "rowId": ".? tools"
                }, {
                  "title": "📂 〉 『 Menu 24 』",
                  "description": "Database",
                  "rowId": ".? database"
                }, {
                  "title": "🗳️ 〉 『 Menu 25 』",
                  "description": "Vote & Absen",
                  "rowId": ".? vote"
                }, {
                  "title": "🎙️ 〉 『 Menu 26 』",
                  "description": "Voice Changer",
                  "rowId": ".? audio"
                }, {
                  "title": "🌐 〉 『 Menu 27 』",
                  "description": "Menjadi Bot Sementara",
                  "rowId": ".? jadibot"
                }, {
                  "title": "ℹ️ 〉 『 Menu 28 』",
                  "description": "Fitur Info",
                  "rowId": ".? info"
                }, {
                  "title": "❓ 〉 『 Menu 29 』",
                  "description": "No Kategori",
                  "rowId": ".? tanpakategori"
                }, {
                  "title": "👩🏻‍💻 〉 『 Menu 30 』",
                  "description": "Menu Khusus Owner Yanz Bot",
                  "rowId": ".? owner"
                }],
                                "title": "▮𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆 」"
                                }, {
                                "rows": [{
                                "title": "🗳️ ∫ » Donasi «",
                                "description": "Donasi kak, jangan enak pakenya doang",
                                "rowId": ".donasi"
                                }, {
                                "title": "🔖 ∫ » Sewa «",
                                "description": "Menampilkan List harga sewabot",
                                "rowId": ".sewa"
                                }, {
                                "title": " 🥀 ∫ » Kata Penutup «",
                                "description": "Terimakasih untuk user yang telah menggunakan bot, jika ada kesalahan atau permintaan bisa chat ke nomor owner\n ❗Note: chat P/main² tidak akan di respon(user bisa terkena banned/block)",
                                "rowId": ".owner"
                                }, {
                                "title": "🔬  ∫ » Script «",
                                "description": "Script Yang Di Pakai Ynz",
                                "rowId": ".sc"
                                }, {
                                "title": "🎖️ ∫  » Thanks To «",
                                "description": "Terima kasih banyak untuk user yang telah berpartisipasi dalam Yanz Bot",
                                "rowId": ".tqto"
                                }],
                                "title": "▮𝗜𝗻𝗳𝗼 」"
                            }
                        ], "contextInfo": 
						{ "stanzaId": m.key.id,
                        "participant": "0@s.whatsapp.net",
                        "remoteJid": "60149431385-1618206438@g.us",
                        "quotedMessage": m.message
						}
                    }
                 }, {}), {waitForAck: true})
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // ┌〔 DAFTAR MENU 〕
    // ├ ${_p + command} all
    // ├ ${_p + command} game
    // ├ ${_p + command} xp
    // ├ ${_p + command} stiker
    // ├ ${_p + command} kerang
    // ├ ${_p + command} quotes
    // ├ ${_p + command} admin
    // ├ ${_p + command} group
    // ├ ${_p + command} premium
    // ├ ${_p + command} internet
    // ├ ${_p + command} anonymous
    // ├ ${_p + command} nulis
    // ├ ${_p + command} downloader
    // ├ ${_p + command} tools
    // ├ ${_p + command} fun
    // ├ ${_p + command} database
    // ├ ${_p + command} vote
    // ├ ${_p + command} quran
    // ├ ${_p + command} audio
    // ├ ${_p + command} jadibot
    // ├ ${_p + command} info
    // ├ ${_p + command} tanpa kategori
    // ├ ${_p + command} owner
    // └────  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '🄻' : '')
                .replace(/%isPremium/g, menu.premium ? '🄿' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send2ButtonLoc(m.chat, await(await fetch(fla + teks)).buffer(), text.trim(), `Runtime : ${uptime}\n${week} ${date}\n© 2022 By Yanz`, 'Pemilik Bot', `${_p}owner`, 'Donasi', `${_p}donasi`, m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help']
handler.tags = ['main']
handler.command = /^(\?|menu|help)$/i

handler.register = true

module.exports = handler

const more = String.fromCharCode(1)
const readMore = more.repeat(1)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari🌃"
  if (time >= 4) {
    res = "Selamat pagi🌄"
  }
  if (time > 10) {
    res = "Selamat siang🌄"
  }
  if (time >= 15) {
    res = "Selamat sore🌇"
  }
  if (time >= 18) {
    res = "Selamat malam🌉"
  }
  return res
}
